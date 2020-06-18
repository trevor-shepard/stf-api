const UserModel = require('../models/user-model');
const SeasonModel = require('../models/season-model');
const EventModel = require('../models/event-model');
const {InvalidDataError, NotFoundError} = require('../utils/errors');

module.exports = class EventController {
  constructor(admin) {
    this.model = new EventModel(admin);
    this.userModel = new UserModel(admin);
    this.seasonModel = new SeasonModel(admin);
  }

  async get(id) {
    try {
      const event = await this.model.get(id);
      return event;
    } catch (error) {
      console.log('controller level event get error', error);
      throw error;
    }
  }

  async create(data, uid) {
    try {
      const {activity} = data;
      console.log('activity - uid', activity, uid);
      const event = await this.model.create({
        activity,
        user: uid
      });

      console.log('event', event);
      return event;
    } catch (error) {
      console.log('controller level event create error', error);
      throw error;
    }
  }
};
