import express from "express";
import argon2 from "argon2";

import type { CreateUserRequest, NewUser } from "./types";
import { db } from "./db.ts";

const router = express.Router();

router
	.route("/create")
	.put(async (req: CreateUserRequest, res: express.Response) => {
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
				"insert into users(uuid, username, hash, display_name, is_admin, account_status, referrer) values($1, $2, $3, $4, $5, $6, $7)";

			try {
				db.none(insert, Object.values(data));
				res.send(`inserted user ${data.username}`);
			} catch (err) {
				res.status(500).send(err);
			}
		} catch (err) {
			res.status(500).send(err);
		}
	});

export default router;
