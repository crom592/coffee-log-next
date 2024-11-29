/*
  Warnings:

  - You are about to drop the column `beanName` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `brewMethod` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `roastLevel` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `coffeeLogId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `CoffeeLog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `beanId` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `methodId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "beanName",
DROP COLUMN "brewMethod",
DROP COLUMN "roastLevel",
ADD COLUMN     "beanId" TEXT NOT NULL,
ADD COLUMN     "methodId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "coffeeLogId",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "CoffeeLog";

-- CreateTable
CREATE TABLE "Bean" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roastLevel" TEXT NOT NULL,
    "origin" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bean_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrewMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BrewMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bean_userId_idx" ON "Bean"("userId");

-- CreateIndex
CREATE INDEX "BrewMethod_userId_idx" ON "BrewMethod"("userId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");

-- CreateIndex
CREATE INDEX "Log_beanId_idx" ON "Log"("beanId");

-- CreateIndex
CREATE INDEX "Log_methodId_idx" ON "Log"("methodId");

-- CreateIndex
CREATE INDEX "Post_userId_idx" ON "Post"("userId");
