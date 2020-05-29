const UserModel = require('../models/user-model');
const {InsufficentDataError} = require('../utils/errors');

module.exports = class UserController {
	constructor(admin) {
		console.log('controller constructor');
		this.model = new UserModel(admin);
	}

	async get(id) {
		try {
			const user = await this.model.get(id);

			return user;
		} catch (error) {
			console.log('controller level user get error', error);
			throw error;
		}
	}

	async create(profile, password) {
		console.log('user controller');
		try {
			const {username, email} = profile;
			if (!username || !email) {
				throw new InsufficentDataError('Insufficent Data');
			}

			this.model.validateProfile(profile);

			const uid = await this.model.createAuthObject(email, password);

			console.log('uid', uid);

			await this.model.createUserWithId(profile, uid);

			return {
				id: uid,
				username,
				email
			};
		} catch (error) {
			console.log('controller level error', error);

			throw error;
		}
	}
};
