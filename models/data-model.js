const {NotFoundError, InvalidDataError} = require('../utils/errors');

module.exports = class DataModel {
  constructor(admin, collection) {
    console.log('data model');
    this.collection = admin.firestore().collection(collection);
    this.collectionName = collection;
  }
  // Private Methods

  async deleteDoc(id) {
    try {
      await this.collection.doc(id).delete();
    } catch (error) {
      console.log('delete error', error);
      throw error;
    }
  }

  async createObject(data) {
    const ref = this.collection.doc();

    const id = ref.id;

    await ref.set({
      ...data,
      id,
      createdate: new Date()
    });

    return id;
  }

  async getRaw(id) {
    try {
      console.log(`start ${this.collectionName} get with id ${id}`);

      const data = await this.collection
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('get success');

            return doc.data();
          }

          throw new NotFoundError(`${this.collectionName} get failed`);
        });

      console.log(`end ${this.collectionName} get with id ${id}`);

      return data;
    } catch (error) {
      console.log('get with ID error', error);
      throw error;
    }
  }

  async queryCollection(field, value) {
    try {
      const result = await this.collection
        .where(field, '==', value)
        .get()
        .then((querySnapshot) => {
          const values = [];
          querySnapshot.forEach((doc) => {
            values.push(doc.data());
          });

          return values;
        });
      console.log(
        `ran query of ${this.collectionName} where ${field} is equal to ${value} with result`,
        result
      );

      return result;
    } catch (error) {
      console.log('Query Data Model Level Error', error);
      throw error;
    }
  }

  async updateRaw(update, id) {
    await this.collection.doc(id).update(update);
  }

  async createObjectWithID(object) {
    await this.collection.doc(object.id).set(object);
  }

  // Validation methods

  validateNoSpecialChars(string) {
    return !/[~`!#$%^&*+=\-[\]\\';,/{}|":<>?]/g.test(string);
  }

  validateID(id) {
    this.validateString(id, 'id');
    if (!this.validateNoSpecialChars(id)) {
      throw new InvalidDataError('id has invalid-characters');
    }

    if (!(id.length === 20 || id.length === 28)) {
      throw new InvalidDataError('id must be between 20-28 characters long');
    }

    return true;
  }

  validatePassword(password) {
    if (typeof password !== 'string') {
      throw new InvalidDataError('Password is not a String');
    }

    if (password.length < 6) {
      throw new InvalidDataError(
        'Password must be 6 characters long or greater'
      );
    }

    return true;
  }

  validateString(data, dataName) {
    if (typeof data !== 'string') {
      throw new InvalidDataError(`${dataName} is not a String`);
    }

    return true;
  }

  validateNumber(data, dataName) {
    if (typeof data !== 'number') {
      throw new InvalidDataError(`${dataName} is not a Number`);
    }

    return true;
  }

  validateArray(data, dataName) {
    if (Object.prototype.toString.call(data) !== '[object Array]') {
      throw new InvalidDataError(`${dataName} is not an Array`);
    }

    return true;
  }

  validateDate(data, dataName) {
    if (Object.prototype.toString.call(data) === '[object Date]') {
      return true;
    }

    if (typeof data !== 'string') {
      throw new InvalidDataError(`${dataName} is not a String or Date`);
    }

    const epochNumber = Number.parseInt(data, 10);

    if (!epochNumber) {
      throw new InvalidDataError(`${dataName} is invalid- NaN`);
    }

    const date = new Date(epochNumber);

    if (!date) {
      throw new InvalidDataError(`${dataName} is invalid- date`);
    }

    return true;
  }

  validateEmail(email) {
    if (typeof email !== 'string') {
      throw new InvalidDataError('email is not a String');
    }

    const re = /\S+@\S+\.\S+/;

    if (!re.test(email)) {
      throw new InvalidDataError('$email is invalid');
    }

    return true;
  }

  validateMapObject(data, dataName) {
    if (Object.prototype.toString.call(data) !== '[object Object]') {
      throw new InvalidDataError(`${dataName} is not a valid Map`);
    }

    return true;
  }

  validateBoolean(data, dataName) {
    if (Object.prototype.toString.call(data) !== '[object Boolean]') {
      throw new InvalidDataError(`${dataName} is not a Boolean value`);
    }
  }

  validateEnum(acceptedValues, unvalidatedValue) {
    if (acceptedValues) {
      const acceptedValuesDisplay = acceptedValues.toString();
      if (!acceptedValues.includes(unvalidatedValue)) {
        throw new InvalidDataError(
          `${unvalidatedValue} is an invalid vaule. Acceptable values include ${acceptedValuesDisplay}`
        );
      }
    } else {
      throw new Error(
        'Improper use of validate enum function. Accepted values must be defined'
      );
    }
  }
};
