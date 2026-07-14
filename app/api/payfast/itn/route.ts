import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import Subscription from "@/app/models/Subscription";
import crypto from "crypto";

function generatePayFastSignature(
  data: Record<string, string | number>,
  passphrase: string = ""
): string {
  const keys = Object.keys(data).sort();
  let pfOutput = "";
  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== null && value !== "") {
      pfOutput += `${key}=${encodeURIComponent(value.toString().trim())}&`;
    }
  }
  pfOutput = pfOutput.slice(0, -1);
  if (passphrase && passphrase.trim() !== "") {
    pfOutput += `&passphrase=${encodeURIComponent(passphrase.trim())}`;
  }
  return crypto.createHash("md5").update(pfOutput).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    // 1. Get form data from PayFast
    const formData = await request.formData();
    const pfData: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      pfData[key] = value.toString();
    }

    console.log("📨 ITN received:", pfData);

    // 2. Verify signature
    const passphrase = process.env.PAYFAST_PASSPHRASE || "TeekayMay2025";
    const signature = pfData.signature;
    delete pfData.signature;

    const recalculatedSignature = generatePayFastSignature(pfData, passphrase);

    if (signature !== recalculatedSignature) {
      console.error("❌ Signature mismatch");
      console.error("Received:", signature);
      console.error("Calculated:", recalculatedSignature);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 3. Server-to-server verification (optional but recommended)
    const queryUrl = process.env.PAYFAST_SANDBOX_QUERY_URL || "https://sandbox.payfast.co.za/eng/query";
    const verificationResponse = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(pfData).toString(),
    });
    const verificationText = await verificationResponse.text();
    console.log("🔍 Verification result:", verificationText);

    if (!verificationText.includes("SUCCESS") && !verificationText.includes("OK")) {
      console.error("❌ Server verification failed");
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }

    // 4. Check payment status
    const paymentStatus = pfData.payment_status;

    if (paymentStatus === "COMPLETE") {
      const orderCode = pfData.custom_str1;
      const type = pfData.custom_int1; // 1 = subscription, 2 = uniform

      console.log("✅ Payment successful for order:", orderCode);
      console.log("📦 Order type:", type === "1" ? "Subscription" : "Uniform");

      if (type === "1") {
        // Subscription – update to active
        await dbConnect();
        const subscription = await Subscription.findOneAndUpdate(
          { orderCode },
          {
            status: "active",
            paymentStatus: "completed",
          },
          { new: true }
        );

        if (!subscription) {
          console.error("❌ Subscription not found for order:", orderCode);
          return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
        }

        console.log("✅ Subscription activated for:", subscription.parentEmail);
      } else if (type === "2") {
        // Uniform order – notify admin (already done via WhatsApp)
        const customerEmail = pfData.custom_str2 || "N/A";
        const customerName = pfData.custom_str3 || "N/A";
        const customerPhone = pfData.custom_str4 || "N/A";
        const items = (pfData.custom_str5 || "").split("|").join(", ");

        console.log("✅ Uniform order completed:", orderCode);
        console.log("Customer:", customerName, customerEmail, customerPhone);
        console.log("Items:", items);

        // In future, you can send a confirmation email here
      }

      return NextResponse.json({ success: true });
    } else {
      console.log("⚠️ Payment status:", paymentStatus);
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("❌ ITN error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}