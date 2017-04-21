'use strict'

const assert = require('power-assert')
const GCF = require('../libs/github-contributions-fetcher.js')

describe('github-contributions-fetcher', () => {
  describe('fetch()', () => {
    let status = 0
    const gcf = new GCF()

    it('Response should be status 200', done => {
      gch.fetch('hyde2able').then((res, statusCode) => {
        done()
        assert(statusCode === 200)
      })
    }

    it('Response should be status 404', done => {
      gcf.fetch('_').then((res, statusCode) => {
        done()
        assert(statusCode === 404)
      })
    })
  })
})
