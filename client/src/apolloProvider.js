import VueApollo from 'vue-apollo'
import {
	ApolloClient,
	createNetworkInterface
} from 'apollo-client'


const networkInterface = createNetworkInterface({
	uri: 'http://localhost:5000/graphql',
	transportBatching: true
})
const apolloClient = new ApolloClient({
	networkInterface,
	shouldBatch: true,
	connectToDevTools: true
})

export default new VueApollo({
	defaultClient: apolloClient,
	defaultOptions: {
		$loadingKey: 'loading'
	}
})
