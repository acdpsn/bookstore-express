import express, { type Request, type Response } from "express";
import pgPromise from "pg-promise";
import argon2 from "argon2";

const app = express();

const port = process.env?.PORT;
const pgUsername = process.env?.PG_USERNAME;
const pgPassword = process.env?.PG_PASSWORD;
const pgHost = process.env?.PG_HOST;
const pgPort = process.env?.PG_PORT;

const initOptions = {
	schema: "user_info",
};
const pgp = pgPromise(initOptions);
const db = pgp(`postgres://${pgUsername}:${pgPassword}@${pgHost}:${pgPort}/`);

app.use(express.json());

app.listen(port, () => {
	console.log(`running at http://localhost:${port}`);
});

interface CreateUserRequestProps extends Request {
	body: {
		username: string;
		password: string;
		display_name?: string;
		referrer?: string;
	};
}

interface NewUser {
	uuid: string;
	username: string;
	hash: string;
	display_name?: string;
	is_admin: boolean;
	account_status: string;
	referrer?: string;
}

app.put("/create-user", async (req: CreateUserRequestProps, res: Response) => {
	try {
		const hash = await argon2.hash(req.body.password, {
			memoryCost: 19456,
			timeCost: 2,
			parallelism: 1,
		});

		const data: NewUser = {
			uuid: crypto.randomUUID(),
			username: req.body.username,
			hash,
			display_name: req.body?.display_name,
			is_admin: false,
			account_status: "user",
			referrer: req.body?.referrer,
		};

		const insert =
			"INSERT INTO users(uuid, username, hash, display_name, is_admin, account_status, referrer) VALUES($1, $2, $3, $4, $5, $6, $7)";

		try {
			db.none(insert, Object.values(data));
			res.send(`inserted user ${data.username}`);
		} catch (error) {
			res.status(400).send(error);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});
