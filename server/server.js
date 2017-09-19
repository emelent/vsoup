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
mongoose.connect('mongodb://localhost/mydb', {useMongoClient: true})

const app = express()
const port = 5000
const db = mongoose.connection
const authRouter = require('./auth')(db, models.User)

app.use('/graphql', 
	bodyParser.json(), 
	graphqlExpress(req => ({
		schema, 
		context: {...models, req}
	}))
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/auth',  authRouter)

app.listen(port, () => {
	console.log(`Listening on :${port}`)
})
