-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACTIVE', 'INPROGRESS', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "UserEOAAccount" (
    "id" SERIAL NOT NULL,
    "eoaAddress" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "smartWalletAddress" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserEOAAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "serviceType" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "additionalDocLinks" TEXT[],
    "isMilestone" BOOLEAN NOT NULL DEFAULT false,
    "definitionOfDone" TEXT NOT NULL,
    "revisions" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "clientId" INTEGER NOT NULL,
    "freelancerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEOAAccount_smartWalletAddress_key" ON "UserEOAAccount"("smartWalletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "UserEOAAccount_userId_key" ON "UserEOAAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Request_clientId_key" ON "Request"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Request_freelancerId_key" ON "Request"("freelancerId");

-- AddForeignKey
ALTER TABLE "UserEOAAccount" ADD CONSTRAINT "UserEOAAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
