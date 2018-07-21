const Constants = require('../const')

module.exports = {
  server: {
    dungeon: {
      sizeX: parseInt(process.env.SERVER_DUNGEON_MAP_SIZE_X, 10) || Constants.SERVER_DUNGEON_DEFAULT_SIZE_X,
      sizeY: parseInt(process.env.SERVER_DUNGEON_MAP_SIZE_Y, 10) || Constants.SERVER_DUNGEON_DEFAULT_SIZE_Y,
      difficulty: parseInt(process.env.SERVER_DUNGEON_DIFFICULTY, 10) || Constants.SERVER_DUNGEON_DEFAULT_DIFFICULTY
    }
  }
}
