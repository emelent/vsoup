
import axios from 'axios'

export const apiUrl = 'http://localhost:5000'
export const gqlUrl = 'http://localhost:5000/graphql'


const createBearer = token => ({
	Authorization: `Bearer ${token}`
})

const secureOptions = (options, token) => ({
	...options, 
	...{
		headers: {
			...options.headers, 
			...createBearer(token)
		}
	}
})

const makePost = url => (data, options) => axios.post(
	`${apiUrl}/${url}`,
	data,
	options
)



const makeSecurePost = url => token => (data, options) => axios.post(
	`${apiUrl}/${url}`,
	data,
	secureOptions(options, token)
)

export const getTokenReq = makePost('auth/token')
export const registerUserReq = makePost('auth/register')
export const makeRefreshTokenReq = makeSecurePost('auth/refresh')

export const gqlRequest = (query, variables, options) => axios.post(
	gqlUrl,
	{query, variables},
	options
)
export const makeGqlSecureRequest = token => 
	(query, variables, options={}) => 
		gqlRequest(query, variables, secureOptions(options, token))
