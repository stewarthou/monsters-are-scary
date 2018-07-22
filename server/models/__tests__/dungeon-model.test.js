/* globals describe, it, before */
/* eslint no-unused-expressions: 0 */

const chai = require('chai')
const expect = chai.expect
const config = require('config')

const Constants = require('../../../const')
const DungeonModel = require('../dungeon-model')

const VALID_MAP_SIZE_X = config.server.dungeon.sizeX
const VALID_MAP_SIZE_Y = config.server.dungeon.sizeY
const VALID_DUNGEON_DIFFICULTY = config.server.dungeon.difficulty

const INVALID_MAP_SIZE_X = 1
const INVALID_MAP_SIZE_Y = 1
const INVALID_DUNGEON_DIFFICULTY = 10

describe('dungeon-model tests', () => {
  it('should have correct config for testing environment', () => {
    expect(VALID_MAP_SIZE_X).to.equal(4)
    expect(VALID_MAP_SIZE_Y).to.equal(4)
    expect(VALID_DUNGEON_DIFFICULTY).to.equal(2)
  })
  describe('Module structure tests', () => {
    it('should have private function _generateMap(sizeX, sizeY, difficulty)', () => {
      expect(DungeonModel._private.generateMap, 'Im too lazy to implement this function').to.exist
    })
    it('should have creating function create(mapSizeX, mapSizeY, difficulty)', () => {
      expect(DungeonModel.create, 'Im too lazy to implement this function').to.exist
    })
  })
  describe('Private functions tests', () => {
    describe('_generateMap(sizeX, sizeY, difficulty)', () => {
      let dungeonMap
      let invalidDungeonMap
      before(() => {
        // A map is an object looks like below
        // The key is constructed with template 'x,y'
        // The value is either DUNGEON_ROOM_EMPTY, DUNGEON_ROOM_WITH_MONSTER or DUNGEON_ROOM_WITH_GOLD

        dungeonMap = DungeonModel._private.generateMap(VALID_MAP_SIZE_X, VALID_MAP_SIZE_Y, VALID_DUNGEON_DIFFICULTY)

        // Map should have size larger than 1 x 1
        // Valid difficulty is 1, 2 or 3
        invalidDungeonMap = DungeonModel._private.generateMap(INVALID_MAP_SIZE_X, INVALID_MAP_SIZE_Y, INVALID_DUNGEON_DIFFICULTY)
      })
      it('should create a valid Map object for valid parameters', () => {
        expect(dungeonMap, 'Map object should be created').to.exist

        expect(Object.keys(dungeonMap).length, 'Map should have 16 rooms').to.equal(16)

        const emptyRoom = dungeonMap['0,0']
        expect(emptyRoom, 'Map should have an empty room at 0,0').to.equal(Constants.DUNGEON_ROOM_EMPTY)

        let numberOfMonsters = 0
        let numberOfGold = 0
        for (var key in dungeonMap) {
          if (key !== '0,0') {
            if (dungeonMap[key] === Constants.DUNGEON_ROOM_WITH_MONSTER) {
              numberOfMonsters++
            } else if (dungeonMap[key] === Constants.DUNGEON_ROOM_WITH_GOLD) {
              numberOfGold++
            }
          }
        }
        expect(numberOfMonsters + numberOfGold, 'Map should have 15 rooms (Except 0,0) with Monsters or Gold').to.equal(15)
      })
      it('should NOT create a Map object for invalid parameters', () => {
        expect(invalidDungeonMap, 'Map with invalid parameters should NOT be created').to.not.exist
      })
    })
  })
  describe('dungeon object creating function tests', () => {
    let dungeon
    before(() => {
      // A dungeon is an object looks like below
      // getRoomContent() function will return 4 different values (as shown below) depends on x and y

      dungeon = DungeonModel.create(VALID_MAP_SIZE_X, VALID_MAP_SIZE_Y, VALID_DUNGEON_DIFFICULTY)
    })
    it('should create a valid Dungeon object for valid parameters', () => {
      expect(dungeon, 'Dungeon object should be created').to.exist

      expect(dungeon.getRoomContent, 'Dungeon object should have a function getRoomContent(x, y)').to.exist

      const emptyRoomContent = dungeon.getRoomContent(0, 0)
      expect(emptyRoomContent, 'getRoomContent() should return Empty room with 0,0').to.equal(Constants.DUNGEON_ROOM_EMPTY)

      const validRoomContent = dungeon.getRoomContent(1, 1)
      const isValidRoomContentEitherMonsterOrGold = (validRoomContent === Constants.DUNGEON_ROOM_WITH_MONSTER) || (validRoomContent === Constants.DUNGEON_ROOM_WITH_GOLD)
      expect(isValidRoomContentEitherMonsterOrGold, 'getRoomContent() should return Monster or Gold with valid x,y').to.be.true

      const invalidRoomContent = dungeon.getRoomContent(5, 5)
      expect(invalidRoomContent, 'getRoomContent() should return undefined with invalid x,y').to.be.undefined
    })
  })
})
