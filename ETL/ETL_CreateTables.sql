-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/IPuwB1
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
DROP TABLE IF EXISTS info, college, teams, combine, draft;
Drop Table If Exists player;

CREATE TABLE "player" (
    "player_id" SERIAL   NOT NULL,
    "name" VARCHAR   NOT NULL,
    CONSTRAINT "pk_player" PRIMARY KEY (
        "player_id"
     )
);

CREATE TABLE "info" (
    "player_id" INT   NOT NULL,
    "position" VARCHAR,
    "Height" FLOAT,
    "Weight" FLOAT,
    "year" INT   NOT NULL
);

CREATE TABLE "college" (
    "player_id" INT   NOT NULL,
    "school" VARCHAR,
	"conference" VARCHAR);

CREATE TABLE "teams" (
    "player_id" INT   NOT NULL,
    "nfl_team" VARCHAR,
	"Conference" VARCHAR
);

CREATE TABLE "combine" (
    "player_id" INT   NOT NULL,
    "Forty_Yard" FLOAT,
    "Vertical" FLOAT,
    "Bench" FLOAT,
    "Broad_Jump" FLOAT,
    "Three_Cone" FLOAT,
    "Shuttle" FLOAT
);

CREATE TABLE "draft" (
    "player_id" INT   NOT NULL,
    "Round" INT,
    "Pick_no" INT);

ALTER TABLE "info" ADD CONSTRAINT "fk_info_player_id" FOREIGN KEY("player_id")
REFERENCES "player" ("player_id");

ALTER TABLE "college" ADD CONSTRAINT "fk_college_player_id" FOREIGN KEY("player_id")
REFERENCES "player" ("player_id");

ALTER TABLE "teams" ADD CONSTRAINT "fk_teams_player_id" FOREIGN KEY("player_id")
REFERENCES "player" ("player_id");

ALTER TABLE "combine" ADD CONSTRAINT "fk_combine_player_id" FOREIGN KEY("player_id")
REFERENCES "player" ("player_id");

ALTER TABLE "draft" ADD CONSTRAINT "fk_draft_player_id" FOREIGN KEY("player_id")
REFERENCES "player" ("player_id");

