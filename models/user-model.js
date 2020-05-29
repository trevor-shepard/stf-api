const DataModel = require('./data-model');

const {NotFoundError, InsufficentDataError, AuthError} = require('../utils/errors');

module.exports = class UserModel extends DataModel {
	constructor(admin) {
		super(admin, 'users');
		this.auth = admin.auth();
	}

	async get(uid) {
		try {
			if (!uid) {
				throw new InsufficentDataError('no user id');
			}

			const user = await this.getRaw(uid);

			if (!user) {
				throw new NotFoundError('User not found');
			}

			return user;
		} catch (error) {
			console.log('Get Model Level User Error', error);

			throw error;
		}
	}

	async update(update, uid) {
		try {
			if (!update || !uid) {
				throw new InsufficentDataError('insufficent data for user update');
			}

			this.validateID(uid);

			await this.updateWithID(update, uid);
		} catch (error) {
			console.log('Update Model Level User Error', error);

			throw error;
		}
	}

	async createAuthObject(email, password) {
		console.log('create auth object');
		try {
			this.validatePassword(password);

			this.validateEmail(email);

			const response = await this.auth.createUser({
				email,
				password
			}).catch(error => {
				throw new AuthError(error.message);
			});

			console.log('auth object create finish with response:', response);
			return response.uid;
		} catch (error) {
			console.log('model level error', error);

			throw error;
		}
	}

	async createUserWithId(profile, uid) {
		try {
			await this.collection.doc(uid).set({
				...profile,
				id: uid,
				groups: {}
			});

			console.log('finish create user profile');

			return true;
		} catch (error) {
			console.log('Create with id', error);

			throw error;
		}
	}

	validateProfile(profile) {
		const {username, email} = profile;
		this.validateEmail(email);

		this.validateString(username);
	}

	async createToken(uid) {
		return this.admin.auth().createCustomToken(uid);
	}
};

