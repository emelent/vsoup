const jwt = require('jsonwebtoken')
const fs = require('fs')
const hash = require('jshashes')
const {ObjectId} = require('mongoose').Types

const sha256 = new hash.SHA256
// sign with RSA SHA256
const privateCert = fs.readFileSync('key.pem')
const publicCert = fs.readFileSync('cert.pem')

const createToken = (payload, options) => 
	jwt.sign(payload, privateCert, { algorithm: 'RS256'}, options)

const validateToken = (token, options) => {
	try{
		return jwt.verify(token, publicCert, options)
	}catch(e){
		//do something with this maybe?
	}
	return null
}


const hashPassword = password => sha256.hex(password)

const inflateId = id => ObjectId.createFromHexString(id)

//Implement
const isHex = val => {
	const reg = new RegExp(/^[0-9a-f]{24}$/i)
	return reg.test(val)
}

module.exports = {
	createToken,
	validateToken,
	hashPassword,
	inflateId,
	isHex
}