module.exports = `
type Module {
	_id: ID!
	name: String!
	code: String!
	lessons: Int!
	period: String!
}

type Event {
	_id: ID!
	name: String!
	module_id: ID!
	day: String!
	start: String!
	end: String!
	language: String!
	group: String
	author_id: ID
	date: String
}

type Query {
	module: Module!
	modules:  [Module!]!
	event: Event!
	events:  [Event!]!
}

type Mutation {
	createModule(
		name: String!
		code: String!
		period: String!
		lessons: Int!
	): Module!
	updateModule(
		_id:  ID!
		name: String
		code: String
		period: String
		lessons: Int
	): Module!
	deleteModule(_id: ID): Module!

	createEvent(	
		name: String!
		module_id: ID!
		day: String!
		start: String!
		end: String!
		language: String!
		group: String
		author_id: ID
		date: String
	): Event!
	updateEvent(
		_id: ID!	
		name: String
		module_id: ID
		day: String
		start: String
		end: String
		language: String
		group: String
		author_id: ID
		date: String
	): Event!
	deleteEvent(_id: ID): Event!
}

`
