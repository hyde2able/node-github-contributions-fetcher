const axios = require('axios')
const parseString = require('xml2js').parseString

class GitHubContributionsFetcher {
  constructor() {
  }

  fetch(username) {
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
        const contributions = result.svg.g[0].g

        console.log(width)
        console.log(height)

        for(let i = 0; i < contributions.length; i++) {
          const contribution = contributions[i]
          const x = contribution.$.transform.match(/\d+/)[0]
          contribution.rect.forEach(rect => {
            const y = rect.$.y
            const color = rect.$.fill
            const count = rect.$['data-count']
            const date = rect.$['data-date']

            console.log(x, y, color, count, date)
            console.log('====')
          })
        }
      })
    })
  }
}

module.exports = GitHubContributionsFetcher
