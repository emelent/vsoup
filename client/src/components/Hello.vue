<template>
  <div class="customers">
	  <div class="f1 w-50" v-show="loading > 0">LOADING...</div>
	  <div class="fl w-50 bg-light-purple pa2">Nothing bub</div>
	  <div>{{hello}}</div>
	  <div class="customers__customer" 
		v-for="customer in customers"
	  >
		  {{customer.name}}
	  </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const ALL_CUSTOMERS_QUERY = gql`
  query AllCustomersQuery {
    customers {
		name
    }
  }
`
export default {
	name: 'customers',
	apollo: {
		customers: {
			query: ALL_CUSTOMERS_QUERY,
			loadingKey:  'loading'
		},
		hello: gql`{hello}`
	},

	data () {
		return {
			loading: 0,
			hello: 'waiting',
			customers: [
				{name: 'Marshal'},
				{name: 'Lilly'},
				{name: 'Barney'},
			]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.customers{
		background-color: #eee;

		&__customer{
			font-size: 1.2em;
		}
	}
</style>
