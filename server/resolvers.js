const ObjectId = require('mongoose').Types.ObjectId

const gqlEvent = x => {
	if(!x) return
	x._id = x._id.toString()
	if(x.module_id)
		x.module_id = x.module_id.toString()
	if (x.date)
		x.date = x.date.toString()
	if (x.author_id)
		x.author_id = x.author_id.toString()

	return x
}
const gqlModule = x => {
	if(!x) return
	x._id = x._id.toString()
	return  x
}

module.exports = {
	Query: {
		modules: async(parent, args, {Module}) => {
			const modules = await Module.find(args).exec()
			return modules.map(x => gqlModule(x))
		},
		module: async(parent, args, {Module}) => {
			const x = await Module.findOne(args).exec()
			return gqlModule(x)
		},

		events: async(parent, args, {Event}) => {
			const events = await Event.find(args).exec()
			return events.map(x => gqlEvent(x))
		},
		event: async(parent, args, {Event}) => {
			const x = await Event.findOne(args).exec()
			return gqlEvent(x)
		},
		
	},
	Mutation: {
		createModule: async (parent, args, {Module}) => {
			const x = await new Module(args).save()
			return gqlModule(x)
		},
		updateModule: async (parent, args, {Module}) => {
			const _id = ObjectId.createFromHexString(args._id)
			delete args._id
			const x = await Module.findByIdAndUpdate(_id,args).exec()
			console.log(x)
			return gqlModule(x)
		},
		deleteModule: async (parent, args, {Module}) => {
			const _id = ObjectId.createFromHexString(args._id)
			const x = await Module.findByIdAndRemove({_id}).exec()
			return gqlModule(x)
		},

		createEvent: async (parent, args, {Event}) => {
			const x = await new Event(args).save()
			return gqlEvent(x)
		},
		updateEvent: async (parent, args, {Event}) => {
			const _id = ObjectId.createFromHexString(args._id)
			delete args._id
			const x = await Event.findByIdAndUpdate(_id,args).exec()
			return gqlEvent(x)
		},
		deleteEvent: async (parent, args, {Event}) => {
			const _id = ObjectId.createFromHexString(args._id)
			const x = await Event.findByIdAndRemove(_id).exec()
			return gqlEvent(x)
		},
	},
};