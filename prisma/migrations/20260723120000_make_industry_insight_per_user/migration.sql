-- Step 1: Drop the foreign key constraint from User table
ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_industryInsight_fkey";

-- Step 2: Drop the unique constraint on IndustryInsight.industry
ALTER TABLE "IndustryInsight" DROP CONSTRAINT IF EXISTS "IndustryInsight_industry_key";

-- Step 3: Add nullable userId column to IndustryInsight
ALTER TABLE "IndustryInsight" ADD COLUMN "userId" TEXT;

-- Step 4: Backfill userId - for each existing IndustryInsight row, create per-user copies
-- For each user whose industry matches an existing IndustryInsight, insert a per-user copy
INSERT INTO "IndustryInsight" (
  "id", "userId", "industry", "salaryRanges", "growthRate", "demandLevel",
  "topSkills", "marketOutlook", "keyTrends", "recommendedSkills",
  "isGrounded", "lastUpdated", "nextUpdate"
)
SELECT
  gen_random_uuid()::text,
  u."id",
  ii."industry",
  ii."salaryRanges",
  ii."growthRate",
  ii."demandLevel",
  ii."topSkills",
  ii."marketOutlook",
  ii."keyTrends",
  ii."recommendedSkills",
  ii."isGrounded",
  ii."lastUpdated",
  ii."nextUpdate"
FROM "IndustryInsight" ii
CROSS JOIN "User" u
WHERE u."industry" = ii."industry" AND ii."userId" IS NULL
ON CONFLICT DO NOTHING;

-- Step 5: For existing IndustryInsight rows with userId already populated (if any), keep them
-- This handles the case where the backfill was partial or interrupted

-- Step 6: Delete the old shared industry insight rows that have no userId
DELETE FROM "IndustryInsight" WHERE "userId" IS NULL;

-- Step 7: Make userId NOT NULL
ALTER TABLE "IndustryInsight" ALTER COLUMN "userId" SET NOT NULL;

-- Step 8: Add foreign key constraint
ALTER TABLE "IndustryInsight" ADD CONSTRAINT "IndustryInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;

-- Step 9: Add composite unique constraint
ALTER TABLE "IndustryInsight" ADD CONSTRAINT "IndustryInsight_userId_industry_key" UNIQUE("userId", "industry");

-- Step 10: Add index for efficient lookups by userId
CREATE INDEX "IndustryInsight_userId_idx" ON "IndustryInsight"("userId");
