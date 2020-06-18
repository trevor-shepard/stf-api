const UserModel = require('../models/user-model');
const SeasonModel = require('../models/season-model');
const EventModel = require('../models/event-model');
const {InsufficentDataError} = require('../utils/errors');

module.exports = class SeasonController {
  constructor(admin) {
    this.model = new SeasonModel(admin);
    this.userModel = new UserModel(admin);
    this.eventModel = new EventModel(admin);
  }

  async get(seasonID) {
    try {
      const season = await this.model.get(seasonID);
      return season;
    } catch (error) {
      console.log('controller level season get error', error);
      throw error;
    }
  }

  async create(data, uid) {
    try {
      console.log('data', data);
      console.log('uid', uid);

      const user = await this.userModel.get(uid);

      const season = await this.model.create({
        ...data,
        users: {
          [uid]: user.username
        }
      });

      await this.userModel.update(uid, {
        seasons: {
          ...user.seasons,
          [season.id]: season.name
        }
      });

      return season;
    } catch (error) {
      console.log('controller level season create error', error);
      throw error;
    }
  }

  async join(uid, seasonID) {
    try {
      if ([uid, seasonID].includes(undefined)) {
        throw new InsufficentDataError('missing id');
      }

      const user = await this.userModel.get(uid);
      const season = await this.model.get(seasonID);

      await this.userModel.update(uid, {
        seasons: {...user.seasons, [season.id]: season.name}
      });
      await this.model.update(seasonID, {
        users: {...season.users, [user.id]: user.username}
      });

      return {
        ...season,
        users: {...season.users, [user.id]: user.username}
      };
    } catch (error) {
      console.log('controller level season join error', error);
      throw error;
    }
  }

  async vote(seasonID, uid, activity, value) {
    try {
      const parsedValue = Number.parseInt(value, 10);
      if ([activity, parsedValue, uid, seasonID].includes(undefined)) {
        throw new InsufficentDataError('missing data');
      }

      const season = await this.model.get(seasonID);
      const {votes} = season;
      const activities = Object.keys(votes);

      if (activities.includes(activity)) {
        console.log('votes before spread', votes);
        votes[activity] = {...votes[activity], [uid]: parsedValue};
        console.log('votes after spread', votes);
      } else {
        console.log('activity not in activity list', votes);
        votes[activity] = {[uid]: parsedValue};
      }

      await this.model.update(seasonID, {
        votes
      });

      return {
        ...season,
        votes
      };
    } catch (error) {
      console.log('controller level season vote error', error);
      throw error;
    }
  }

  validateVote(seasonID, activity, uid, value) {
    try {
      this.model.validateID(seasonID);
      this.model.validateString(activity);
      this.model.validateID(uid);
      this.model.validateNumber(value);
    } catch (error) {
      console.log('controller level season vote validation error', error);
      throw error;
    }
  }

  async begin(seasonID) {
    try {
      // Can put in logic to only include elements that have some precentage of votes
      const season = await this.model.get(seasonID);

      const proposedActivites = Object.entries(season.votes);
      console.log('proposed activities', proposedActivites);
      const seasonActivites = proposedActivites.reduce(
        (acc, proposedActvity) => {
          const [activityName, votes] = proposedActvity;
          const value = Object.values(votes).reduce(
            (total, value_) => total + value_
          );
          return {...acc, [activityName]: value};
        },
        {}
      );
      console.log('season activities', seasonActivites);
      await this.model.update(seasonID, {
        phase: 2,
        activities: seasonActivites
      });
      console.log('season updated');
      for (const userID of Object.keys(season.users)) {
        const user = await this.userModel.get(userID);
        const userActivities = user.activities;
        for (const activityName of Object.keys(seasonActivites)) {
          if (Object.keys(userActivities).includes(activityName)) {
            userActivities[activityName] = [
              ...userActivities[activityName],
              seasonID
            ];
          } else {
            userActivities[activityName] = [seasonID];
          }
        }

        await this.userModel.update(userID, {activities: userActivities});
        console.log(`${userID} updated`);
      }

      return await this.model.get(seasonID);
    } catch (error) {
      console.log('controller level season begin error', error);
      throw error;
    }
  }

  async getEvents(seasonID) {
    try {
      const season = await this.model.get(seasonID);
      const userIDs = Object.keys(season.users);
      const userEvents = {};
      for (const userID of userIDs) {
        const events = await this.eventModel.getUserEvents(
          userID,
          season.seasonStart
        );
        userEvents[userID] = events;
      }

      return userEvents;
    } catch (error) {
      console.log('controller level season get events error', error);
      throw error;
    }
  }
};
