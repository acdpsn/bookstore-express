import express from "express";
import argon2 from "argon2";
import * as jose from "jose";

import { db } from "./db.ts";

const router = express.Router();
const msInMin = 60000;
const jwtAge = (Number(process.env?.JWT_EXP) || 120) * msInMin;

router
	.route("/login")
	.get(async (req: express.Request, res: express.Response) => {
		try {
			const hashes = await db.any(
				"select hash from user_info.users where username=$1",
				req.body.username,
			);

			try {
				if (await argon2.verify(hashes[0].hash, req.body.password)) {
					const jwt = await getJwt(req.body.username);
					res.cookie("token", jwt, { maxAge: jwtAge });
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

const getJwt = async (username: string) => {
	if (typeof process.env.JWT_SECRET === "undefined") {
		throw new Error("JWT_SECRET is undefined");
	}

	const secret = jose.base64url.decode(process.env.JWT_SECRET);

	const jwt = await new jose.SignJWT({ username })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(jwtAge)
		.sign(secret);

	return jwt;
};

export default router;
