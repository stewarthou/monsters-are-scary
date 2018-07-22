const debug = require('debug')('monsters-are-scary:client:game-controller')

const Constants = require('../../const')

function create (gameModel) {
  let gameController
  if (gameModel) {
    const sendCommand = async command => {
      // Validate command
      const commandToDirectionMapping = {}
      commandToDirectionMapping['north'] = Constants.DIRECTION_NORTH
      commandToDirectionMapping['n'] = Constants.DIRECTION_NORTH
      commandToDirectionMapping['south'] = Constants.DIRECTION_SOUTH
      commandToDirectionMapping['s'] = Constants.DIRECTION_SOUTH
      commandToDirectionMapping['east'] = Constants.DIRECTION_EAST
      commandToDirectionMapping['e'] = Constants.DIRECTION_EAST
      commandToDirectionMapping['west'] = Constants.DIRECTION_WEST
      commandToDirectionMapping['w'] = Constants.DIRECTION_WEST

      const direction = commandToDirectionMapping[command]
      if (direction) {
        // Move player
        try {
          console.log(`Moving player to ${direction}`)
          const moveResult = await gameModel.move(direction)
          debug('moveResult', moveResult)
          const currentPlayerState = moveResult.player
          const isPlayerDied = currentPlayerState.health <= 0
          const score = currentPlayerState.gold
          if (moveResult.isMoved) {
            if (moveResult.isVisited) {
              console.log(`You returned room ${currentPlayerState.x}, ${currentPlayerState.y}`)
              return Constants.STATUS_VALID_COMMAND
            } else {
              console.log(`You entered room ${currentPlayerState.x}, ${currentPlayerState.y}`)
              if (moveResult.isMonster) {
                console.log(`You encountered a Monster, lost 1 health, you have ${currentPlayerState.health} health left`)
              } else {
                console.log('You found a Gold, earned 1 score')
              }
              if (isPlayerDied) {
                console.log(`You are died, your final score is ${score}`)
                return Constants.STATUS_GAME_OVER
              } else {
                console.log(`You current score is ${score}`)
                return Constants.STATUS_VALID_COMMAND
              }
            }
          } else {
            console.log(`You hit a wall, you are at room ${currentPlayerState.x}, ${currentPlayerState.y}`)
            return Constants.STATUS_VALID_COMMAND
          }
        } catch (error) {
          // Server error
          debug('Game Controller Error', error)
          return Constants.STATUS_SERVER_ERROR
        }
      } else {
        // Invalid command
        return Constants.STATUS_INVALID_COMMAND
      }
    }
    gameController = {
      sendCommand: sendCommand
    }
  }
  return gameController
}

module.exports = {
  create: create
}
