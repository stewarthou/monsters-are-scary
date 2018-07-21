const express = require('express')
const app = express()
const config = require('config')

const DungeonController = require('./controllers/dungeon-controller')

// Creating controllers
const dungeonController = DungeonController.create(config)

if (dungeonController) {
  // Register controllers
  app.get('/room/:x/:y', dungeonController.getRoom)

  // Start server
  app.listen(config.server.port)

  console.log('Server started on port:', config.server.port)
} else {
  console.error('Failed to create dungeon controller, exiting...')
  // Exit with fault code
  process.exit(1)
}
