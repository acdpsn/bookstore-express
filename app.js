const express = require('express')
const pgp = require('pg-promise')(/* options */)

const app = express()
const port = 6001
// const db = pgp('postgres://username:password@host:port/database')
const db = pgp('postgres://bookstore:next@localhost:5432/')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

app.get('/db-test', (req, res) => {
  db.one('SELECT $1 AS value', 123)
  .then((data) => {

    res.status(200).send({ data})
  })
  .catch((error) => {
    res.status(500).send({ error })
  })
})
