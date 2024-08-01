-- DropIndex
DROP INDEX "UserEOAAccount_smartWalletAddress_key";

-- AlterTable
ALTER TABLE "UserEOAAccount" ALTER COLUMN "smartWalletAddress" DROP NOT NULL;
