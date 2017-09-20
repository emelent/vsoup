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

type Timetable{
	_id: String!
	author_id: ID!
	events: [ID!]!
	modules: [ID!]!
}
type TimetableAlias{
	timetable_id: ID!
	alias: String!
}

type User {
	_id: ID!
	name: String!
	student_id: String!
	modules: [ID]
	timetables: [ID]
	timetable_aliases: [TimetableAlias]
}

type Query {
	module(
		code: String
	): Module
	modules(
		name: String
		code: String
		period: String
		lessons: Int
	): [Module]!


	event(_id:ID!): Event
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

	user(
		name: String
		_id: ID
		student_id: String
	): User
	users: [User]!

	timetablesByModules(
		modules: [ID]!
		exclude_author_id: ID
	): Timetable

	timetablesByAuthor(
		author_id: ID!
	): Timetable

	timetables:[Timetable]!

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
	): Module
	deleteModule(_id: ID!): Module


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
	): Event!
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
	deleteEvent(_id: ID!): Event

	updateUser(
		_id: ID!
		group: String
		name: String
		modules: [ID]
		timetables: [ID]
	): [ID]!
	deleteUser(_id: ID!): User

	createTimetable(
		alias: String!
	): Timetable!
	deleteTimetable(
		_id: ID!
	): Timetable
	updateTimetable(
		_id: ID!
		events: [ID]
		alias: String
	): Timetable
	
}

`
