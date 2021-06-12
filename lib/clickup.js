const axios = require('axios').default;

const apiEndpoint = 'https://api.clickup.com/api/v2'

/**
 * ClickUp API v2
 */
class ClickUp {

  constructor(config) {
    this.conf = config;
  }

  /**
   * Get task for the specific date range (UTC)
   * @startDate unix format
   * @endDate unit format
   */
  async GetTask(startDate, endDate) {
    let spaceUrl = `${apiEndpoint}/space/${this.conf.spaceId}/folder?archived=false`
    let taskUrl = `${apiEndpoint}/list/`

    let config = {
      headers: {
        Authorization: this.conf.personalToken,
      },
    }

    let response = await axios.get(spaceUrl, config)
    let result = JSON.parse(JSON.stringify(response.data))

    for (let folder of result.folders) {
      for (let list of folder.lists) {

        let spaceTaskUrl = `${taskUrl}${list.id}/task?archived=false&subtasks=true&due_date_gt=${startDate}&due_date_lt=${endDate}`
        let taskData = await axios.get(spaceTaskUrl, config);
        let taskList = JSON.parse(JSON.stringify(taskData.data))
        let taskCount = Object.keys(taskList.tasks).length

        // NOTE: if taskCount exceed 100, need to do query per page, use task "page" attribute
        if (taskCount > 0) {
          console.log(`there is a task today for ${folder.name}`)
          for (let task of taskList.tasks) {
            console.log(task.name)
          }
        }
      }
    }
  }
}

module.exports = ClickUp;
