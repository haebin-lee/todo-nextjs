import { NextRequest, NextResponse } from 'next/server';
import { BadRequestError, NotFoundError } from './error';
import { ZodSchema } from 'zod';

export function withErrorHandling(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req);
    } catch (err) {
      console.error(err);
      console.log('check', err instanceof BadRequestError);

      if (err instanceof BadRequestError) {
        return NextResponse.json(
          { code: err.errorCode, message: err.message, details: err.details },
          { status: 400 }
        );
      } else if (err instanceof NotFoundError) {
        return NextResponse.json({ message: err.message }, { status: 404 });
      } else {
        return NextResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      }
    }
  };
}

export const validateQuery = (req: NextRequest, schema: ZodSchema) => {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  const result = schema.safeParse(query);
  if (!result.success) {
    throw new BadRequestError('VALIDATION_ERROR', result.error.errors);
  }
  return result.data;
};

export const validateBody = async (req: NextRequest, schema: ZodSchema) => {
  const json = await req.json();
  const result = schema.safeParse(json);
  if (!result.success) {
    throw new BadRequestError('VALIDATION_ERROR', result.error.errors);
  }
  return result.data;
};
