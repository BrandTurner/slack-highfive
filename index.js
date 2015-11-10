'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

_server2['default'].listen(process.env.PORT || 0, function (err) {
  if (err) {
    process.emit('error', err);
  }
  console.log('Listening on port: ' + _server2['default'].address().port);
});