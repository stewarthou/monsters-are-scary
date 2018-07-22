// Using number to indicate the content in a room
const DUNGEON_ROOM_EMPTY = 0
const DUNGEON_ROOM_WITH_MONSTER = 1
const DUNGEON_ROOM_WITH_GOLD = 2

// Using number to indicate dungeon difficulties
const DUNGEON_DIFFICULTY_EASY = 1
const DUNGEON_DIFFICULTY_MEDIUM = 2
const DUNGEON_DIFFICULTY_HIGH = 3

// Default dungeon map sizes
const DUNGEON_DEFAULT_SIZE_X = 8
const DUNGEON_DEFAULT_SIZE_Y = 8

const DUNGEON_ROOM_WITH_MONSTER_STRING = 'MONSTER'
const DUNGEON_ROOM_WITH_GOLD_STRING = 'GOLD'

// Directions

const [EAST, NORTH, WEST, SOUTH] = ['EAST', 'NORTH', 'WEST', 'SOUTH']

// Status code for game controller
const [VALID_COMMAND, INVALID_COMMAND, PLAYER_DIED] = [1, 2, 3]

module.exports = {
  /**
   * Default dungeon map size X
   */
  SERVER_DUNGEON_DEFAULT_SIZE_X: DUNGEON_DEFAULT_SIZE_X,
  /**
   * Default dungeon map size Y
   */
  SERVER_DUNGEON_DEFAULT_SIZE_Y: DUNGEON_DEFAULT_SIZE_Y,
  /**
   * Dungeon difficulty EASY
   */
  SERVER_DUNGEON_DIFFICULTY_EASY: DUNGEON_DIFFICULTY_EASY,
  /**
   * Dungeon difficulty MEDUIM
   */
  SERVER_DUNGEON_DIFFICULTY_MEDIUM: DUNGEON_DIFFICULTY_MEDIUM,
  /**
   * Dungeon difficulty HIGH
   */
  SERVER_DUNGEON_DIFFICULTY_HIGH: DUNGEON_DIFFICULTY_HIGH,
  /**
   * Default dungeon difficulty
   */
  SERVER_DUNGEON_DEFAULT_DIFFICULTY: DUNGEON_DIFFICULTY_MEDIUM,
  /**
   * Dungeon room EMPTY
   */
  DUNGEON_ROOM_EMPTY: DUNGEON_ROOM_EMPTY,
  /**
   * Dungeon room MONSTER
   */
  DUNGEON_ROOM_WITH_MONSTER: DUNGEON_ROOM_WITH_MONSTER,
  /**
   * Dungeon room GOLD
   */
  DUNGEON_ROOM_WITH_GOLD: DUNGEON_ROOM_WITH_GOLD,
  /**
   * Dungeon room MONSTER in String
   */
  DUNGEON_ROOM_WITH_MONSTER_STRING: DUNGEON_ROOM_WITH_MONSTER_STRING,
  /**
   * Dungeon room GOLD in String
   */
  DUNGEON_ROOM_WITH_GOLD_STRING: DUNGEON_ROOM_WITH_GOLD_STRING,
  /**
   * Direction EAST
   */
  DIRECTION_EAST: EAST,
  /**
   * Direction NORTH
   */
  DIRECTION_NORTH: NORTH,
  /**
   * Direction WEST
   */
  DIRECTION_WEST: WEST,
  /**
   * Direction SOUTH
   */
  DIRECTION_SOUTH: SOUTH,
  /**
   * Controller status: valid command received
   */
  STATUS_VALID_COMMAND: VALID_COMMAND,
  /**
   * Controller status: invalid command received
   */
  STATUS_INVALID_COMMAND: INVALID_COMMAND,
  /**
   * Controller status: game over
   */
  STATUS_GAME_OVER: PLAYER_DIED
}
