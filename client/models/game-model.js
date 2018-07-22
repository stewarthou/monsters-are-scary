let fetch
const debug = require('debug')('monsters-are-scary:client:game-model')

const Constants = require('../../const')

/**
 * Calculate the x,y of next room
 * @param {number} currentRoomX Current room x
 * @param {number} currentRoomY Current room y
 * @param {string} direction Direction
 * @return {object} Next room's x and y
 */
function _calculateNextRoomByCurrentRoomAndDirection (currentRoomX, currentRoomY, direction) {
  // This function will not validate the next room, and the game server will do that
  const directionMappingFunctions = {}

  directionMappingFunctions[Constants.DIRECTION_EAST] = (x, y) => ({ nextX: x, nextY: y + 1 })
  directionMappingFunctions[Constants.DIRECTION_NORTH] = (x, y) => ({ nextX: x + 1, nextY: y })
  directionMappingFunctions[Constants.DIRECTION_WEST] = (x, y) => ({ nextX: x, nextY: y - 1 })
  directionMappingFunctions[Constants.DIRECTION_SOUTH] = (x, y) => ({ nextX: x - 1, nextY: y })

  return directionMappingFunctions[direction](currentRoomX, currentRoomY)
}

/**
 * Create a game session
 * @param {number} playerHealth Initial player health
 * @param {string} gameServerUrl Game server url
 * @param {object} fetchLib For testing, pass a mock fetch library
 * @return {object} A game object
 */
function create (playerHealth, gameServerUrl, fetchLib) {
  let game
  // Use mock fetch lib for testing
  if (fetchLib) {
    console.log('Testing Mode')
    fetch = fetchLib
  } else {
    fetch = require('node-fetch')
  }
  if (playerHealth > 0) {
    // Create a new player
    const player = {
      health: playerHealth,
      gold: 0,
      x: 0,
      y: 0,
      visitedRooms: ['0,0'] // Start room is alway a visited room
    }
    debug('new player', player)
    const getPlayer = () => {
      return player
    }
    const movePlayer = async direction => {
      debug('Direction', direction)
      const { nextX, nextY } = _calculateNextRoomByCurrentRoomAndDirection(player.x, player.y, direction)
      debug(`Next room ${nextX}, ${nextY}`)

      // Check has the player visited ths room
      const keyForVisitedRoom = `${nextX},${nextY}`
      const hasVisited = (player.visitedRooms.indexOf(keyForVisitedRoom) >= 0)

      if (hasVisited) {
        debug(`Player has visited room ${nextX}, ${nextY}`)
        // Move player to next room
        // Do NOT change health
        // Do NOT change number of Gold
        player.x = nextX
        player.y = nextY
      } else {
        // Call game server to get content of room
        const roomUrl = `${gameServerUrl}/room/${nextX}/${nextY}`

        try {
          const response = await fetch(roomUrl)
          const statusOk = response.ok
          if (statusOk) {
            // Move to next room
            debug(`Moving to non-visited room ${nextX}, ${nextY}`)
            player.x = nextX
            player.y = nextY
            player.visitedRooms.push(keyForVisitedRoom)
            // Kill monster or collect gold
            const contentOfRoom = await response.text()
            switch (contentOfRoom) {
              case Constants.DUNGEON_ROOM_WITH_MONSTER_STRING:
                debug('Killed a Monster')
                // Monster
                player.health--
                break
              case Constants.DUNGEON_ROOM_WITH_GOLD_STRING:
                debug('Collected a Gold')
                // Gold
                player.gold++
                break
              default:
                break
            }
          } else {
            debug('Hit a Wall')
          }
        } catch (error) {
          console.error('Could not connect to Game Server, error', error)
        }
      }
      debug('current player', player)
      return player
    }
    game = {
      getPlayer: getPlayer,
      move: movePlayer
    }
  }
  return game
}

module.exports = {
  create: create
}
