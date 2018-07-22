/* globals describe, it, before */
/* eslint no-unused-expressions: 0 */

const chai = require('chai')
const expect = chai.expect

const Constants = require('../../../const')
const GameController = require('../game-controller')

const VALID_COMMAND_GO_EAST = 'east'
const VALID_COMMAND_GO_EAST_ALT = 'e'

const INVALID_COMMAND = 'eastt'

describe('game-controller tests', () => {
  describe('Module structure tests', () => {
    it('should have creating function create(gameModel)', () => {
      expect(GameController.create, 'Im too lazy to implement this function').to.exist
    })
  })
  describe('game controller object creating function tests', () => {
    let gameController
    let gameControllerForTestingGameOver
    const mockGameModel = {
      move: (direction) => {
        // Player is live
        return {
          health: 5,
          gold: 2,
          x: 1,
          y: 1,
          visitedRooms: []
        }
      }
    }
    const mockGameModelSurroundedByMonsters = {
      move: (direction) => {
        // Player has only 1 health and surrounded by monsters
        return {
          health: 0, // Player is died
          gold: 2,
          x: 1,
          y: 1,
          visitedRooms: []
        }
      }
    }
    before(() => {
      // A game controller has following functions
      // Receive commands from game client
      // Validate commands and if valid, call functions of game model
      // Print messages to players
      // Return status code back to game client for each commands
      // Status code could be: Valid command, Invalid command, Player is died

      // Mockups
      // gameController = {
      //   sendCommand: (command) => {
      //     // Do something
      //     return Constants.STATUS_VALID_COMMAND
      //     return Constants.STATUS_INVALID_COMMAND
      //   }
      // }

      // gameControllerForTestingGameOver = {
      //   sendCommand: (command) => {
      //     // Do something
      //     return Constants.STATUS_GAME_OVER
      //   }
      // }

      gameController = GameController.create(mockGameModel)
      gameControllerForTestingGameOver = GameController.create(mockGameModelSurroundedByMonsters)
    })
    it('should return status: valid command for valid commands', () => {
      let status = gameController.sendCommand(VALID_COMMAND_GO_EAST)
      expect(status, 'Status should be valid command').to.equal(Constants.STATUS_VALID_COMMAND)
      status = gameController.sendCommand(VALID_COMMAND_GO_EAST_ALT)
      expect(status, 'Status should be valid command for command in alternative format').to.equal(Constants.STATUS_VALID_COMMAND)
    })
    it('should return status: invalid command for invalid commands', () => {
      let status = gameController.sendCommand(INVALID_COMMAND)
      expect(status, 'Status should be invalid command').to.equal(Constants.STATUS_INVALID_COMMAND)
    })
    it('should return status: game over if player is died after the command', () => {
      let status = gameControllerForTestingGameOver.sendCommand(VALID_COMMAND_GO_EAST)
      expect(status, 'Status should be Game Over').to.equal(Constants.STATUS_GAME_OVER)
    })
  })
})
