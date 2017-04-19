const axios = require('axios')
const parseString = require('xml2js').parseString
const Contribution = require('./contribution')

class GitHubContributionsFetcher {
  constructor() {
  }

  fetch(username, callback) {
    const url = `https://github.com/users/${username}/contributions`

    axios.get(url)
    .then(this.parse2json)
    .catch(error => {
      console.log(error)
    })
  }

  parse2json(response) {
    const body = response.data
    return new Promise((resolve, reject) => {
      parseString(body, (err, result) => {
        if(err) return reject(err)

        const width = result.svg.$.width
        const height = result.svg.$.height
        const data = result.svg.g[0].g
        let contributions = []

        for(let i = 0; i < data.length; i++) {
          const datum = data[i]
          const x = datum.$.transform.match(/\d+/)[0]
          datum.rect.forEach(rect => {
            const y = rect.$.y
            const color = rect.$.fill
            const count = rect.$['data-count']
            const date = rect.$['data-date']

            contributions.push(new Contribution(x, y, color, count, date))
          })
        }

        console.log(contributions)

      })
    })
  }


}

module.exports = GitHubContributionsFetcher
