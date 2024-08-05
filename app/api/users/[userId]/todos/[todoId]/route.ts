import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';
import exp from 'constants';
import { NextRequest, NextResponse } from 'next/server';

type context = {
  params: {
    userId: string;
    todoId: string;
  };
};

export async function GET(req: NextRequest, context: context) {
  const { userId, todoId } = context.params;
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(todoId) },
  });
  // TODO: check if todo belongs to user
  return NextResponse.json(todo ?? {});
}

export async function PUT(req: NextRequest, context: context) {
  const { userId, todoId } = context.params;
  const { title, content, status } = await req.json();
  const todo = await prisma.todo.update({
    where: { id: parseInt(todoId) },
    data: {
      title,
      content,
      status,
      completed: status === Status.COMPLETED ? true : false,
    },
  });
  return NextResponse.json(todo);
}
