'use strict'

import concat from 'concat-stream'
import { createServer } from 'http'
import { request } from 'https'
import { parse as queryStringParse } from 'querystring'
import { parse as urlParse } from 'url'
import xtend from 'xtend'

const tokensToUrl = JSON.parse(process.env.TOKENS_URLS)

const handleError = res => err => {
  res.writeHead(500, { 'Content-Type': 'text/plain' })
  res.end(err.message || err)
}

export default createServer((req, res) => {
  const errorHandler = handleError(res)

  req.pipe(concat(body => {
    const account = process.env.HIGHFIVE_ACCOUNT
    const parsed = queryStringParse(body.toString())
    const token = parsed.token
    const channel = `#${parsed.channel_name}`
    const text = parsed.text
    const user = parsed.user_name
    const url = tokensToUrl[token]

    const slackReq = request(
      xtend(urlParse(url), { method: 'POST' }),
      slackRes => {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end()
      }
    )

    slackReq.on('error', errorHandler)

    slackReq.write(JSON.stringify({
      channel: channel,
      text: '@' + user + '\'s Highfive meeting ready at https://' + account + '.highfive.com/' + text
    }))

    slackReq.end()
  }))

  req.on('error', errorHandler)
})
