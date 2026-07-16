import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import Subscription from "@/app/models/Subscription";

// WhatsApp notification helper using CallMeBot
async function sendWhatsAppNotification(message: string) {
  const phone = "27684858415";
  const apiKey = "3802479";
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
    const response = await fetch(url);
    const result = await response.text();
    console.log("📲 WhatsApp notification sent:", result);
  } catch (error) {
    console.error("❌ Failed to send WhatsApp notification:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { parent, student, startDate, proRataAmount, monthlyFee } = body;

    console.log("📦 Checkout request received:", { parent, student, proRataAmount });

    if (!parent || !student || !proRataAmount || !monthlyFee) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const shortCode = `SSG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const existing = await Subscription.findOne({
      $or: [{ parentEmail: parent.parentEmail }, { schoolEmail: student.schoolEmail }],
    });

    if (existing) {
      console.log("⚠️ Subscription already exists for:", parent.parentEmail);
      return NextResponse.json(
        { success: false, error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const subscription = await Subscription.create({
      orderCode: shortCode,
      parentName: parent.parentName,
      parentEmail: parent.parentEmail,
      parentPhone: parent.parentPhone,
      studentName: student.studentName,
      studentEmail: student.studentEmail,
      studentGrade: student.studentGrade,
      schoolEmail: student.schoolEmail,
      password: student.password,
      startDate: new Date(startDate),
      proRataAmount,
      monthlyFee,
      total: proRataAmount,
      status: "pending",
      paymentStatus: "pending",
    });

    console.log("✅ Subscription created with ID:", subscription._id);

    // ============================================================
    // SEND WHATSAPP NOTIFICATION VIA CALLMEBOT
    // ============================================================
    const whatsappMessage = `
🎉 NEW SUBSCRIPTION!

Order: ${shortCode}
Parent: ${parent.parentName}
Parent Email: ${parent.parentEmail}
Student: ${student.studentName}
Student Email: ${student.studentEmail}
Password: ${student.password}
School Email: ${student.schoolEmail}
Grade: ${student.studentGrade}
Amount: R${proRataAmount.toFixed(2)}

Login at: https://sandtonschoolgroup.vercel.app/login
    `.trim();

    await sendWhatsAppNotification(whatsappMessage);
    console.log("✅ WhatsApp notification sent to 27684858415");

    const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || "10051618";
    const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || "yd0atu6cfp3ee";
    
    // ✅ FIX: Remove trailing slash from baseUrl
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || "http://localhost:3000").replace(/\/+$/, "");

    const amount = proRataAmount.toFixed(2);
    const itemName = `Sandton School Group - Monthly Subscription (${student.studentName})`;
    const itemDescription = `School Portal Access for ${student.studentName} (Grade ${student.studentGrade})`;

    const pfData = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${baseUrl}/subscribe?code=${shortCode}&status=success`,
      cancel_url: `${baseUrl}/subscribe?status=cancel`,
      notify_url: `${baseUrl}/api/payfast/itn`, // <-- now correctly formed
      amount: amount,
      item_name: itemName,
      item_description: itemDescription,
      email_confirmation: "1",
      custom_int1: 1,
      custom_str1: shortCode,
      custom_str2: student.studentEmail,
      custom_str3: parent.parentEmail,
      custom_str4: student.studentName,
      custom_str5: student.studentGrade,
      subscription_type: 2,
    };

    const actionUrl = process.env.NEXT_PUBLIC_PAYFAST_SANDBOX_URL || "https://sandbox.payfast.co.za/eng/process";

    console.log("🚀 Returning checkout response");
    return NextResponse.json({
      success: true,
      actionUrl,
      pfData,
      orderCode: shortCode,
      pendingSubscription: subscription,
    });
  } catch (error) {
    console.error("❌ PayFast checkout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create PayFast transaction",
      },
      { status: 500 }
    );
  }
}