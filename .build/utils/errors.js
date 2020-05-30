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
module.exports.NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'NotFoundError';
        return _this;
    }
    return NotFoundError;
}(Error));
module.exports.InsufficentDataError = /** @class */ (function (_super) {
    __extends(InsufficentDataError, _super);
    function InsufficentDataError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'InsufficentDataError';
        return _this;
    }
    return InsufficentDataError;
}(Error));
module.exports.InvalidDataError = /** @class */ (function (_super) {
    __extends(InvalidDataError, _super);
    function InvalidDataError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'InvalidDataError';
        return _this;
    }
    return InvalidDataError;
}(Error));
module.exports.AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'AuthError';
        return _this;
    }
    return AuthError;
}(Error));
//# sourceMappingURL=errors.js.map