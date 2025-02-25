-- Adminer 4.8.1 PostgreSQL 17.4 (Debian 17.4-1.pgdg120+2) dump

\connect "bookstore";

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS untitled_table_id_seq;
CREATE SEQUENCE untitled_table_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "user_info"."users" (
    "id" integer DEFAULT nextval('untitled_table_id_seq') NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "uuid" uuid NOT NULL,
    "username" text NOT NULL,
    "hash" text NOT NULL,
    "salt" text NOT NULL,
    "display_name" text,
    "is_admin" boolean NOT NULL,
    CONSTRAINT "untitled_table_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2025-02-25 21:53:00.181011+00
