import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import {routerReducer, routerMiddleware} from 'react-router-redux'

import reducer from '../reducers'
import rootSaga from '../sagas'



export const history = createHistory()

const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (preloadedState) => {
	const store = createStore(
		combineReducers({
			...reducer,
			router: routerReducer
		}),
		preloadedState,
		composeEnhancers(
			applyMiddleware(routeMiddleware, sagaMiddleware)
		)
	)
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default
			store.replaceReducer(nextRootReducer)
		})
	}

	sagaMiddleware.run(rootSaga)
	return store
}

export default configureStore
