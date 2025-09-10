/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RedditData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "display_name" TEXT NOT NULL,
    "title" TEXT,
    "subscribers" INTEGER,
    "over_18" BOOLEAN,
    "createdAt" DATETIME,
    "icon_img" TEXT,
    "url" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "RedditData_display_name_key" ON "RedditData"("display_name");

-- CreateIndex
CREATE INDEX "RedditData_subscribers_idx" ON "RedditData"("subscribers");
