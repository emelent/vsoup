const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const TimetableAlias = new mongoose.Schema({
	timetable_id: ObjectId,
	author_id: ObjectId
})

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	student_id: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	group: {
		type: String,
		default: 'STUDENT',
		uppercase: true
	},
	active_timetable: {
		type: ObjectId
	},
	modules: [ObjectId],
	timetables: [ObjectId],
	timetable_aliases: [TimetableAlias]
})

module.exports = mongoose.model('User', schema)