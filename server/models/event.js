const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		uppercase: true
	},
	module_id: {
		type: ObjectId
	},
	day: {
		type: String,
		required: true
	},
	start: {
		type: String,
		required: true
	},
	end: {
		type: String,
		required: true
	},
	language: {
		type: String,
		uppercase: true,
		required: true
	},	
	venue: {
		type: String,
		uppercase: true,
		required: true
	},
	group: {
		type: String,
		uppercase: true
	},
	date: Date,
	author_id: ObjectId
})
module.exports = mongoose.model('Event', schema)
