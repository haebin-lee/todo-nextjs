import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
type context = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, context: context) {
  const { userId } = context.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      todos: true,
    },
  });
  return NextResponse.json(user ?? {});
}

export async function POST(req: NextRequest, context: context) {
  const { userId } = context.params;
  const { title, content, status } = await req.json();
  const todo = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      todos: {
        create: {
          title,
          content,
          status,
        },
      },
    },
    include: { todos: true },
  });
  return NextResponse.json(todo);
}
