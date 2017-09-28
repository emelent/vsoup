import gql from 'graphql-tag'

export default {
	GET_USER: `
		query getUser($id: ID!) {
			user(_id: $id) {
				_id
				name
				student_id
				modules
				timetables
				timetable_aliases {
					timetable_id
					alias
				}
			}
		}	  
	`,

	UPDATE_USER: `
		mutation updateUser($id: ID!, $group: String, $name: String, $modules: [ID], $timetables: [ID]) {
			updateUser(_id: $id, group: $group, name: $name, modules: $modules, timetables: $timetables) {
			_id
			student_id
			modules
			timetables
			timetable_aliases {
				timetable_id
				alias
			}
			}
		}  
	`
}