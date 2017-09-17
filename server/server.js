const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

mongoose.Promise =  global.Promise
mongoose.connect('mongodb://localhost/mydb')

const app = express()
const port = 5000
const db = mongoose.connection

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {...models} }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(port, () => {
	console.log(`Listening on :${port}`)
})
