const jwt = require('jsonwebtoken')
const fs = require('fs')
const hash = require('jshashes')

const sha256 = new hash.SHA256
// sign with RSA SHA256
const privateCert = fs.readFileSync('key.pem')
const publicCert = fs.readFileSync('cert.pem')

const createToken = (data, options) => 
	jwt.sign(data, privateCert, { algorithm: 'RS256'}, options)

const validateToken = token => {
	try{
		const decoded = jwt.verify(token, publicCert)
		return decoded
	}catch(e){
		//do something with this maybe?
	}
	return null
}

//TODO implement
const hashPassword = password => sha256.hex(password)

module.exports = {
	createToken,
	validateToken,
	hashPassword
}