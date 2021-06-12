#! /usr/bin/env node
const config = require('config')
const { DateTime } = require('luxon')
const ClickUp = require('../lib/clickup')

const APP_NAME = 'work-assistant-cli'

async function main() {
  // let mailConfig = config.get('Mail');
  const clickUpConfig = config.get('ClickUp')
  const clickup = new ClickUp(clickUpConfig)

  console.log(`Starting ${APP_NAME}`)
  let action = process.argv[2]

  // ISO8601 to unix timestamp
  let startDate = DateTime.fromISO(DateTime.now().toFormat("yyyy-LL-dd'T00:00:00.000'")).toMillis()
  let endDate = DateTime.fromISO(DateTime.now().toFormat("yyyy-LL-dd'T23:59:59.000'")).toMillis()

  switch (action) {
    case 'start':
      console.log('getting the things you need to do today')
      clickup.GetTodayTask(startDate, endDate)
      break
    case 'end':
      console.log('end work')
      break
    default:
      console.log('unknown action')
  }
}
main().catch(console.error);
