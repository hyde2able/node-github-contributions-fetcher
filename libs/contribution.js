class Contribution {
  constructor(x, y, color, count, date) {
    this.x = parseInt(x, 10)
    this.y = parseInt(y, 10)
    this.color = color
    this.count = parseInt(count, 10)
    this.date = new Date(date)
  }
}

module.exports = Contribution
