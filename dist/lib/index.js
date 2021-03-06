'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createModel = require('./create-model');

var _createModel2 = _interopRequireDefault(_createModel);

var _getModel = require('./get-model');

var _getModel2 = _interopRequireDefault(_getModel);

var _createFile = require('./create-file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var outputTypes = {
  // Generates the Json output
  json: function json(_ref) {
    var fileName = _ref.fileName,
        data = _ref.data;

    var stringifiedData = JSON.stringify(data, null, '\t');
    (0, _createFile.createFile)(fileName, stringifiedData);
  },
  // Returns an object
  object: function object(_ref2) {
    var data = _ref2.data;
    return data;
  }
};

exports.default = function (_ref3) {
  var amountArg = _ref3.amountArg,
      _ref3$fileName = _ref3.fileName,
      fileName = _ref3$fileName === undefined ? new Date().toISOString() + '.json' : _ref3$fileName,
      modelArg = _ref3.modelArg,
      inputType = _ref3.inputType,
      outputType = _ref3.outputType;

  // Gets the model
  var model = (0, _getModel2.default)({ model: modelArg, inputType: inputType });

  // Creates the model
  var _model$amount = model.amount,
      amount = _model$amount === undefined ? amountArg : _model$amount;

  var data = (0, _createModel2.default)({ model: model, amount: amount });

  // Returns the generated data
  return outputTypes[outputType]({ fileName: fileName, data: data });
};