const axios = require('axios').default;

class ClickUp {

  constructor(config) {
    this.conf = config;
  }

  async GetTodayTask() {
    /**
     * Find folder, it contain lists
     * List contain task
     */

    let spaceUrl = `https://api.clickup.com/api/v2/space/${this.conf.spaceId}/folder?archived=false`
    let taskUrl = `https://api.clickup.com/api/v2/list/`

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

        let spaceTaskUrl = `${taskUrl}${listDetail.id}/task?archived=false&subtasks=true&due_date_gt=1622836800000`
        let taskResponse =  await axios.get(spaceTaskUrl, config);
        let taskResult = JSON.parse(JSON.stringify(taskResponse.data))

        let taskCount = Object.keys(taskResult['tasks']).length
        console.log(taskCount)
        if(taskCount > 0) {
          console.log(taskResult)
        }
      }
    }
    //console.log(result['folders']['0']['lists'])
  }
}

module.exports = ClickUp;