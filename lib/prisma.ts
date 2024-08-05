import { PrismaClient } from '@prisma/client';
import { format } from 'sql-formatter';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + format(e.query, { language: 'postgresql' }));
});
export default prisma;
