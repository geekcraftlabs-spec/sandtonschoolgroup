import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscription extends Document {
  orderCode: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentEmail: string;
  studentGrade: string;
  schoolEmail: string;
  password: string;
  startDate: Date;
  proRataAmount: number;
  monthlyFee: number;
  total: number;
  status: "pending" | "active" | "expired" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema: Schema<ISubscription> = new Schema(
  {
    orderCode: { type: String, required: true, unique: true },
    parentName: { type: String, required: true },
    parentEmail: { type: String, required: true },
    parentPhone: { type: String, required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentGrade: { type: String, required: true },
    schoolEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    startDate: { type: Date, required: true },
    proRataAmount: { type: Number, required: true },
    monthlyFee: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "active", "expired", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;