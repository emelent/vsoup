const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	period:{
		type: String,
		required: true
	},
	lessons: {
		type: Number,
		required: true
	},
	name: {
		type:String,
		required: true,
		unique: true
	},
	code: {
		type:String,
		required: true,
		unique: true
	}
})
module.exports = mongoose.model('Module', schema)
