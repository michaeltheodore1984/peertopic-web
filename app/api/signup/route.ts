// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { email, password, name, role } = await req.json();

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashed,
    name,
    role,
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
