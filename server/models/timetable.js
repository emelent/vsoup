const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = mongoose.Schema({
	events: {
		type: [ObjectId],
		required: true
	},
	author_id: {
		type: ObjectId,
		required: true
	}
})
module.exports = mongoose.model('Timetable', schema)