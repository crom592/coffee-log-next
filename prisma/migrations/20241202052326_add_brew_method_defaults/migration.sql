-- AlterTable
ALTER TABLE "BrewMethod" ADD COLUMN     "defaultDose" DECIMAL(4,1),
ADD COLUMN     "defaultRatio" DECIMAL(4,2),
ADD COLUMN     "defaultTemp" DECIMAL(4,1);
