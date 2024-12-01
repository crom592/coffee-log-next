-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "beanAltitude" TEXT,
ADD COLUMN     "beanDescription" TEXT,
ADD COLUMN     "beanFarm" TEXT,
ADD COLUMN     "beanOrigin" TEXT,
ADD COLUMN     "beanProcess" TEXT,
ADD COLUMN     "beanRegion" TEXT,
ADD COLUMN     "beanRoastDate" TIMESTAMP(3),
ADD COLUMN     "beanRoastLevel" TEXT,
ADD COLUMN     "beanVariety" TEXT,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "grinderType" DROP NOT NULL;
