slack-highfive
=================

[![Circle CI](https://circleci.com/gh/lanetix/slack-highfive.svg?style=svg)](https://circleci.com/gh/lanetix/slack-highfive)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Slack Slash Command for Highfive Video Conferences

Deploy to Heroku
----------------
You can deploy this elsewhere, however it's free and fast to just deploy this to Heroku using this handy button AS-IS and you are _almost_ ready to go!

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Configuration
-------------

1. Export a json hash of slack slash command tokens to slack incoming webhook urls to `TOKENS_URLS`, e.g.:
```bash
export TOKENS_URLS='{"gIkuvaNzQIHg97ATvDxqgjtO":"https://hooks.slack.com/services/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"}'
```

2. Export your Highfive account name (where `ship` is the account in the url https://ship.highfive.com)
```bash
export HIGHFIVE_ACCOUNT='{your_account}'
```

Creating Slash Command
----------------------
_Source: https://success.highfive.com/hc/en-us/articles/205245365-Creating-a-nifty-Slack-integration-for-Highfive_

1. Open Slack in your Web browser (using your team-associated admin account)
2. Open Team Settings from the team menu
3. Select Integrations, then select Slash Commands
4. Select Add, then configure your Slash Command with
  - command: /highfive
  - url: https://yourapp.yourdomain.com/slack (see notes below)
  - method: post
  - token: <some-auto-generated-text>
  - auto-complete text: Initiate a Highfive call
  - usage hint: [call name]
5. Select Save your integration

Credit to @apechimp who's simple Edgar Facts repo provided the structure of this repo: https://github.com/apechimp/slack-edgar-facts
