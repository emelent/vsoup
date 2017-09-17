const mongoose = require('mongoose')
const {ObjectId, Mixed} = mongoose.Schema.Types

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
	email: {
		type: String,
		required: true,
		lowercase: true,
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
	modules: [ObjectId],
	timetables: [ObjectId],
	timetable_aliases: [Mixed]
})

module.exports = mongoose.model('User', schema)