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
    victory: false
  },
  getters: {
    shuffleTilesInGrid(state) {
      const tiles = state.tiles.map((tile) => {
        const tileClass = new Tile(tile, state.tiles, state.puzzleDimension);
        return tileClass.getTile();
      });
      const shuffleTilesInGrid = [];
      for (let i = 0; i < state.puzzleDimension; i += 1) {
        shuffleTilesInGrid.push(tiles.splice(0, state.puzzleDimension));
      }
      return shuffleTilesInGrid;
    },
    checkVictory(state) {
      const tiles = state.tiles.slice(0, state.tiles.length - 1);
      return tiles.every((tile, index) => tile - index === 1) && state.tiles[state.tiles.length - 1] === 0;
    }
  },
  mutations: {
    createTiles(state, init) {
      const tiles = [];
      for (let i = 0; i < state.puzzleDimension ** 2; i += 1) {
        tiles.push(i);
      }
      if (init) {
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
        state.tiles = [...tiles];
        state.invalidMove = false;
      } else {
        state.invalidMove = tile;
      }
    }
  }
});
