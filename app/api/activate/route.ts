import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import Subscription from "@/app/models/Subscription";

export async function POST(request: NextRequest) {
  try {
    const { orderCode } = await request.json();

    if (!orderCode) {
      return NextResponse.json(
        { error: "Order code is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const subscription = await Subscription.findOne({ orderCode });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    if (subscription.status === "active") {
      return NextResponse.json({
        message: "Subscription already active",
        subscription,
      });
    }

    subscription.status = "active";
    subscription.paymentStatus = "completed";
    await subscription.save();

    console.log(`✅ Subscription activated: ${subscription.parentEmail}`);

    return NextResponse.json({
      success: true,
      message: "Subscription activated",
      subscription: {
        parentEmail: subscription.parentEmail,
        studentName: subscription.studentName,
        schoolEmail: subscription.schoolEmail,
        password: subscription.password,
        status: subscription.status,
      },
    });
  } catch (error) {
    console.error("Activation error:", error);
    return NextResponse.json(
      { error: "Failed to activate subscription" },
      { status: 500 }
    );
  }
}