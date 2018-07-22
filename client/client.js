const prompt = require('prompt')
const config = require('config')

const Constants = require('../const')
const GameModel = require('./models/game-model')
const GameController = require('./controllers/game-controller')

prompt.message = ''
prompt.colors = false

const game = GameModel.create(config.client.playerHealth, config.client.serverUrl)
let gameController

function getUserInput () {
  prompt.get(['command'], (err, result) => {
    if (err) {
      process.exit(1) // Force exit
    }
    let command = result.command // Get command from user input
    if (command) {
      // Convert to lower case
      command = command.toLowerCase()
      if (command === 'exit') {
        // Exit with normal code
        process.exit(0)
      }
      gameController.sendCommand(command)
        .then(status => {
          if (status === Constants.STATUS_VALID_COMMAND) {
            getUserInput()
          } else if (status === Constants.STATUS_INVALID_COMMAND) {
            console.log('Invalid input, please try again')
            getUserInput()
          } else if (status === Constants.STATUS_SERVER_ERROR) {
            console.log('Game server connection error, please try again')
            getUserInput()
          } else if (status === Constants.STATUS_GAME_OVER) {
            console.log('====== Thanks for Playing ======')
            // Exit with normal code
            process.exit(0)
          }
        }).catch(error => {
          console.log('Unexpected Error', error)
          // Exit with fault code
          process.exit(1)
        })
    } else {
      getUserInput()
    }
  })
}

if (game) {
  gameController = GameController.create(game)
  if (gameController) {
    console.log('====== Game Started ======')
    console.log('Acceptable commands: North(N), South(S), East(E), West(W) and Exit')
    // Start CLI
    prompt.start()

    getUserInput()
  } else {
    // Exit with fault code
    process.exit(1)
  }
} else {
  // Exit with fault code
  process.exit(1)
}
