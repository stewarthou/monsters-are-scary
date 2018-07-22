const Constants = require('../const')

module.exports = {
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    dungeon: {
      sizeX: parseInt(process.env.SERVER_DUNGEON_MAP_SIZE_X, 10) || Constants.SERVER_DUNGEON_DEFAULT_SIZE_X,
      sizeY: parseInt(process.env.SERVER_DUNGEON_MAP_SIZE_Y, 10) || Constants.SERVER_DUNGEON_DEFAULT_SIZE_Y,
      difficulty: parseInt(process.env.SERVER_DUNGEON_DIFFICULTY, 10) || Constants.SERVER_DUNGEON_DEFAULT_DIFFICULTY
    }
  },
  client: {
    serverUrl: process.env.CLIENT_SERVER_URL || 'http://localhost:3000',
    playerHealth: parseInt(process.env.CLIENT_PLAYER_HEALTH, 10) || 5 // Default 5 health
  }
}
