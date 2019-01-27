import Vue from 'vue';
import Vuex from 'vuex';
import Tile from './helpers/tile';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    puzzleDimension: 4,
    tiles: null,
    targetTile: null,
    gameStart: false,
    invalidMove: false,
    victory: false,
  },
  getters: {
    shuffleTilesInGrid(state) {
      const tiles = state.tiles.map((tile) => {
        const tileClass = new Tile(tile, state.tiles, state.puzzleDimension);
        return tileClass.getTile();
      });
      /**
       * Divide tiles in grid, this will make it easy for mockup the tiles and swaping tiles.
       */
      const shuffleTilesInGrid = [];
      for (let i = 0; i < state.puzzleDimension; i += 1) {
        shuffleTilesInGrid.push(tiles.splice(0, state.puzzleDimension));
      }
      return shuffleTilesInGrid;
    },
    checkVictory(state) {
      const tiles = state.tiles.slice(0, -1);
      return tiles.every((tile, index) => tile - index === 1) && state.tiles[state.tiles.length - 1] === 0;
    },
  },
  mutations: {
    createTiles(state, init) {
      const tiles = [];
      for (let i = 0; i < state.puzzleDimension ** 2; i += 1) {
        tiles.push(i);
      }
      if (init) {
        /**
         * Sort tiles in vicotry state when initial load. [1, 2, 3, 4, .... , 0]
         *
         * Compare `a` and `b` in 3 cases and use logical operator to define which case to return.
         * First truthy value (1 and -1) will be applied, hence checking if either a or b is 0 in first step.
         *
         * 1. Check if either `a` or `b` is 0 then minus the boolean values (true/false) to get number in 0, 1 or -1.
         * Both 1 and -1 are truthy value, 0 is false value.
         *
         * 2. Check if `a` greater than `b` then add + operators to return boolean value true in number 1.
         *
         * 3. Check if `a` greater than `b` then add - operators to return boolean value true in number -1.
         *
         * 4. The false value (0) will be skipped. The first truthy vale will be returned.
         */
        state.tiles = tiles.sort((a, b) => (a === 0) - (b === 0) || +(a > b) || -(a < b));
      } else {
        state.tiles = tiles.sort(() => Math.random() - 0.5);
      }
    },
    startPuzzle(state, difficulty) {
      state.puzzleDimension = difficulty;
      state.gameStart = true;
    },
    updateTiles(state, tile) {
      const { top, right, bottom, left } = tile.neighbors;
      const { label, index } = tile;
      const tiles = [...state.tiles];
      /**
       * Replace the target tile's index position wtih the empty space neighbour's position.
       *
       * Because columns and rows are divided evenly, so I use this logic to swap the tile.
       * For example, in medium mode, the grid is 4 by 4, so top empty space will be always 4 indexes behind current tile in tiles array.
       */
      if (tile.movement) {
        if (top === 'empty') {
          tiles[index - state.puzzleDimension] = label;
          tiles[index] = 0;
        } else if (right === 'empty') {
          tiles[index + 1] = label;
          tiles[index] = 0;
        } else if (bottom === 'empty') {
          tiles[index + state.puzzleDimension] = label;
          tiles[index] = 0;
        } else if (left === 'empty') {
          tiles[index - 1] = label;
          tiles[index] = 0;
        }
        // Use spread operator to assign entire array so Vue can detect that changes
        state.tiles = [...tiles];
        state.invalidMove = false;
      } else {
        state.invalidMove = tile;
      }
    },
  },
});
