const axios = require('axios').default;

class ClickUp {

  constructor(config) {
    this.conf = config;
  }

  async GetTodayTask() {
    let targetUrl = 'https://api.clickup.com/api/v2/space/' + this.conf.spaceId + '/folder?archived=false'

    let config = {
      method: 'get',
      url: targetUrl,
      headers: { 
        'Authorization': this.conf.personalToken
      }
    }

    axios(config)
    .then(function (response) {
      var result = JSON.parse(JSON.stringify(response.data));
      console.log(result['folders']['0']['lists']);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
}

module.exports = ClickUp;