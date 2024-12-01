/*
  Warnings:

  - You are about to drop the column `time` on the `Log` table. All the data in the column will be lost.
  - You are about to alter the column `temperature` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(4,1)`.
  - Added the required column `doseIn` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doseOut` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grinderType` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSeconds` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ratio` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "time",
ADD COLUMN     "doseIn" DECIMAL(4,1) NOT NULL,
ADD COLUMN     "doseOut" DECIMAL(4,1) NOT NULL,
ADD COLUMN     "extractionYield" DECIMAL(4,2),
ADD COLUMN     "filterType" TEXT,
ADD COLUMN     "grinderType" TEXT NOT NULL,
ADD COLUMN     "improvements" TEXT,
ADD COLUMN     "tds" DECIMAL(4,2),
ADD COLUMN     "timeSeconds" INTEGER NOT NULL,
ADD COLUMN     "waterType" TEXT,
ALTER COLUMN "temperature" SET DATA TYPE DECIMAL(4,1),
DROP COLUMN "ratio",
ADD COLUMN     "ratio" DECIMAL(4,2) NOT NULL;
