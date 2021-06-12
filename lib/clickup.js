const axios = require('axios').default;
const { DateTime } = require('luxon')

class ClickUp {

  constructor(config) {
    this.conf = config;
  }

  async GetTodayTask() {
    let spaceUrl = `https://api.clickup.com/api/v2/space/${this.conf.spaceId}/folder?archived=false`
    let taskUrl = `https://api.clickup.com/api/v2/list/`
    
    //ISO8601 to unix timestamp
    let startDate = DateTime.fromISO(DateTime.now().toFormat("yyyy-LL-dd'T00:00:00.000'")).toMillis()
    let endDate = DateTime.fromISO(DateTime.now().toFormat("yyyy-LL-dd'T23:59:59.000'")).toMillis()

    console.log(startDate,endDate)
    
    let config = {
      headers: { 
        'Authorization': this.conf.personalToken
      }
    }

    let response = await axios.get(spaceUrl, config)
    let result = JSON.parse(JSON.stringify(response.data))

    //TODO: Improve this code
    for(let folderIndex in result['folders']) {
      console.log(result['folders'][folderIndex].name)      
      for(let listIndex in result['folders'][folderIndex]['lists']) {
        let listDetail = result['folders'][folderIndex]['lists'][listIndex]
        console.log("--" + listDetail.name + " (" + listDetail.id + ")")

        let spaceTaskUrl = `${taskUrl}${listDetail.id}/task?archived=false&subtasks=true&due_date_gt=${startDate}&due_date_lt=${endDate}`
        let taskResponse =  await axios.get(spaceTaskUrl, config);
        let taskResult = JSON.parse(JSON.stringify(taskResponse.data))

        console.log(spaceTaskUrl)

        let taskCount = Object.keys(taskResult['tasks']).length
        console.log(taskCount)
        /*
        if(taskCount > 0) {
          console.log(taskResult)
        }
        */
      }
    }
  }
}

module.exports = ClickUp;