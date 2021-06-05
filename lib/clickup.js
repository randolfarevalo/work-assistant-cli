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

    let config = {
      headers: { 
        'Authorization': this.conf.personalToken
      }
    }

    let response = await axios.get(spaceUrl, config)
    let result = JSON.parse(JSON.stringify(response.data))

    for(let folderIndex in result['folders']) {
      console.log(result['folders'][folderIndex].name);
      for(let listIndex in result['folders'][folderIndex]['lists']) {
        console.log(`--${result['folders'][folderIndex]['lists'][listIndex].name}`);
      }
    }
    //console.log(result['folders']['0']['lists'])


  }
}

module.exports = ClickUp;