var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var DataModel = require('./data-model');
var _a = require('../utils/errors'), NotFoundError = _a.NotFoundError, InsufficentDataError = _a.InsufficentDataError, AuthError = _a.AuthError;
module.exports = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel(admin) {
        var _this = _super.call(this, admin, 'users') || this;
        _this.auth = admin.auth();
        return _this;
    }
    UserModel.prototype.get = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!uid) {
                            throw new InsufficentDataError('no user id');
                        }
                        return [4 /*yield*/, this.getRaw(uid)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new NotFoundError('User not found');
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_1 = _a.sent();
                        console.log('Get Model Level User Error', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.update = function (update, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!update || !uid) {
                            throw new InsufficentDataError('insufficent data for user update');
                        }
                        this.validateID(uid);
                        return [4 /*yield*/, this.updateWithID(update, uid)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log('Update Model Level User Error', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.createAuthObject = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('create auth object');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.validatePassword(password);
                        this.validateEmail(email);
                        return [4 /*yield*/, this.auth.createUser({
                                email: email,
                                password: password
                            }).catch(function (error) {
                                throw new AuthError(error.message);
                            })];
                    case 2:
                        response = _a.sent();
                        console.log('auth object create finish with response:', response);
                        return [2 /*return*/, response.uid];
                    case 3:
                        error_3 = _a.sent();
                        console.log('model level error', error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.createUserWithId = function (profile, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.doc(uid).set(__assign(__assign({}, profile), { id: uid, groups: {} }))];
                    case 1:
                        _a.sent();
                        console.log('finish create user profile');
                        return [2 /*return*/, true];
                    case 2:
                        error_4 = _a.sent();
                        console.log('Create with id', error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.validateProfile = function (profile) {
        var username = profile.username, email = profile.email;
        this.validateEmail(email);
        this.validateString(username);
    };
    UserModel.prototype.createToken = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.admin.auth().createCustomToken(uid)];
            });
        });
    };
    return UserModel;
}(DataModel));
//# sourceMappingURL=user-model.js.map