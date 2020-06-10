const UserModel = require('../models/user-model');
const SeasonModel = require('../models/season-model');
const {InsufficentDataError} = require('../utils/errors');

module.exports = class UserController {
  constructor(admin) {
    console.log('controller constructor');
    this.model = new UserModel(admin);
    this.seasonModel = new SeasonModel(admin)
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
        email,
        seasons: {}
      };
    } catch (error) {
      console.log('user controller level create error', error);

      throw error;
    }
  }


  async getSeasons(uid) {
    try {
      const user = await this.model.get(uid);
      const seasons = {}
      for (let id of Object.keys(user.seasons)) { 
        seasons[id] = await this.seasonModel.get(id)
      }

      return seasons
    } catch (error) {
      console.log('user controller level get seasons error', error);

      throw error;
    }
  }
};
