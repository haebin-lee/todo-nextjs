import { withErrorHandling } from '@/lib/apiHandler';
import { BadRequestError, ERROR_CODE } from '@/lib/error';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export const POST = withErrorHandling(
  async (req: NextRequest): Promise<NextResponse> => {
    const { email, name } = await req.json();

    await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .then((user) => {
        if (user) {
          throw new BadRequestError(ERROR_CODE.EMAIL_ALREADY_EXISTS);
        }
      });

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return NextResponse.json(user);
  }
);
