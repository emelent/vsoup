import React from 'react'
import {Provider} from 'react-redux'
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'

import configureStore, {history} from '../redux/store'
import App from '../components/App'
import Other from '../components/Other'

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = configureStore()

const Root = () => (
	<Provider store={store}>
		{ /* ConnectedRouter will use the store from Provider automatically */ }
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={App}/>
				<Route path="/other" component={Other}/>
			</div>
		</ConnectedRouter>
	</Provider>
)

export default Root