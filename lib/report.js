const htmlCreator = require('html-creator')

class Report {

  static toTextEmail(data) {
  }

  static taskReportToHTML(data) {
    const html = new htmlCreator([
      {
        type: 'head',
        content: [{ type: 'title', content: 'Daily Update' }]
      },
      {
        type: 'body',
        content: [{
          type: 'p',
          content: `Time Started: ${data.meta.time_start} | Time Ended: ${data.meta.time_end}`
        }]
      }

    ])
    return html.renderHTML();
  }

  static toPDF(data) {
  }

}

module.exports = Report;
