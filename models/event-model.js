const DataModel = require('./data-model');
const {NotFoundError, InsufficentDataError} = require('../utils/errors');

module.exports = class EventModel extends DataModel {
  constructor(admin) {
    super(admin, 'events');
  }

  async create(data) {
    try {
      const {user, activity} = data;

      const payload = {
        activity,
        user
      };

      const id = await this.createObject(payload);
      console.log('id', id);
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

      await this.updateRaw(update, id);
    } catch (error) {
      console.log('Update Model Level User Error', error);

      throw error;
    }
  }

  async getUserEvents(uid, seasonStart) {
    try {
      const result = await this.collection
        .where('user', '==', uid)
        .where('createdate', '>', seasonStart)
        .get()
        .then((querySnapshot) => {
          const values = [];
          querySnapshot.forEach((doc) => {
            values.push(doc.data());
          });

          return values;
        });
      return result;
    } catch (error) {
      console.log('Query User Events Model Level Error', error);
      throw error;
    }
  }
};
