const express = require('express')
const app = express()
const mysql = require('mysql')
const db = require('./banco/db.js')
const apiIndex = require('./routes/index.js')

app.use('/', apiIndex)


app.listen(8081)
console.log('Servidor ok')