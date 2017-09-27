<template>
	<div style="flex: 1;" class="h-100">
		<div class="bg-light-purple pa4" style="text-transform:uppercase">
			TIME
	  	</div>
		<div class="time bg-white" v-for="(time, index) in times" :key="index">
			{{time}}
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			times: [
				'07:00',
				'08:00',
				'09:00',
				'10:00',
				'11:00',
				'12:00',
				'13:00',
				'14:00',
				'15:00',
				'16:00',
				'17:00',
				'18:00',
				'19:00',
				'20:00',
				'21:00',
				'22:00'
			]
		}
	}
}
</script>
<style lang="scss" scoped>
.time{
	padding: 70px 0;
	margin: 1px 0;
}
</style>
