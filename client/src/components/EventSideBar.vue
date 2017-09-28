<template>
	<div>
		<h4>EVENTS</h4>
		<div>{{name}}</div>
		<div>
			<span v-if="isWaiting">Updating...</span>
			<span v-else>Count: {{count}}</span>
		</div>
		<button @click="incrementAsync">Increment</button><br/><br/>
		<input type="number" v-model="localCounter">
		<button @click="incBy(localCount)">Increment By {{localCount}}</button>
		<br/><br/>
		<button @click="fetchUser(id)">fetch</button>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import gql from 'graphql-tag'

export default {
	props: [
	],
	computed: {
		localCount(){
			return parseInt(this.localCounter)
		},
		...mapGetters([
			'count',
			'isWaiting'
		]),
		...mapGetters('user', {
			name: 'getName'
		})
	},
	created(){
		window.apollo = this.$apollo
		window.data = this.$data

	},
	methods:{
		...mapActions([
			'incrementAsync',
			'incrementByAsync'
		]),
		...mapActions('user', [
			'fetchUser'
		]),
		incBy(amount){
			this.incrementByAsync(amount)
			this.localCounter = 0
		}
	},
	apollo: {
		modules: {
			query: gql`
				query getModules{
					modules{
						_id
						name
						code
						period
						lessons
					}
				}
			`
		}
	},
	data() {
		return {
			localCounter: 0,
			modules: [],
			loading: 0,
			id: '59cbecc6e52d57d84d4e33a7'
		}
	}
}
</script>