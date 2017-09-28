import axios from 'axios'
import UserGQL from '@/gqlQueries/user'
import {makeGqlSecureRequest, gqlRequest} from '@/api'

const initialState = {
	loading: false,
	error: null,
	token: null,
	profile:{
		id: null,
		name: null,
		student_id: null,
		active_timetable_id: null,
		module_ids: [],
		timetable_ids: [],
		timetable_aliases: []
	}
}

export default {
	namespaced: true,
	state: initialState,
	getters: {
		getId: state => state.profile.id,
		getName: state => state.profile.name,
		getStudentId: state => state.profile.student_id,
		getActiveTimetableId: state => state.profile.active_timetable_id,
		getModuleIds: state => state.profile.module_ids,
		getTimetableIds: state => state.profile.timetable_ids,
		getTimetableAliases: state => state.profile.timetable_aliases,
		getError: state => state.error,
		isLoading: state => state.loading
	},

	mutations: {
		updateUser(state, user){
			state.profile.id = user._id,
			state.profile.name = user.name
			state.profile.module_ids = user.modules
			state.profile.timetable_ids = user.timetables
			state.profile.active_timetable_id = user.active_timetable
			state.profile.timetable_aliases = user.timetable_aliases
			state.profile.student_id = user.student_id
		},
		clearUser(state){
			state.profile = {...initialState}
		},
		setActiveTimetable(state, timetable_id){
			state.profile.active_timetable_id = timetable_id
		},
		setModuleIds(state, module_ids){
			state.profile.module_ids = module_ids
		},
		setTimetableAliases(state, timetable_aliases){
			state.profile.timetable_aliases = timetable_aliases
		},
		setError(state, error){
			state.error = error
		},
		clearError(state){
			state.error = null
		},
		startLoading(state){
			state.loading = true
		},
		stopLoading(state){
			state.loading = false
		},
	},

	  
	actions: {
		fetchUser: async ({commit}, id) => {
			commit('clearError')
			commit('startLoading')
			const token = '1234'
			try{
				const response = await makeGqlSecureRequest(token)(UserGQL.GET_USER, {id})
				const user = response.data.data.user
				if(user)
					commit('updateUser', user)
				else{
					commit('clearUser')
					commit('setError', "Invalid user id.")
				}
			}catch(err){
				commit('setError', err)
				console.log('error =>',err)
			}
			commit('stopLoading')
		}
	}
}