import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pfData: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      pfData[key] = value.toString();
    }

    console.log("📨 PayFast webhook received:", pfData);

    const passphrase = process.env.PAYFAST_PASSPHRASE || "";

    // Verify signature
    const signature = pfData.signature;
    delete pfData.signature;

    let pfOutput = "";
    const keys = Object.keys(pfData).sort();
    for (const key of keys) {
      const value = pfData[key];
      if (value !== "" && value !== undefined) {
        pfOutput += `${key}=${encodeURIComponent(value.toString().trim())}&`;
      }
    }
    pfOutput = pfOutput.slice(0, -1);
    if (passphrase) {
      pfOutput += `&passphrase=${encodeURIComponent(passphrase.trim())}`;
    }
    const calculatedSignature = crypto.createHash("md5").update(pfOutput).digest("hex");

    if (signature !== calculatedSignature) {
      console.error("❌ Invalid PayFast signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const paymentStatus = pfData.payment_status;
    console.log("💳 Payment status:", paymentStatus);

    if (paymentStatus === "COMPLETE") {
      const orderCode = pfData.custom_str1 || "N/A";
      const studentEmail = pfData.custom_str2 || "N/A";
      const parentEmail = pfData.custom_str3 || "N/A";
      const studentName = pfData.custom_str4 || "N/A";
      const studentGrade = pfData.custom_str5 || "N/A";

      console.log("✅ Subscription payment successful!");
      console.log("📦 Order Code:", orderCode);
      console.log("🎓 Student:", studentName, "(Grade", studentGrade, ")");
      console.log("📧 Student Email:", studentEmail);
      console.log("📧 Parent Email:", parentEmail);

      return NextResponse.json({ success: true });
    } else {
      console.log("⚠️ Payment status:", paymentStatus);
      return NextResponse.json({ success: false });
    }

  } catch (error) {
    console.error("❌ PayFast webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}