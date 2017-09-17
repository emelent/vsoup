const ObjectId = require('mongoose').Types.ObjectId
module.exports = {
	Query: {
		modules: async(parent, args, {
			Module
		}) => {
			const modules = await Module.find(args)
			return modules.map(x => {
				x._id = x._id.toString()
				return x
			})
		},
		events: async(parent, args, {
			Event
		}) => {
			const events = await Event.find(args)
			return events.map(x => {
				x._id = x._id.toString()
				x.module_id = x.module_id.toString()
				if (x.date)
					x.date = x.date.toString()
				if (x.author_id)
					x.author_id = x.author_id.toString()

				return x
			})
		},
	},
	Mutation: {
		createModule: async (parent, args, {Module}) => {
			const x = await new Module(args).save()
			x._id = x._id.toString()
			return x
		},
		updateModule: async (parent, args, {Module}) => {
			const _id = ObjectId.createFromHexString(args._id)
			delete args._id
			const x = await Module.findOneAndUpdate({_id},args)
			x._id = x._id.toString()
			return x
		},
		deleteModule: async (parent, args, {Module}) => {
			const _id = ObjectId.createFromHexString(args._id)
			const x = await Module.findOneAndDelete({_id})
			x._id = x._id.toString()
			return x
		},

		createEvent: async (parent, args, {Event}) => {
			const x = await new Event(args).save()
			x._id = x._id.toString()
			x.module_id = x.module_id.toString()
			if (x.date)
				x.date = x.date.toString()
			if (x.author_id)
				x.author_id = x.author_id.toString()
			return x
		},
		updateEvent: async (parent, args, {Event}) => {
			const _id = ObjectId.createFromHexString(args._id)
			delete args._id
			const x = await Event.findOneAndUpdate({_id},args)
			x._id = x._id.toString()
			if (x.date)
				x.date = x.date.toString()
			if (x.author_id)
				x.author_id = x.author_id.toString()
			return x
		},
		deleteEvent: async (parent, args, {Event}) => {
			const _id = ObjectId.createFromHexString(args._id)
			const x = await Event.findOneAndDelete({_id})
			x._id = x._id.toString()
			if (x.date)
				x.date = x.date.toString()
			if (x.author_id)
				x.author_id = x.author_id.toString()
			return x
		},
	},
};