const DataModel = require('./data-model')
const {NotFoundError, InsufficentDataError} = require('../utils/errors');

module.exports = class UserModel extends DataModel {
    constructor(admin) {
        super(admin, 'groups');
    }

    async get(id) {
        try {
            if (!id) throw InsufficentDataError('missing id')

            const group = await this.getRaw(id)

            if (!user) throw NotFoundError('group not found')

            return group
        } catch (error) {
            console.log('Get Model Level Group Error', error);
            throw error
        }
    }

    async update(update, id) {
		try {
			if (!update || !id) throw new InsufficentDataError('insufficent data for user update');
			
			this.validateID(id);

			await this.updateWithID(update, uid);
		} catch (error) {
			console.log('Update Model Level User Error', error);

			throw error;
		}
    }
    

}