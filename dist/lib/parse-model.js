'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepend = exports.append = exports.parseString = exports.parseModel = exports.parseLiteral = exports.parseArray = undefined;

var _faker2 = require('faker');

var _faker3 = _interopRequireDefault(_faker2);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function configureFaker(config) {
  var _config$locale = config.locale,
      locale = _config$locale === undefined ? 'en' : _config$locale;

  _faker3.default.locale = locale;
}

/**
 * parseModel - Iterates over named keys of an object while recursively parses
 * the given node, until every leaf is parsed. Starts parsing parents, then
 * that parent's children until it ends.
 * -> An Object model type is considered a Node.
 * -> A model type different than Object is considered a Leaf.
 *
 * @param  {Object} model an object with domain-specific keys
 * @return {Object}
 */
function parseModel(model, options) {
  // FIXME
  // if model.type is not an Object or Array...
  if (model.type && typeof model.type === "string") {
    var type = model.type,
        value = model.value,
        _model$options = model.options,
        currentModelOptions = _model$options === undefined ? {} : _model$options;

    var updatedOptions = Object.assign({}, options, currentModelOptions);
    return modelAttributeTypes[type](value, updatedOptions);
  }
  var modelKeys = Object.keys(model);
  return modelKeys.reduce(function (accumulator, currentValue) {
    var _model$currentValue = model[currentValue],
        type = _model$currentValue.type,
        value = _model$currentValue.value,
        _model$currentValue$o = _model$currentValue.options,
        currentModelOptions = _model$currentValue$o === undefined ? {} : _model$currentValue$o;

    // Propagates initial options

    var updatedOptions = Object.assign({}, options, currentModelOptions);
    var _value = modelAttributeTypes[type](value, updatedOptions);

    // asignates currentValue, which is the current scanned attribute of the
    // model, starting from parents to children
    return Object.assign(accumulator, _defineProperty({}, currentValue, _value));
  }, {});
}

/**
 * parseArray - Takes a model, options, and size. If the size is an Array (ex. [1, 20])
 * it will use the randomBetween method from numbers to get a random number between
 * the first and second index.
 * If size is a simple number, it just uses that.
 * -> parseModel can be either a Node or a Leaf.
 *
 * @param  {Object} model   A model Node
 * @param  {Object} options [size: Number]
 * @return {Array} A parsed model
 */
function parseArray(model, options) {
  var size = options.size;
  if (Array.isArray(size)) {
    size = _helpers.numbers.randomBetween(size);
  }
  return [].concat(_toConsumableArray(Array(size).keys())).map(function () {
    return parseModel(model.value, options);
  });
}

/**
 * parseLiteral - For those times when you simply need a literal value
 *
 * @param  {Any} model A model Node
 * @return {Any} Any given value
 */
function parseLiteral(model) {
  return model;
}

/**
 * parseString - For those times when you simply need a string value
 *
 * @param  {Any} model A model Node
 * @return {Any} Any given value
 */
function parseString(model) {
  console.warn('\x1b[33m%s\x1b[0m', 'Deprecation warning: Please use \'Literal\' instead of \'String\'. See more: https://github.com/Cambalab/fake-data-generator/tree/develop#literal');
  return model;
}

/**
 * append - Given a model and options, appends a value to the parsed model.
 * -> parsedModel should return a Leaf.
 * @param  {Object} model A model Node
 * @param  {Object} options [text: Number|String>]
 * @return {String} A parsed model
 */
function append(model, options) {
  return '' + parseModel(model) + options.text;
}

/**
 * prepend - Given a model and options, prepends a value to the parsed model.
 * -> parsedModel should return a Leaf.
 * @param  {Object} model A model Node
 * @param  {Object} options [text: Number|String>]
 * @return {String} A parsed model
 */
function prepend(model, options) {
  return '' + options.text + parseModel(model);
}

var modelAttributeTypes = {
  // Structure types
  Object: parseModel,
  Array: parseArray,
  Literal: parseLiteral,
  String: parseString,
  // Data generators types
  // -- external libs
  faker: function faker(args) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return Object.byString(_faker3.default, args).apply(undefined, _toConsumableArray(options));
  },
  // -- internal libs
  // ---- strings
  append: append,
  prepend: prepend,
  // ---- numbers
  incrementNumber: _helpers.numbers.incrementNumber,
  randomNumberBetween: _helpers.numbers.randomBetween,
  randomElementInArray: _helpers.numbers.randomElementInArray,
  randomElementsInArray: _helpers.numbers.randomElementsInArray,
  randomNumberBetweenWithString: _helpers.numbers.randomBetweenWithString
};

exports.parseArray = parseArray;
exports.parseLiteral = parseLiteral;
exports.parseModel = parseModel;
exports.parseString = parseString;
exports.append = append;
exports.prepend = prepend;

/**
 * parseModelData- Given a model, configures faker and returns a parsed model.
 * @param {Object} modelData An object containing the model data, usually
 * containing a 'config' and 'model' parent attributes
 * @param {Object} options Different options provided from the model creation
 * step
 * @return {Any} Returns a parsed model
 */

exports.default = function (modelData) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _modelData$config = modelData.config,
      config = _modelData$config === undefined ? {} : _modelData$config,
      model = modelData.model;


  configureFaker(config);

  return parseModel(model, options);
};