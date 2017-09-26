// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'tachyons'
import './assets/theme.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import {
	ApolloClient,
	createNetworkInterface
} from 'apollo-client'
import VueApollo from 'vue-apollo'


Vue.config.productionTip = false

const networkInterface = createNetworkInterface({
	uri: 'http://localhost:4000/graphql',
	transportBatching: true
})
const apolloClient = new ApolloClient({
	networkInterface,
	shouldBatch: true,
	connectToDevTools: true
})

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
	defaultClient: apolloClient
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
	apolloProvider
})
