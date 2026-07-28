ALTER TABLE "links" RENAME COLUMN "short_code" TO "short_url";--> statement-breakpoint
ALTER TABLE "links" DROP CONSTRAINT "links_short_code_unique";--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_short_url_unique" UNIQUE("short_url");