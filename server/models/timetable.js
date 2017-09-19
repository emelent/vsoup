const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const schema = mongoose.Schema({
	events: {
		type: [ObjectId],
	},
	modules: {
		type: [ObjectId],
	},
	author_id: {
		type: ObjectId,
		required: true
	}
})
module.exports = mongoose.model('Timetable', schema)