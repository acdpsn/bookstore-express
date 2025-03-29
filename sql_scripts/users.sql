create schema
	user_info

create table
  user_info.users (
    id serial not null,
    created_at timestamp without time zone not null default now(),
    uuid uuid not null,
    username text not null,
    hash text not null,
    display_name text null,
    is_admin boolean not null,
    account_status text not null,
		last_login timestamp without time zone null,
    referrer uuid null,
    can_generate_referral_codes boolean null
  );

alter table
  user_info.users
add
  constraint untitled_table_pkey primary key (id)
