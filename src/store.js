// /* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    puzzleDimension: 4
  },
  getters: {
    totalTilesCount(state) {
      return state.puzzleDimension ** 2;
    },
    tiles(state, getters) {
      const tiles = [];
      for (let i = 0; i <= getters.totalTilesCount; i += 1) {
        tiles.push(i);
      }
      return tiles.sort(() => { return Math.random() - 0.5; });
    },
    shuffleTilesInGrid(state, getters) {
      const tilesInGrid = [];
      const tiles = [...getters.tiles];
      for (let j = 0; j < state.puzzleDimension; j += 1) {
        tilesInGrid.push(tiles.splice(0, state.puzzleDimension));
      }
      return tilesInGrid;
    }
  },
  mutations: {

  },
  actions: {

  }
});
