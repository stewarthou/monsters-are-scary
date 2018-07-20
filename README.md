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

* Players are not allowed to go outside of dungeons, they will hit walls if they try, the only way out is death.
* Every time a player visits a room, the client will save a progress as this player has visited that room. Thus when this player goes back to previous visited rooms, the player does not need to kill monsters or collect gold again.
