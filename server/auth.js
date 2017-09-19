const express = require('express')
const bodyParser = require('body-parser')
const {createToken, validateToken, hashPassword} = require('./utils')

const expiresIn = '2d'
const newToken = (user, req) => {
	return createToken({
		_id: user._id.toString(),
		ua: req.headers['user-agent']
	}, {expiresIn})
}
const makeRouter = (db, User) => {
	const router = express.Router()

	router.use(bodyParser.json())

	router.all('/', (req, res) => {
		console.log('body =>', req.body)

		res.json(req.headers)
	})
	router.post('/token', async (req, res) => {
		if(!req.body.password || !req.body.student_id){
			res.status(422).json("No password or student_id provided.")
			return		
		}
		req.body.password = hashPassword(req.body.password)
		const user = await User.findOne(req.body).exec()
		if(!user){
			res.status(403).json("Invalid login credentials.")
			return
		}
		
		res.json({token: newToken(user, req)})
	})
	router.post('/register', async (req, res) => {
		req.body.password = hashPassword(req.body.password)
		const user = await new User(req.body).save()
		if(!user){
			res.status(401).json("Hmmm... what are you trying to do?")
			return		
		}

		res.json({token: newToken(user, req)})
	})
	router.post('/refresh', (req, res) => {
	
	})	

	return router
}


module.exports = makeRouter