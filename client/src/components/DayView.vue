<template>
  <div class="day h-100">
	  <h3 style="text-transform:capitalize">{{day}}</h3>
	  <div class="event" v-for="event in events"  :key="event._id">
		  {{event.venue}}
	  </div>
  </div>
</template>
<script>

export default {
	props: [
		'day',
		'events'
	],
	data() {
		return {
		}
	}
}
</script>
<style lang="scss" scoped>
.day{
	flex: 1;
}
</style>
