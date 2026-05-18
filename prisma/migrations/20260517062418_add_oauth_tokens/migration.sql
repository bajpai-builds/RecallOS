-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastSyncAt" TIMESTAMP(3),
ADD COLUMN     "providerRefreshToken" TEXT,
ADD COLUMN     "providerToken" TEXT;
