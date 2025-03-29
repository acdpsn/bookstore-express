import express from "express";
import argon2 from "argon2";

import { db } from "./db.ts";

const router = express.Router();

router
	.route("/authorize")
	.get(async (req: express.Request, res: express.Response) => {
		try {
			const hashes = await db.any(
				"select hash from user_info.users where username=$1",
				req.body.username,
			);

			try {
				if (await argon2.verify(hashes[0].hash, req.body.password)) {
					res.send("match");
				} else {
					res.status(400).send("mismatch");
				}
			} catch (err) {
				res.status(500).send(err);
			}
		} catch (err) {
			res.status(500).send(err);
		}
	});

export default router;
