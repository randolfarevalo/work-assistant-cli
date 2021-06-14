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
   * @closedItems retrieve 'Closed' task based on the update date
   */
  async GetTasks(startDate, endDate, closedItems = false) {
    let spaceUrl = `${apiEndpoint}/space/${this.conf.spaceId}/folder?archived=false`
    let taskUrl = `${apiEndpoint}/list/`

    let config = {
      headers: {
        Authorization: this.conf.personalToken,
      },
    }

    let response = await axios.get(spaceUrl, config)
    let jsonObject = JSON.parse(JSON.stringify(response.data))
    let result = []
    let resultIndex = 0

    // TODO: Add error handling
    for (let folder of jsonObject.folders) {
      for (let list of folder.lists) {

        let params = `due_date_gt=${startDate}&due_date_lt=${endDate}`
        if (closedItems) {
          params = `date_updated_gt=${startDate}&date_updated_lt=${endDate}&include_closed=true&statuses[]=Closed`
        }

        let spaceTaskUrl = `${taskUrl}${list.id}/task?archived=false&subtasks=true&${params}`
        let taskData = await axios.get(spaceTaskUrl, config);
        let taskList = JSON.parse(JSON.stringify(taskData.data))
        let taskCount = Object.keys(taskList.tasks).length

        // NOTE: if taskCount exceed 100, need to do query per page, use task "page" attribute
        if (taskCount > 0) {
          console.log(`there is a task today for ${folder.name}`)
          let activity = { id: resultIndex, 
                           name: `${folder.name}`, 
                           tasks: [] }
          for (let task of taskList.tasks) {
            activity.tasks.push(task.name)
          }
          result.push(activity)
          resultIndex +=1
        }
      }
    }
    return result;
  }
}

module.exports = ClickUp;
