const DataModel = require('./data-model')
const {NotFoundError, InsufficentDataError} = require('../utils/errors');

module.exports = class SeasonModel extends DataModel {
    constructor(admin) {
        super(admin, 'groups');
    }

    async create(data) {
        try {
            this.validateData(data)
            const {name, users, activities} = data

            const payload = {
                name,
                users,
                activities,
                phase: 0,
                users: {id}
            }

            const id = this.createObject(payload)

            return {
                ...payload,
                id
            }

        } catch (error) {
            console.log('Get Model Level Group Error', error);
        }
        
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



    // private methods

    validateData(data) {
        const {name, users, values, votes} = data
        
        this.validateString(name)
        this.validateMapObject(users)
        this.validateMapObject(values)
        this.validateMapObject(votes)
    }
    

}