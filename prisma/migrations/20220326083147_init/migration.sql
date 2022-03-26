-- CreateTable
CREATE TABLE "list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT '',
    "comment" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "list_queue" (
    "date" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT '',
    "comment" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "ranking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameid" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "date" INTEGER NOT NULL DEFAULT 0,
    "userid" INTEGER,
    "guestname" TEXT,
    "mail" TEXT,
    "comment" TEXT,
    "ip" TEXT,
    CONSTRAINT "ranking_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "list" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT '',
    "title_s" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT '',
    "detail" TEXT,
    "good" INTEGER
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" TEXT NOT NULL DEFAULT '',
    "comment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "idx_list_title" ON "list"("title");

-- CreateIndex
CREATE INDEX "idx_ranking_gameid_score_date" ON "ranking"("gameid", "score", "date");

-- CreateIndex
CREATE INDEX "idx_ranking_date" ON "ranking"("date");

-- CreateIndex
CREATE INDEX "idx_ranking_gameid" ON "ranking"("gameid");

-- CreateIndex
CREATE INDEX "idx_ranking_score" ON "ranking"("score");

-- CreateIndex
CREATE INDEX "idx_series_author_id" ON "series"("author", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");
