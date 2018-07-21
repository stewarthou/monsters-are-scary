const debug = require('debug')('monsters-are-scary:server:dungeon-model')

const Constants = require('../../const')

/**
 * Generate a dungeon map
 * @param {number} sizeX Map size X
 * @param {number} sizeY Map size Y
 * @param {number} difficulty Map difficulty
 * @return {object} a Map object
 */
function _generateMap (sizeX, sizeY, difficulty) {
  let map
  // Validate configs
  if (sizeX > 1 && sizeY > 1 && difficulty >= 1 && difficulty <= 3) {
    map = {}
    // Depends on difficulty level, the possibility of swarming Monster is follwing mapping
    const monsterSwarmingRates = {}
    monsterSwarmingRates[Constants.SERVER_DUNGEON_DIFFICULTY_EASY] = 0.25
    monsterSwarmingRates[Constants.SERVER_DUNGEON_DIFFICULTY_MEDIUM] = 0.5
    monsterSwarmingRates[Constants.SERVER_DUNGEON_DIFFICULTY_HIGH] = 0.75
    const currentMonsterRate = monsterSwarmingRates[difficulty]
    debug('currentMonsterRate', currentMonsterRate)

    // Create a empty room
    map['0,0'] = Constants.DUNGEON_ROOM_EMPTY
    // Create other rooms
    for (let x = 0; x < sizeX; x++) {
      for (let y = 0; y < sizeY; y++) {
        if (x === 0 && y === 0) {
          // Ignore empty room
        } else {
          map[`${x},${y}`] = Math.random() <= currentMonsterRate ? Constants.DUNGEON_ROOM_WITH_MONSTER : Constants.DUNGEON_ROOM_WITH_GOLD
        }
      }
    }
  }
  debug('map', map)
  return map
}

/**
 * Create a Dungeon
 * @param {*} mapSizeX Dungeon map size X
 * @param {*} mapSizeY Dungeon map size Y
 * @param {*} difficulty Dungeon difficulty
 * @return {object} a Dungeon object
 */
function create (mapSizeX, mapSizeY, difficulty) {
  let dungeon
  const map = _generateMap(mapSizeX, mapSizeY, difficulty)
  if (map) {
    dungeon = {
      getRoomContent: (x, y) => {
        return map[`${x},${y}`]
      }
    }
  }
  return dungeon
}

module.exports = {
  create: create,
  _private: {
    generateMap: _generateMap
  }
}
