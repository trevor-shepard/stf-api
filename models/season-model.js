const DataModel = require('./data-model');
const {NotFoundError, InsufficentDataError} = require('../utils/errors');

module.exports = class SeasonModel extends DataModel {
	constructor(admin) {
		super(admin, 'groups');
	}

	async create(data) {
		try {
			this.validateData(data);
			const {name, users, activities} = data;

			const payload = {
				name,
				users,
				activities,
				phase: 0
			};

			const id = this.createObject(payload);

			return {
				...payload,
				id
			};
		} catch (error) {
			console.log('Get Model Level Group Error', error);
		}
	}

	async get(id) {
		try {
			if (!id) {
				throw new InsufficentDataError('missing id');
			}

			const season = await this.getRaw(id);

			if (!season) {
				throw new NotFoundError('group not found');
			}

			return season;
		} catch (error) {
			console.log('Get Model Level Group Error', error);
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

	validateData(data) {
		const {name, users, values} = data;

		this.validateString(name);
		this.validateMapObject(users);
		this.validateMapObject(values);
	}
};
