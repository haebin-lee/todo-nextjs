import { validateBody, withErrorHandling } from '@/lib/api-handler';
import { BadRequestError } from '@/lib/error';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

const postSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});

export const POST = withErrorHandling(
  async (req: NextRequest): Promise<NextResponse> => {
    const validBody = await validateBody(req, postSchema);
    const { email, name } = validBody;

    await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .then((user) => {
        if (user) {
          throw new BadRequestError('EMAIL_ALREADY_EXISTS');
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
