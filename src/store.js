/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    puzzleDimension: 4,
    tiles: null,
    targetTile: {
      label: null,
      index: null
    }
  },
  getters: {
    totalTilesCount(state) {
      return state.puzzleDimension ** 2;
    },
    shuffleTilesInGrid(state) {
      const tiles = [...state.tiles];
      const shuffleTilesInGrid = [];
      for (let i = 0; i < state.puzzleDimension; i += 1) {
        shuffleTilesInGrid.push(tiles.splice(0, state.puzzleDimension));
      }
      return shuffleTilesInGrid;
    },
    targetTileNeighbors(state) {
      const { index } = state.targetTile;
      const { puzzleDimension } = state;
      if (state.targetTile.label) {
        return {
          self: state.tiles[index],
          top: state.tiles[index - puzzleDimension] === 0 ? 'empty' : null,
          right: index % puzzleDimension !== 3 ? state.tiles[index + 1] || 'empty' : null,
          bottom: state.tiles[index + puzzleDimension] === 0 ? 'empty' : null,
          left: index % puzzleDimension ? state.tiles[index - 1] || 'empty' : null
        };
      } else {
        return null;
      }
    },
    invalidMoveTile(state, getters) {
      return (getters.targetTileNeighbors && getters.targetTileNeighbors.self !== 0) && true;
    }
  },
  mutations: {
    setRandomiseTiles(state, difficulty) {
      state.puzzleDimension = difficulty;
    },
    setTiles(state, tiles) {
      state.tiles = [...tiles];
    },
    setTargetTile(state, tile) {
      state.targetTile.label = tile;
      state.targetTile.index = state.tiles.indexOf(tile);
    },
    setUpdateTiles(state, data) {
      const { self, top, right, bottom, left } = data.targetTileNeighbors;
      const { index, label } = state.targetTile;
      const tiles = [...state.tiles];
      if (label > 0) {
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
      }
    }
  },
  actions: {
    createTiles({ commit, getters }, difficulty) {
      const tiles = [];
      const tilesCount = difficulty ** 2 || getters.totalTilesCount;
      for (let i = 0; i < tilesCount; i += 1) {
        tiles.push(i);
      }
      if (difficulty) {
        commit('setRandomiseTiles', difficulty);
        commit('setTiles', tiles.sort(() => Math.random() - 0.5));
      } else {
        commit('setTiles', tiles.sort((a, b) => (a===0)-(b===0) || +(a>b) || -(a<b)));
      }
    },
    updateTiles({ commit, getters }, tile) {
      const { targetTileNeighbors } = getters;
      commit('setUpdateTiles', { targetTileNeighbors, tile });
    }
  }
});
