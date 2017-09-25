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

//set mongoose to return standard Javascript Promises instead of Mongoose promises
//so we can use await/async stuff.
mongoose.Promise =  global.Promise
mongoose.connect('mongodb://localhost/mydb', {useMongoClient: true})

const app = express()
const port = 5000
const db = mongoose.connection

//create authentication router
const authRouter = require('./auth')(db, models.User)
//attach authentication router
app.use('/auth',  authRouter)

//attach graphql router
app.use('/graphql', 
	bodyParser.json(), 
	graphqlExpress(req => ({
		schema, 
		context: {...models, req}
	}))
)

//attach graphiql
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.listen(port, () => {
	console.log(`Listening on :${port}`)
})
