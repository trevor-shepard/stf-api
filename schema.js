import {Timestamp} from '@google-cloud/firestore';

const Schema = {
	users: {
		email: String,
		username: String,
		id: String,
		groups: {id}
	},
	season: {
		name: string,
		phase: Number,
		id: string,
		users: {id},
		activites: {
			'name-of-activities': {
				userID: [points]
			}
		}
	},

	'activity-event': {
		id: string,
		user: id,
		season: id,
		action: string,
		date: Timestamp
	}
};

Questions = {
	1: 'How should a season start, when creator decides, when all votes are in, when % of votes for % of slots are taken'
};
