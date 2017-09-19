const {
	GraphQLError
} = require('graphql')
const ObjectId = require('mongoose').Types.ObjectId
const {validateToken} = require('./utils')
const inflateId = id => ObjectId.createFromHexString(id)

const gqlEvent = x => {
	if (!x) return
	x._id = x._id.toString()
	if (x.module_id)
		x.module_id = x.module_id.toString()
	if (x.date)
		x.date = x.date.toString()
	if (x.author_id)
		x.author_id = x.author_id.toString()

	return x
}
const gqlModule = x => {
	if (!x) return
	x._id = x._id.toString()
	return x
}

const gqlUser = x => {
	if (!x) return
	x._id = x._id.toString()
	if (x.modules)
		x.modules = x.modules.map(y => y.toString())
	if (x.events)
		x.events = x.events.map(y => y.toString())
	return x
}

const gqlTimetable = x => {
	if (!x) return
	x._id = x._id.toString()
	x.author_id = x.author_id.toString()
	if (x.events)
		x.events = x.events.map(y => y.toString())
	if (x.modules)
		x.modules = x.modules.map(y => y.toString())
	return x
}

module.exports = {
	Query: {
		modules: async(parent, args, {Module, req}) => {
			const token = req.get('authorization').split(' ')[1]
			console.log('auth =>', validateToken(token))
			const modules = await Module.find(args).exec()
			return modules.map(x => gqlModule(x))
		},
		module: async(parent, args, {
			Module
		}) => {
			const x = await Module.findOne(args).exec()
			return gqlModule(x)
		},


		events: async(parent, args, {
			Event
		}) => {
			const events = await Event.find(args).exec()
			return events.map(x => gqlEvent(x))
		},
		event: async(parent, args, {
			Event
		}) => {
			const x = await Event.findById(inflateId(args._id)).exec()
			return gqlEvent(x)
		},

		user: async(parent, args, {
			User
		}) => {
			const x = await User.find(args).exec()
			return gqlUser(x)
		},
		users: async(parent, args, {
			User
		}) => {
			const users = await User.find().exec()
			return users.map(x => gqlUser(x))
		},

		timetablesByModules: async(parent, args, {
			Timetable
		}) => {
			const timetables = await Timetable.find().$where(function () {
				if (args.exclude_author_id == this.author_id.toString())
					return false

				const modules = this.modules.map(m => m.toString())
				for (let m of args.modules) {
					if (modules.indexOf(m) < 0)
						return false
				}
				return true
			})
			return timetables.map(x => gqlTimetable(x))
		},
		timetablesByAuthor: async(parent, args, {
			Timetable
		}) => {
			const timetables = await Timetable.find({
				author_id: ObjectId.createFromHexString(args.author_id)
			})
			return timetables.map(x => gqlTimetable(x))
		},

		timetables: async(parent, args, {
			Timetable
		}) => {
			const timetables = await Timetable.find().exec()
			return timetables.map(x => gqlTimetable(x))
		}

	},
	Mutation: {
		createModule: async(parent, args, {
			Module
		}) => {
			const x = await new Module(args).save()
			return gqlModule(x)
		},
		updateModule: async(parent, args, {
			Module
		}) => {
			const _id = ObjectId.createFromHexString(args._id)
			delete args._id
			const x = await Module.findByIdAndUpdate(_id, args).exec()
			return gqlModule(x)
		},
		deleteModule: async(parent, args, {
			Module
		}) => {
			const _id = ObjectId.createFromHexString(args._id)
			const x = await Module.findByIdAndRemove(_id).exec()
			return gqlModule(x)
		},


		createEvent: async(parent, args, {
			Event
		}) => {
			const x = await new Event(args).save()
			return gqlEvent(x)
		},
		updateEvent: async(parent, args, {
			Event
		}) => {
			const _id = ObjectId.createFromHexString(args._id)
			delete args._id
			const x = await Event.findByIdAndUpdate(_id, args).exec()
			return gqlEvent(x)
		},
		deleteEvent: async(parent, args, {
			Event
		}) => {
			const _id = ObjectId.createFromHexString(args._id)
			const x = await Event.findByIdAndRemove(_id).exec()
			return gqlEvent(x)
		},

		createTimetable: async(parent, args, {
			Timetable
		}) => {
			const data = { ...args,
				author_id: ObjectId().toString()
			}
			const x = await new Timetable(data).save()
			return gqlTimetable(x)
		},
		updateTimetable: async(parent, args, {
			Timetable,
			Event
		}) => {
			const timetable = await Timetable.findById(inflateId(args._id)).exec()

			if (args.events) {
				//update events ObjectId array 
				timetable.events = args.events.map(x => ObjectId.createFromHexString(x))

				const setToArray = (s) => {
					const arr = []
					s.forEach(v => arr.push(v))
					return arr
				}

				//get actual events that match given id's
				const ids = args.events.map(x => inflateId(x))
				const events = await Event.find().where('_id').in(ids).exec()

				const modules = events.filter(x => {
					const id = x._id.toString()
					return args.events.indexOf(id) > -1 && x.module_id
				}).map(x => x.module_id.toString())

				//redo this with reducer
				const moduleSet = new Set(modules)
				timetable.modules = setToArray(moduleSet).map(x => inflateId(x))
			}
			if (args.alias) {
				//update user's alias for timetable
			}

			return timetable.save().then(x => gqlTimetable(x))
		},

		updateUser: async (parent, args, {User}) => {
			//check if user is admin or owner
			const {_id, modules, timetables, name, group} = args
			const x = await User.findById(inflateId(_id)).exec()
			if(modules){
				x.modules = modules.map(x => inflateId(x))
			}
			if(timetables){
				x.timetables = timetables.map(x => inflateId(x))
			}
			if(name){
				x.name = name
			}
			if(group){
				//TODO check if admin
				x.group = group
			}
			return x.save().then(x => gqlUser(x))
		},
		deleteUser: async (parent, args, {User}) => {
			const _id = ObjectId.createFromHexString(args._id)
			const x = await User.findByIdAndRemove(_id).exec()
			return gqlUser(x)			
		}
	},
};