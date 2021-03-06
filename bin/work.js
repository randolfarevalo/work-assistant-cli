#! /usr/bin/env node
const package = require('../package.json')
const config = require('config')
const { DateTime } = require('luxon')
const ClickUp = require('../lib/clickup')
const Report = require('../lib/report')
const Mailer = require('../lib/mailer')

async function main() {
  const mailConfig = config.get('Mail');
  const clickUpConfig = config.get('ClickUp')
  const clickup = new ClickUp(clickUpConfig)
  const mailer = new Mailer(mailConfig)

  console.log(`Starting ${package.longName} v${package.version}`)
  let action = process.argv[2]

  // ISO8601 to unix timestamp
  let startDate = DateTime.fromISO(DateTime.now().toFormat("yyyy-LL-dd'T00:00:00.000'")).toMillis()
  let endDate = DateTime.fromISO(DateTime.now().toFormat("yyyy-LL-dd'T23:59:59.000'")).toMillis()

  switch (action) {
    case 'start':
      /**
       * Process
       * 1. get current time  DateTime.now().toFormat(DateTime.TIME_SIMPLE)
       * 2. get task today
       * 3. add custom entry
       * 4. confirm to send
       * 5. send e-mail
       */
      

      /*
      let taskData = await clickup.GetTasks(startDate, endDate)
      let report = Report.toHTMLEmail(taskData)
      mailer.Send('', '', report, true)
      */
      break
    case 'end':
      console.log('end work')
      console.log(clickup.GetTasks(startDate, endDate, true))
      break
    default:
      console.log('unknown action')
  }
}
main().catch(console.error);