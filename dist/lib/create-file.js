'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = createFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFile(fileName, data) {
  try {
    _fs2.default.writeFile(process.cwd() + '/' + fileName, data, 'utf8', function (err) {
      if (err) {
        throw new Error(err);
      }
      console.log('\x1b[32m', 'Your file has been saved in ' + process.cwd() + '/output/' + fileName + '.');
    });
  } catch (err) {
    console.error(err);
  }
}