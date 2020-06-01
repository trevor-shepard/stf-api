const UserModel = require('../models/user-model');
const SeasonModel = require('../models/season-model');
const EventModel = require('../models/event-model');
const {InvalidDataError, NotFoundError} = require('../utils/errors');

module.exports = class EventController {
	constructor(admin) {
		this.model = new EventModel(admin);
		this.userModel = new UserModel(admin);
		this.seasonModel = new SeasonModel(admin);
	}

	async get(id) {
		try {
			const event = await this.model.get(id);
			return event;
		} catch (error) {
			console.log('controller level event get error', error);
			throw error;
		}
	}

	async create(data, uid) {
		try {
			const { season, activity, date } = data

			this.model.validateCreateData({
				season,
				activity,
				date,
				user: uid
			})

			const _season = this.seasonModel.get(season)

			if (!_season) throw new NotFoundError("sesons cannot be found for that id")

			if (!Object.keys(_season.activities).includes(activity)) new InvalidDataError("that activity is not valid for this season")
			
			const event = this.model.create({
				...data,
				user: uid
			});

			return event;
		} catch (error) {
			console.log('controller level event create error', error);
			throw error;
		}
	}

	
};