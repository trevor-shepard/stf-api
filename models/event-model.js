const DataModel = require('./data-model');
const {NotFoundError, InsufficentDataError} = require('../utils/errors');

module.exports = class EventModel extends DataModel {
	constructor(admin) {
		super(admin, 'event');
	}

	async create(data) {
		try {
			const {user, season, action, date} = data;

			const payload = {
                user, 
                season, 
                action, 
                date
			};

			const id = this.createObject(payload);

			return {
				...payload,
				id
			};
		} catch (error) {
			console.log('Get Model Level Event Error', error);
		}
	}

	async get(id) {
		try {
			if (!id) {
				throw new InsufficentDataError('missing id');
			}

			const season = await this.getRaw(id);

			if (!season) {
				throw new NotFoundError('Event not found');
			}

			return season;
		} catch (error) {
			console.log('Get Model Level Event Error', error);
			throw error;
		}
	}

	async update(id, update) {
		try {
			if (!update || !id) {
				throw new InsufficentDataError('insufficent data for user update');
			}

			this.validateID(id);

			await this.updateWithID(update, id);
		} catch (error) {
			console.log('Update Model Level User Error', error);

			throw error;
		}
	}

	// Private methods

	validateCreateData(data) {
		const {user, season, action, date} = data;
        this.validateID(user)
        this.validateID(season)
        this.validateString(action)
        this.validateDate(date)
	}
};
