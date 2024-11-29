import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { newName, email } = await req.json();
    const user = await User.findOne({ email:email }).select("_id");
    user.name = newName;
    await user.save();
    console.log("User updated successfully:", user);
    return NextResponse.json({ message: "User name changed." }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}