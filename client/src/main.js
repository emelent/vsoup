// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'tachyons'
import './assets/theme.css'

import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Vuex from 'vuex'

import App from './App'
import router from './router'
import apolloProvider from './apolloProvider'
import storeConfig from './storeConfig'

Vue.config.productionTip = false

Vue.use(VueApollo)
Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: {App},
	
	store,
	router,
	// apolloProvider
})
