class Report {

  static toTextEmail(data) {
  }

  static toHTMLEmail(data) {
    let rep = ""
    for(let item of data) {
      rep += `<strong>${item.name}<strong>`
      for(let task of item.tasks) {
        rep += `- ${task}<br />`
      }
    }
    return rep;
  }

  static toPDF(data) {
  }

}

module.exports = Report;
