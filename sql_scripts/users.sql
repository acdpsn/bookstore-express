CREATE SCHEMA
	user_info

CREATE TABLE
  user_info.users (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    uuid uuid NOT NULL,
    username text NOT NULL,
    hash text NOT NULL,
    display_name text NULL,
    is_admin boolean NOT NULL,
    account_status text NOT NULL,
		last_login timestamp without time zone NULL,
    referrer uuid NULL,
    can_generate_referral_codes boolean NULL
  );

ALTER TABLE
  user_info.users
ADD
  CONSTRAINT untitled_table_pkey PRIMARY KEY (id)
