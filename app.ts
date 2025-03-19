import express, { type Request, type Response } from "express";
import pgPromise from "pg-promise";

const app = express();
const port = process.env?.PORT;

const initOptions = {
	schema: "user_info",
};
const pgp = pgPromise(initOptions);
// const db = pgp('postgres://username:password@host:port/database')
const db = pgp("postgres://bookstore:next@localhost:5432/");

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
	salt: string;
	display_name?: string;
	is_admin: boolean;
	account_status: string;
	referrer?: string;
}

app.put("/create-user", (req: CreateUserRequestProps, res: Response) => {
	const data: NewUser = {
		uuid: crypto.randomUUID(),
		username: req.body.username,
		hash: "hash_val", // todo
		salt: "salt_val", // todo
		display_name: req.body?.display_name,
		is_admin: false,
		account_status: "user",
		referrer: req.body?.referrer,
	};

	const insert =
		"INSERT INTO users(uuid, username, hash, salt, display_name, is_admin, account_status, referrer) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";

	db.none(insert, Object.values(data))
		.then(() => {
			res.send(`inserted user ${data.username}`);
		})
		.catch((error: unknown) => {
			res.status(400).send(error);
		});
});
