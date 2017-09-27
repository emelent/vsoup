<template>
	<div>
		<h4>EVENTS</h4>
		<div>
			<span v-if="isWaiting">Updating...</span>
			<span v-else>Count: {{count}}</span>
		</div>
		<button @click="incrementAsync">Increment</button><br/><br/>
		<input type="number" v-model="localCounter">
		<button @click="incBy(localCount)">Increment By {{localCount}}</button>
	</div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
	props: [
		'modules'
	],
	computed: {
		localCount: function(){
			return parseInt(this.localCounter)
		},
		...mapGetters([
			'count',
			'isWaiting'
		])
	},
	methods:{
		...mapMutations([
			'incrementBy',
			'increment'
		]),
		...mapActions([
			'incrementAsync',
			'incrementByAsync'
		]),
		incBy(amount){
			this.incrementByAsync(amount)
			this.localCounter = 0
		}
	},
	data() {
		return {
			localCounter: 0
		}
	}
}
</script>