const express = require('express')

const app = express()
const env = process.env.NODE_ENV
const port = process.env?.PORT

const initOptions = {
  schema: 'user_info'
};
const pgp = require('pg-promise')(initOptions)
// const db = pgp('postgres://username:password@host:port/database')
const db = pgp('postgres://bookstore:next@localhost:5432/')

app.use(express.json());

app.listen(port, () => {
  console.log(`environment: ${ env } http://localhost:${ port }`);
})

interface CreateUserRequestProps {
  username: string;
  password: string;
  display_name?: string;
  referrer?: string;
}

interface NewUser { // todo: learn to type array
  uuid: string;
  username: string;
  hash: string;
  salt: string;
  display_name?: string;
  is_admin: boolean;
  account_status: string;
  referrer?: string;
}

app.put('/create-user', (req: any, res: any) => {
  res.send('Got a PUT request at /create-user')

  const data: NewUser = {
    uuid: crypto.randomUUID(),
    username: req.body.username,
    hash: 'hash_val', // todo
    salt: 'salt_val', // todo
    display_name: req.body?.display_name,
    is_admin: false,
    account_status: 'user',
    referrer: req.body?.referrer
  }

  console.log(data)

  const insert = 'INSERT INTO users(uuid, username, hash, salt, display_name, is_admin, account_status, referrer) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'

  db.none(insert, Object.values(data))
    .then(() => {
      console.log(`inserted user ${ data.username }`);
    })
    .catch((error: any) => {
      console.log(error)
    });
})
