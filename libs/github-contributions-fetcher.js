const axios = require('axios')
const parseString = require('xml2js').parseString



class GitHubContributionsFetcher {
  constructor() {
  }

  fetch(username) {
    const url = `https://github.com/users/${username}/contributions`

    axios.get(url)
    .then(response => {
      //console.log(response)
      this.parse(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  parse(body) {
    parseString(body, (err, result) => {
      console.log(result)
      const width = result.svg.$.width
      const height = result.svg.$.height
      const data = result.svg.g[0].g

      console.log(width)
      console.log(height)
      console.log(data)

    })
  }
}

module.exports = GitHubContributionsFetcher

//
//     // 並行実行
//     async.forEach(data, function(datum, callback) {
//        // datum.$.transform は transform(???, 0)の形式なのでmatchで???を抽出
//         x = datum.$.transform.match(/\d+/)[0];
//         datum.rect.forEach( function(rect) {
//             y = rect.$.y;
//             color = rect.$.fill;
//             count = rect.$['data-count'];
//             date = rect.$['data-date'];
//
//             kusa = new contribution(x, y, color, count, date);
//             contributions.push(kusa);
//         });
//         callback();
//     }, function(err) {
//         if( err ) console.log(err);
//         console.log(contributions);
//         callback(contributions);
//     });
// });
// module.exports = GitHubContributionsFetcher
//
//
// // githubの草のオブジェクト
// function contribution(x, y, color, count, date){
//   this.x = x,
//   this.y = y,
//   this.color = color,
//   this.count = count,
//   this.date = date;
// }
