/* globals describe, it, before */
/* eslint no-unused-expressions: 0 */

const chai = require('chai')
const expect = chai.expect
const config = require('config')
const httpMocks = require('node-mocks-http')

const Constants = require('../../../const')
const DungeonController = require('../dungeon-controller')

describe('dungeon-controller tests', () => {
  describe('Module structure tests', () => {
    it('should have creating function create(config)', () => {
      expect(DungeonController.create, 'Im too lazy to implement this function').to.exist
    })
  })
  describe('getRoom(req, res) tests', () => {
    let dungeonController
    let validRequest
    let invalidRequest
    const responseForValidRequest = httpMocks.createResponse()
    const responseForInvalidRequest = httpMocks.createResponse()
    before(() => {
      // A dungeonController has 1 API request handler function getRoom(req, res)
      // For a 4 x 4 map, request for GET room 0,1 to 3,3 are valid requests
      // All valid request should return following
      // status code: 200
      // Content-Type: 'text/plain'
      // Body: 'GOLD' or 'MONSTER'

      // All invalid request should return following
      // status code: 400

      // Mockups
      // dungeonController = {
      //   getRoom: (req, res) => {
      //     res.header("Content-Type", "text/plain")
      //     res.send('GOLD')
      //     res.status(400)
      //     res.send()
      //   }
      // }

      dungeonController = DungeonController.create(config)

      validRequest = httpMocks.createRequest({
        method: 'GET',
        url: '/room/0/1',
        params: {
          x: 0,
          y: 1
        }
      })
      invalidRequest = httpMocks.createRequest({
        method: 'GET',
        url: '/room/5/5',
        params: {
          x: 5,
          y: 5
        }
      })
      dungeonController.getRoom(validRequest, responseForValidRequest)
      dungeonController.getRoom(invalidRequest, responseForInvalidRequest)
    })
    // Valid request should retrun a 200 response with 'text/plain' as Content-Type and either 'GOLD' or 'MONSTER' as body
    it('should have a response for that valid request', () => {
      const statusCode = responseForValidRequest.statusCode
      const headers = responseForValidRequest._getHeaders()
      const body = responseForValidRequest._getData()

      expect(statusCode, 'Response should have status code 200').to.equal(200)
      expect(headers['Content-Type'], 'Response should have content type text/plain').to.equal('text/plain')
      expect(body === Constants.DUNGEON_ROOM_WITH_GOLD_STRING || body === Constants.DUNGEON_ROOM_WITH_MONSTER_STRING, 'Body should be string GOLD or MONSTER').to.be.true
    })
    // Invalid request should return a 400 response with no body
    it('should have a response for that invalid request', () => {
      const statusCode = responseForInvalidRequest.statusCode

      expect(statusCode, 'Response should have status code 400').to.equal(400)
    })
  })
})
