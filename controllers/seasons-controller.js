const UserModel = require('../models/user-model');
const SeasonModel = require('../models/season-model');
const EventModel = require('../models/event-model');
const {InsufficentDataError} = require('../utils/errors');

module.exports = class SeasonController {
	constructor(admin) {
		this.model = new SeasonModel(admin);
		this.userModel = new UserModel(admin);
		this.EventModel = new SeasonModel(admin);
	}

	async get(id) {
		try {
			const season = await this.model.get(id);
			return season;
		} catch (error) {
			console.log('controller level season get error', error);
			throw error;
		}
	}

	async create(data, uid) {
		try {
			const user = this.userModel.get(uid);
			const season = this.model.create({
				...data,
				users: {
					[uid]: user.username
				}
			});

			await this.userModel.update(season.id, {
				seasons: {
					...user.seasons,
					[season.id]: season.name
				}
			});

			return season;
		} catch (error) {
			console.log('controller level season create error', error);
			throw error;
		}
	}

	async join(uid, seasonID) {
		try {
			if ([uid, seasonID].includes(undefined)) {
				throw new InsufficentDataError('missing id');
			}

			const user = this.userModel.get(uid);
			const season = this.model.get(seasonID);

			await this.userModel.update(uid, {seasons: {[season.id]: season.name}});
			await this.model.update(seasonID, {users: {...season.users, [user.id]: user.username}});
		} catch (error) {
			console.log('controller level season join error', error);
			throw error;
		}
	}

	async vote(seasonID, activity, uid, value) {
		try {
			const parsedValue = Number.parseInt(value, 10);
			if ([activity, parsedValue, uid, seasonID].includes(undefined)) {
				throw new InsufficentDataError('missing id');
			}

			const season = this.model.get(seasonID);

			const update = JSON.parse(JSON.stringify(season.activities));

			const activities = Object.keys(season.activities);
			if (activities[activity]) {
				update[activity] = {...update[activity], [uid]: parsedValue};
			} else {
				update[activity] = {[uid]: parsedValue};
			}

			await this.model.update(seasonID, {
				activities: update
			});
		} catch (error) {
			console.log('controller level season vote error', error);
			throw error;
		}
	}

	validateVote(seasonID, activity, uid, value) {
		try {
			this.model.validateID(seasonID);
			this.model.validateString(activity);
			this.model.validateID(uid);
			this.model.validateNumber(value);
		} catch (error) {
			console.log('controller level season vote validation error', error);
			throw error;
		}
	}

	async begin(seasonID) {
		try {
			await this.model.update(seasonID, {
				phase: 1
			});
		} catch (error) {
			console.log('controller level season begin error', error);
			throw error;
		}
	}


	async getActivities(seasonID) {
		return await this.EventModel.queryCollection("season", seasonID)
	}
};
