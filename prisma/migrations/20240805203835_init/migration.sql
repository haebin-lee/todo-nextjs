-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'PENDING');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_STARTED';
