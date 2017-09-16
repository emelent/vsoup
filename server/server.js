const express = require('express')
const mongoose = require('mongoose')
const {Module, Event} = require('./models')

mongoose.Promise =  global.Promise
mongoose.connect('mongodb://localhost/mydb')

const app = express()
const port = 5000

app.listen(port, () => {
	console.log(`Listening on :${port}`)
})
