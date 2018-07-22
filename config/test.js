const Constants = require('../const')

module.exports = {
  server: {
    dungeon: {
      sizeX: 4,
      sizeY: 4,
      difficulty: Constants.SERVER_DUNGEON_DEFAULT_DIFFICULTY
    }
  },
  client: {
    serverUrl: 'http://yourstubserver',
    playerHealth: 5
  }
}
