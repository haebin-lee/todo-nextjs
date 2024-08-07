import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { BadRequestError, NotFoundError } from './error';

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
          { type: 'BadRequestError', message: err.message },
          { status: 400 }
        );
      } else if (err instanceof NotFoundError) {
        return NextResponse.json(
          { type: 'NotFoundError', message: err.message },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { type: 'InternalServerError', message: 'Internal Server Error' },
          { status: 500 }
        );
      }
    }
  };
}
