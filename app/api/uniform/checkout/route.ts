import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface UniformItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface UniformOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: UniformItem[];
  total: number;
}

function generatePayFastSignature(
  data: Record<string, string | number>,
  passphrase: string
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
    const body: UniformOrderData = await request.json();
    const { customerName, customerEmail, customerPhone, items, total } = body;

    if (!customerName || !customerEmail || items.length === 0 || total <= 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const shortCode = `UNI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || "10051618";
    const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || "yd0atu6cfp3ee";
    const passphrase = process.env.PAYFAST_PASSPHRASE || "TeekayMay2025";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || "http://localhost:3000";

    const amount = total.toFixed(2);
    const itemName = `Uniform Order - ${customerName}`;
    const itemDescription = items.map((i) => `${i.quantity}x ${i.name} (${i.size})`).join(", ");

    const pfData: Record<string, string | number> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${baseUrl}/cart?status=success&code=${shortCode}`,
      cancel_url: `${baseUrl}/cart?status=cancel`,
      notify_url: `${baseUrl}/api/payfast/itn`,
      amount: amount,
      item_name: itemName,
      item_description: itemDescription,
      email_confirmation: "1",
      custom_int1: 2,
      custom_str1: shortCode,
      custom_str2: customerEmail,
      custom_str3: customerName,
      custom_str4: customerPhone || "N/A",
      custom_str5: items.map((i) => i.name).join("|"),
      subscription_type: 2,
    };

    const signature = generatePayFastSignature(pfData, passphrase);
    const pfDataWithSignature = { ...pfData, signature };
    const actionUrl = process.env.NEXT_PUBLIC_PAYFAST_SANDBOX_URL || "https://sandbox.payfast.co.za/eng/process";

    // Log for debugging
    console.log("🚀 Uniform order created:", shortCode);
    console.log("🔑 Signature:", signature);

    // Send WhatsApp
    const orderSummary = items.map((i) => `${i.quantity}x ${i.name} (${i.size})`).join(", ");
    const adminMessage = `🛍️ NEW UNIFORM ORDER!\n\nOrder: ${shortCode}\nCustomer: ${customerName}\nEmail: ${customerEmail}\nItems: ${orderSummary}\nTotal: R${total.toFixed(2)}`;
    try {
      const apiKey = process.env.CALLMEBOT_API_KEY || "3802479";
      await fetch(`https://api.callmebot.com/whatsapp.php?phone=27684858415&text=${encodeURIComponent(adminMessage)}&apikey=${apiKey}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) { /* ignore */ }

    return NextResponse.json({
      success: true,
      actionUrl,
      pfData: pfDataWithSignature,
      orderCode: shortCode,
      pendingOrder: {
        orderCode: shortCode,
        customerName,
        customerEmail,
        customerPhone,
        items,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Uniform checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create uniform order" },
      { status: 500 }
    );
  }
}