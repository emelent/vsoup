export default {
	state: {
		count: 0,
		waiting: false
	},  
	getters: {
		count: state => state.count,
		isWaiting: state => state.waiting
	},
	mutations: {
		// Mutations
		increment: state => {
			state.count++
			state.waiting = false
		},
		incrementBy: (state, payload) => {
			state.count = state.count + payload
			state.waiting = false
		},
		waiting: state => state.waiting = true
	},
	actions: {
		incrementAsync({commit}){
			return new Promise((resolve, reject) => {
				commit('waiting')
				setTimeout(() =>{
					commit('increment')
					resolve()
				}, 1000)
			})
		},
		incrementByAsync({commit}, amount){
			commit('waiting')
			setTimeout(() =>{
				commit('incrementBy', amount)
			}, 1000)
		}
	}
}