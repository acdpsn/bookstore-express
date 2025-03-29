import pgPromise from "pg-promise";

const pgUsername = process.env?.PG_USERNAME;
const pgPassword = process.env?.PG_PASSWORD;
const pgHost = process.env?.PG_HOST;
const pgPort = process.env?.PG_PORT;

const pgp = pgPromise({ schema: "user_info" });

export const db = pgp(
	`postgres://${pgUsername}:${pgPassword}@${pgHost}:${pgPort}/`,
);
