import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  return NextResponse.json(user);
}