const DataModel = require('./data-model');
const {NotFoundError, InsufficentDataError} = require('../utils/errors');

module.exports = class SeasonModel extends DataModel {
  constructor(admin) {
    super(admin, 'seasons');
  }

  async create(data) {
    try {
      // This.validateCreateData(data);
      const {name, users, voteStart, seasonStart} = data;

      const payload = {
        name,
        users,
        activities: {},
        phase: 0,
        voteStart: new Date(voteStart),
        seasonStart: new Date(seasonStart),
        votes: {}
      };

      const id = await this.createObject(payload);

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

      await this.updateRaw(update, id);
    } catch (error) {
      console.log('Update Model Level User Error', error);

      throw error;
    }
  }

  // Private methods

  validateCreateData(data) {
    const {name} = data;
    this.validateString(name);
  }
};
