'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMany = exports.createSingle = undefined;

var _parseModel = require('./parse-model');

var _parseModel2 = _interopRequireDefault(_parseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSingle = exports.createSingle = function createSingle(model) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({}, (0, _parseModel2.default)(model, options));
};

var createMany = exports.createMany = function createMany(model, _ref) {
  var amount = _ref.amount;

  return Array.from({ length: amount }).map(function (el, index) {
    return createSingle(model, { amount: amount, index: index });
  });
};

exports.default = function (_ref2) {
  var model = _ref2.model,
      amount = _ref2.amount;

  // Generate a single instance or a list
  return amount === 1 ? createSingle(model, { amount: 1, index: 0 }) : createMany(model, { amount: amount });
};