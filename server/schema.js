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
	venue: String
	language: String!
	group: String
	author_id: ID
	date: String
}

type Query {
	module(
		name: String
		code: String
		period: String
		lessons: Int
	): Module
	modules(
		name: String
		code: String
		period: String
		lessons: Int
	): [Module]!
	event(
		name: String
		module_id: ID
		day: String
		start: String
		end: String
		language: String
		group: String
		author_id: ID
		date: String
		venue: String
	): Event
	events(
		name: String
		module_id: ID
		day: String
		start: String
		end: String
		venue: String
		language: String
		group: String
		author_id: ID
		date: String
	):  [Event]!
}

type Mutation {
	createModule(
		name: String!
		code: String!
		period: String!
		lessons: Int!
	): Module
	updateModule(
		_id:  ID!
		name: String
		code: String
		period: String
		lessons: Int
	): Module
	deleteModule(_id: ID): Module

	createEvent(	
		name: String!
		day: String!
		start: String!
		end: String!
		language: String!
		group: String
		venue: String
		date: String
		author_id: ID
		module_id: ID
	): Event
	updateEvent(
		_id: ID!	
		name: String
		module_id: ID
		day: String
		venue: String
		start: String
		end: String
		language: String
		group: String
		author_id: ID
		date: String
	): Event
	deleteEvent(_id: ID): Event
}

`
