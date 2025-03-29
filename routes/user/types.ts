import type express from "express";

export interface CreateUserRequest extends express.Request {
	body: {
		username: string;
		password: string;
		display_name?: string;
		referrer?: string;
	};
}

export interface NewUser {
	uuid: string;
	username: string;
	hash: string;
	display_name?: string;
	is_admin: boolean;
	account_status: string;
	referrer?: string;
}
