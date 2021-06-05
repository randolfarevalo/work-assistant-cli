#! /usr/bin/env node
const Mailer = require('../lib/mailer')
const ClickUp = require('../lib/clickup')
const config = require('config')
const APP_NAME = 'work-assistant-cli'

async function main() {

  let mailConfig = config.get('Mail');
  let clickUpConfig = config.get('ClickUp');

  const clickup = new ClickUp(clickUpConfig);
  //const mailer = new Mailer()

  let action = process.argv[2]
  
  switch(action) {
    case 'start':
      console.log('lets get to work');
      clickup.GetTodayTask();
      //mailer.Send('randolf.arevalo+wa@essilor.com','Work Assistant','Body', true)
      break;
    case 'end':
      console.log('end work');
      //mailer.Send('randolf.arevalo+wa@essilor.com','Work Assistant','Body', true)
      break;
  }
}

main().catch(console.error);