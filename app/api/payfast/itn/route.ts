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
  console.log("🔔 Webhook called at:", new Date().toISOString());

  // Log raw body for debugging
  const rawBody = await request.text();
  console.log("🔔 Raw body:", rawBody);

  // Parse form data
  const formData = new URLSearchParams(rawBody);
  const pfData: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    pfData[key] = value;
  }
  console.log("📨 Parsed ITN:", pfData);

  // Verify signature
  const passphrase = process.env.PAYFAST_PASSPHRASE || "TeekayMay2025";
  const signature = pfData.signature;
  delete pfData.signature;

  const recalculatedSignature = generatePayFastSignature(pfData, passphrase);
  if (signature !== recalculatedSignature) {
    console.error("❌ Signature mismatch");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Server-to-server verification (skip if sandbox returns weird)
  try {
    const queryUrl = process.env.PAYFAST_SANDBOX_QUERY_URL || "https://sandbox.payfast.co.za/eng/query";
    const verificationResponse = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(pfData).toString(),
    });
    const verificationText = await verificationResponse.text();
    console.log("🔍 Verification result:", verificationText);
    if (!verificationText.includes("SUCCESS") && !verificationText.includes("OK")) {
      console.warn("⚠️ Server verification failed, but we'll proceed.");
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.warn("⚠️ Verification request failed, continuing...");
  }

  // Process payment
  const paymentStatus = pfData.payment_status;
  const orderCode = pfData.custom_str1;
  const type = pfData.custom_int1 ? parseInt(pfData.custom_int1) : 1;

  if (paymentStatus === "COMPLETE") {
    console.log(`✅ Payment successful for order: ${orderCode}, type: ${type}`);

    await dbConnect();

    if (type === 1) {
      // Subscription
      const subscription = await Subscription.findOneAndUpdate(
        { orderCode },
        { status: "active", paymentStatus: "completed" },
        { new: true }
      );
      if (subscription) {
        console.log(`✅ Subscription activated for: ${subscription.parentEmail}`);
      } else {
        console.error(`❌ Subscription not found for order: ${orderCode}`);
      }
    } else if (type === 2) {
      // Uniform order
      console.log(`✅ Uniform order completed: ${orderCode}, ${pfData.custom_str3} (${pfData.custom_str2})`);
      // No DB update needed – already logged.
    }
  } else {
    console.log(`⚠️ Payment status: ${paymentStatus}`);
  }

  return NextResponse.json({ success: true });
}