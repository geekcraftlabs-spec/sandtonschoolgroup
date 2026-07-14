import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/mongodb";
import Subscription from "@/app/models/Subscription";

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secret-key";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const subscription = await Subscription.findOne({
      $or: [{ parentEmail: email }, { schoolEmail: email }],
      status: "active",
    });

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: "No active subscription found. Please subscribe." },
        { status: 401 }
      );
    }

    if (password !== subscription.password) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: subscription._id,
        email: subscription.parentEmail,
        schoolEmail: subscription.schoolEmail,
        studentName: subscription.studentName,
        studentEmail: subscription.studentEmail,
        role: "parent",
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: subscription._id,
        email: subscription.parentEmail,
        schoolEmail: subscription.schoolEmail,
        studentName: subscription.studentName,
        studentEmail: subscription.studentEmail,
        role: "parent",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}