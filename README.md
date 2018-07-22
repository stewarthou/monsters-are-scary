# Monsters Are Scary
**The most addictive text based multiplayer adventure game in Github.**

Monsters Are Scary is a text adventure game requiring the player to crawl through a dungeon fighting monsters and collecting gold.

# Game Server Highlights

To make sure the dungeon is challenging but rewardable, every time a server starts, it will create a random map, but will not change during that session.

* For each game server session, room X Y will always be GOLD or MONSTER no matter how many time players visit it.
* Game masters will be able to set the map size. Default size: 8 x 8
* GM will be able to set the difficulty when starting the server. Default difficulty: Medium
  * Easy: Each room has 25% of possibility of swarming a Monster. (otherwise Gold)
  * Medium: 50% Monsters
  * Hard: 75% Monsters

* For an 8 x 8 size map, there will be 63 rooms with either Monsters or Gold, room 0,0 is the start room, which contains nothing.


# Game Client Design Highlights

To make sure we can cheat in the game when we challenge friends, the number of player health and game progress are saved on client side. :-)

* Players are not allowed to go outside of dungeons, they will hit walls if they try, the only way out is death or give up.
* Every time a player visits a room, the client will save a progress as this player has visited that room. Thus when this player goes back to previous visited rooms, the player does not need to kill monsters or collect gold again.

# Technical Highlights

* TDD is involved

  * Unit tests were written before implementation of function codes
  * As shown in git history

* Using BDD as the style for unit tests

  * So the unit tests descript the behaviours of function codes

* `node-config` is used to provide easy configuration management for different environment and mapping of environment variables

* `node-fetch` is used to provide the similar HTTP client experience as Google Chrome fetch utility.

* `prompt` is a easy-to-use CLI library

* Both game server and client are configurable via environment variables
  * Server
    * `SERVER_DUNGEON_MAP_SIZE_X` | map size X
    * `SERVER_DUNGEON_MAP_SIZE_Y` | map size Y
    * `SERVER_DUNGEON_DIFFICULTY` | dungeon difficulty, 1, 2 or 3
  * Client
    * `CLIENT_PLAYER_HEALTH` | Player start health


# How to Play

Install node v8

Install node packages

```
npm install
```

Start game server

```
npm run start-server
```

Open another terminal, start game client

```
npm run start-client
```

Enjoy!

# How to Test

JS Lint using Standard https://standardjs.com/

```
npm run lint
```

Test using mocha https://mochajs.org/

```
npm test
```

Generate test coverage report using istanbul https://istanbul.js.org/

```
npm run test-cover
```

After generating report, host coverage report on a HTTP server
```
npm run coverage-http
```


# Project Files

* `package.json`
* `package-lock.json` | Dependency tree
* `.gitignore`
* `/test`
  * `mocha.opts` | Mocha configuration file
* `/config`
  * `default.json` | Default configuration file
  * `test.js` | configuration for tests
* `const.js` | Contains global constant variables
* `/server`
  * `server.js` | Game server main file
  * `/models`
    * `dungeon-model.js` | Dungeon model
    * `/__tests__`
      * `dungeon-model.test.js` | Test for dungeon-model.js
  * `/controllers`
    * `dungeon-controller.js` | API controller for dungeon
    * `/__tests__`
      * `dungeon-controller.tests.js` | Tests for dungeon-controller.js
* `/client`
  * `client.js` | Game client main file
  * `/models`
    * `game-model.js` | Game client model
    * `/__tests__`
      * `game-model.test.js` | Test for game-model.js
  * `/controllers`
    * `game-controller.js` | Game controller
    * `/__tests__`
      * `game-controller.test.js` | Test for game-model.js
