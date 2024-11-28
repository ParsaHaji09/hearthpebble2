import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { newName, email } = await req.json();
    console.log(newName)
    console.log(email)
    const user = await User.findOne({ email }).select("_id");
    console.log(user)
    user.name = newName;
    await user.save();
    console.log("User updated successfully:", user);
    return NextResponse.json({ message: "User name changed." }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}