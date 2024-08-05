import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type context = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, context: context) {
  const { userId } = context.params;
  const user = await prisma.user.findFirstOrThrow({
    where: { id: parseInt(userId) },
    include: {
      todos: true,
    },
  });
  return NextResponse.json(user ?? {});
}

export async function PUT(request: NextRequest, context: context) {
  const { userId } = context.params;
  const { email, name } = await request.json();
  const user = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      email,
      name,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(request: NextRequest, context: context) {
  const { userId } = context.params;
  const user = await prisma.user.delete({
    where: { id: parseInt(userId) },
  });
  return NextResponse.json(user);
}
