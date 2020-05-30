const UserModel = require('../models/user-model');
const SeasonModel = require('../models/season-model');
const {InsufficentDataError} = require('../utils/errors');

module.exports = class SeasonController {
    constructor(admin) {
        this.model = new SeasonModel(admin)
        this.userModel = new UserModel(admin)
    }

    async get(id) {
        try {
            const season = await this.model.get(id)
        } catch (error) {
			console.log('controller level season get error', error);
            throw error
        }
    }

    async create(data, uid) {
        try {
            const user = this.userModel.get(uid)
            const season = this.model.create({
                ...data,
                users: {
                    [uid]: user.username
                }
            })

            await this.userModel.update(season.id, {
                seasons: {
                    ...user.seasons
                    [season.id]: season.name
                }
            })

            return season
        } catch (error) {
			console.log('controller level season create error', error);
            throw error
        }
    }


    async join(uid, seasonID) {
        try {
            const user = this.userModel.get(uid)
            const season = this.model.get(seasonID)

            await this.userModel.update(uid, { seasons: { [season.id]: season.name }})
            await this.model.update(seasonID, { users: {...season.users, [user.id]: user.username}})
        } catch(error) {
            console.log('controller level season join error', error);
            throw error
        }
    }

    async vote(seasonID, activity, uid, value) {
        try {
            const season = this.model.get(seasonID)

            const update = JSON.parse(JSON.stringify(season.activities));
            
            const activities = Object.keys(season.activities)
            if (activities[activity]) {
                update[activity] = { ...update[activity], [uid]: value}
            } else {
                update[activity] = { [uid]: value } 

            }

            await this.model.update(seasonID, {
                activities: update
            })
        } catch (error) {
            console.log('controller level season vote error', error);
            throw error
        }
    }

}