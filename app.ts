const express = require('express')

const app = express()
const port = 6001

const initOptions = {
  schema: 'user_info'
};
const pgp = require('pg-promise')(initOptions)
// const db = pgp('postgres://username:password@host:port/database')
const db = pgp('postgres://bookstore:next@localhost:5432/')

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

app.put('/create-user', (req: any, res: any) => {
  res.send('Got a PUT request at /create-user')

  const data = [
    crypto.randomUUID(),
    'John',
    'hash_val',
    'salt_val',
    'first user',
    false
  ]

  console.log(data)

  db.none('INSERT INTO users(uuid, username, hash, salt, display_name, is_admin) VALUES($1, $2, $3, $4, $5, $6)', data)
    .then(() => {
      console.log(`inserted user ${ data[1] }`);
    })
    .catch((error: any) => {
      console.log(error)
    });
})
