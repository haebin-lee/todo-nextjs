import { Todo } from '@prisma/client';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const todos: Todo[] = await prisma.todo.findMany();
  return NextResponse.json(todos);
}
