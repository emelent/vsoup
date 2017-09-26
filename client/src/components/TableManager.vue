<template>
	<div class="absolute h-100 w-100 top-0 left-0">
		<div class="ttl-week-view flex flex-row fl w-75 h-100 bg-near-white">
			<timeline />
			<day-view v-for="(dayEvents, day, index)  in events" :key="index"
				:day="day" :events="dayEvents"
			/>
		</div>
		<event-side-bar/>
	</div>
</template>
<script>
import DayView from './DayView.vue'
import EventSideBar from './EventSideBar.vue'
import Timeline from './Timeline.vue'

export default {
	components: {
		Timeline,
		DayView,
		EventSideBar
	},
	data() {
		return {
			events:{
				monday: [
					{_id: 1, venue: 'IT 4-1', module: 'COS 132', start: '11:20', end: '12:30', name: 'L1'},
					{_id: 1, venue: 'Blue 3', module: 'COS 132', start: '14:20', end: '17:30', name: 'P1'},
				],
				tuesday: [],
				wednesday: [],
				thursday: [],
				friday: [],
			}
		}
	}
}
</script>
<style scoped lang="scss">
	.ttl-mgr{
	}
	.ttl-week-view{

		&__day{

		}
	}
</style>