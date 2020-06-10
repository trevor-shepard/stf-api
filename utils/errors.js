module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
};

module.exports.InsufficentDataError = class InsufficentDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InsufficentDataError';
  }
};

module.exports.InvalidDataError = class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDataError';
  }
};

module.exports.AuthError = class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
};
