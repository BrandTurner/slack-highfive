'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _concatStream = require('concat-stream');

var _concatStream2 = _interopRequireDefault(_concatStream);

var _http = require('http');

var _https = require('https');

var _querystring = require('querystring');

var _url = require('url');

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var tokensToUrl = 'reddit';//JSON.parse('{"dx0uLiRnbQSjR7YcFtopRasC":"https://hooks.slack.com/services/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"}');

var handleError = function handleError(res) {
  return function (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(err.message || err);
  };
};

exports['default'] = (0, _http.createServer)(function (req, res) {
  var errorHandler = handleError(res);

  req.pipe((0, _concatStream2['default'])(function (body) {
    var account = 'eventfarm';
    var parsed = (0, _querystring.parse)(body.toString());
    var token = parsed.token;
    var channel = '#' + parsed.channel_name;
    var text = parsed.text;
    var user = parsed.user_name;
    var url = tokensToUrl[token];

    var slackReq = (0, _https.request)((0, _xtend2['default'])((0, _url.parse)(url), { method: 'POST' }), function (slackRes) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end();
    });

    slackReq.on('error', errorHandler);

    slackReq.write(JSON.stringify({
      channel: channel,
      text: '@' + user + '\'s Highfive meeting ready at https://' + account + '.highfive.com/' + text
    }));

    slackReq.end();
  }));

  req.on('error', errorHandler);
});
module.exports = exports['default'];