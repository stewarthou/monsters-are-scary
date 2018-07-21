const debug = require('debug')('monsters-are-scary:server:dungeon-controller')

const Constants = require('../../const')
const DungeonModel = require('../models/dungeon-model')

const RESPONSE_CODE_OK = 200
const RESPONSE_CODE_BAD_REQUEST = 400
const RESPONSE_CONTENT_TYPE_TEXT = 'text/plain'

/**
 * Create a Dungeon API controller
 * @param {object} config System config
 * @return {object} a Dungeon API controller
 */
function create (config) {
  let dungeonController
  if (config) {
    const dungeonMapSizeX = config.server.dungeon.sizeX
    const dungeonMapSizeY = config.server.dungeon.sizeY
    const dungeonDifficulty = config.server.dungeon.difficulty

    const dungeon = DungeonModel.create(dungeonMapSizeX, dungeonMapSizeY, dungeonDifficulty)
    debug('dungeon', dungeon)
    if (dungeon) {
      console.log(`Dungeon with a ${dungeonMapSizeX} x ${dungeonMapSizeY} map created.`)
      let dungeonDifficultyString
      switch (dungeonDifficulty) {
        case Constants.SERVER_DUNGEON_DIFFICULTY_EASY:
          dungeonDifficultyString = 'Easy'
          break
        case Constants.SERVER_DUNGEON_DIFFICULTY_MEDIUM:
          dungeonDifficultyString = 'Medium'
          break
        case Constants.SERVER_DUNGEON_DIFFICULTY_HIGH:
          dungeonDifficultyString = 'High'
          break
        default:
          break
      }
      console.log(`Difficulty: ${dungeonDifficultyString}`)
      dungeonController = {
        getRoom: (req, res) => {
          // Validate request parameters
          const x = parseInt(req.params.x, 10)
          const y = parseInt(req.params.y, 10)
          // Get room content
          const roomContent = dungeon.getRoomContent(x, y)
          debug('roomContent', roomContent)
          if (roomContent && (roomContent === Constants.DUNGEON_ROOM_WITH_MONSTER || roomContent === Constants.DUNGEON_ROOM_WITH_GOLD)) { // 1 or 2
            // Valid request
            res.status(RESPONSE_CODE_OK)
            res.header('Content-Type', RESPONSE_CONTENT_TYPE_TEXT)
            if (roomContent === Constants.DUNGEON_ROOM_WITH_MONSTER) {
              res.send(Constants.DUNGEON_ROOM_WITH_MONSTER_STRING)
            } else {
              res.send(Constants.DUNGEON_ROOM_WITH_GOLD_STRING)
            }
          } else {
            // Invalid request
            res.status(RESPONSE_CODE_BAD_REQUEST)
            res.send()
          }
        }
      }
    }
  }
  return dungeonController
}

module.exports = {
  create: create
}
