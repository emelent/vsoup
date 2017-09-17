const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	module_id: {
		type: ObjectId,
		required: true
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
		required: true
	},
	date: Date,
	group: String,
	author_id: ObjectId
})
module.exports = mongoose.model('Event', schema)
