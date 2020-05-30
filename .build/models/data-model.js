var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require('../utils/errors'), NotFoundError = _a.NotFoundError, InvalidDataError = _a.InvalidDataError;
module.exports = /** @class */ (function () {
    function DataModel(admin, collection) {
        console.log('data model');
        this.collection = admin.firestore().collection(collection);
        this.collectionName = collection;
    }
    // Private Methods
    DataModel.prototype.deleteDoc = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.doc(id).delete()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('delete error', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataModel.prototype.createObject = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this.collection.doc();
                        id = ref.id;
                        return [4 /*yield*/, ref.set(__assign(__assign({}, data), { id: id, createdate: new Date() }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    DataModel.prototype.getRaw = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("start " + this.collectionName + " get with id " + id);
                        return [4 /*yield*/, this.collection.doc(id).get().then(function (doc) {
                                if (doc.exists) {
                                    console.log('get success');
                                    return doc.data();
                                }
                                throw new NotFoundError(_this.collectionName + " get failed");
                            })];
                    case 1:
                        data = _a.sent();
                        console.log("end " + this.collectionName + " get with id " + id);
                        return [2 /*return*/, data];
                    case 2:
                        error_2 = _a.sent();
                        console.log('get with ID error', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataModel.prototype.queryCollection = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection
                                .where(field, '==', value)
                                .get()
                                .then(function (querySnapshot) {
                                var values = [];
                                querySnapshot.forEach(function (doc) {
                                    values.push(doc.data());
                                });
                                return values;
                            })];
                    case 1:
                        result = _a.sent();
                        console.log("ran query of " + this.collectionName + " where " + field + " is equal to " + value + " with result", result);
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _a.sent();
                        console.log('Query Data Model Level Error', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataModel.prototype.updateRaw = function (update, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.doc(id).update(update)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataModel.prototype.createObjectWithID = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.doc(object.id).set(object)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Validation methods
    DataModel.prototype.validateNoSpecialChars = function (string) {
        return !/[~`!#$%^&*+=\-[\]\\';,/{}|":<>?]/g.test(string);
    };
    DataModel.prototype.validateID = function (id) {
        this.validateString(id, 'id');
        if (!this.validateNoSpecialChars(id)) {
            throw new InvalidDataError('id has invalid-characters');
        }
        if (!(id.length === 20 || id.length === 28)) {
            throw new InvalidDataError('id must be between 20-28 characters long');
        }
        return true;
    };
    DataModel.prototype.validatePassword = function (password) {
        if (typeof (password) !== 'string') {
            throw new InvalidDataError('Password is not a String');
        }
        if (password.length < 6) {
            throw new InvalidDataError('Password must be 6 characters long or greater');
        }
        return true;
    };
    DataModel.prototype.validateString = function (data, dataName) {
        if (typeof (data) !== 'string') {
            throw new InvalidDataError(dataName + " is not a String");
        }
        return true;
    };
    DataModel.prototype.validateNumber = function (data, dataName) {
        if (typeof (data) !== 'number') {
            throw new InvalidDataError(dataName + " is not a Number");
        }
        return true;
    };
    DataModel.prototype.validateArray = function (data, dataName) {
        if (Object.prototype.toString.call(data) !== '[object Array]') {
            throw new InvalidDataError(dataName + " is not an Array");
        }
        return true;
    };
    DataModel.prototype.validateDate = function (data, dataName) {
        if (Object.prototype.toString.call(data) === '[object Date]') {
            return true;
        }
        if (typeof (data) !== 'string') {
            throw new InvalidDataError(dataName + " is not a String or Date");
        }
        var epochNumber = Number.parseInt(data, 10);
        if (!epochNumber) {
            throw new InvalidDataError(dataName + " is invalid- NaN");
        }
        var date = new Date(epochNumber);
        if (!date) {
            throw new InvalidDataError(dataName + " is invalid- date");
        }
        return true;
    };
    DataModel.prototype.validateEmail = function (email) {
        if (typeof (email) !== 'string') {
            throw new InvalidDataError('email is not a String');
        }
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            throw new InvalidDataError('$email is invalid');
        }
        return true;
    };
    DataModel.prototype.validateMapObject = function (data, dataName) {
        if (Object.prototype.toString.call(data) !== '[object Object]') {
            throw new InvalidDataError(dataName + " is not a valid Map");
        }
        return true;
    };
    DataModel.prototype.validateBoolean = function (data, dataName) {
        if (Object.prototype.toString.call(data) !== '[object Boolean]') {
            throw new InvalidDataError(dataName + " is not a Boolean value");
        }
    };
    DataModel.prototype.validateEnum = function (acceptedValues, unvalidatedValue) {
        if (acceptedValues) {
            var acceptedValuesDisplay = acceptedValues.toString();
            if (!acceptedValues.includes(unvalidatedValue)) {
                throw new InvalidDataError(unvalidatedValue + " is an invalid vaule. Acceptable values include " + acceptedValuesDisplay);
            }
        }
        else {
            throw new Error('Improper use of validate enum function. Accepted values must be defined');
        }
    };
    return DataModel;
}());
//# sourceMappingURL=data-model.js.map