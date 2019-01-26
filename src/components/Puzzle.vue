<template>
  <div class="puzzle-wrap col-12">
    <div v-if="!gameStart" class="overlay">
      <button type="button" class="btn btn-success btn-lg" @click="start(3)">Easy</button>
      <button type="button" class="btn btn-success btn-lg" @click="start(4)">Medium</button>
      <button type="button" class="btn btn-success btn-lg" @click="start(5)">Hard</button>
    </div>
    <div :class="`row row-${index}`" v-for="(row, index) in shuffleTilesInGrid" :key="index">
      <div class="tile" :class="{'empty': tile === 0}" v-for="(tile, index) in row" :key="index" :style="{ width: 100 / puzzleDimension + '%', paddingTop: 100 / puzzleDimension + '%' }" @click="tileClick(tile)">
        <div>
          {{tile || ''}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'puzzle',
  data() {
    return {
      gameStart: false
    };
  },
  computed: {
    ...mapState([
      'puzzleDimension',
      'tiles',
      'targetTile'
    ]),
    ...mapGetters([
      'totalTilesCount',
      'shuffleTilesInGrid',
      'targetTileNeighbors',
      'invalidMoveTile'
    ])
  },
  methods: {
    ...mapMutations([
      'setTargetTile',
      'setRandomiseTiles'
    ]),
    ...mapActions([
      'updateTiles',
      'createTiles'
    ]),
    start(difficulty) {
      this.createTiles(difficulty);
      this.gameStart = !this.gameStart;
    },
    tileClick(tile) {
      if (tile) {
        this.setTargetTile(tile);
        this.updateTiles(tile);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.puzzle-wrap {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    .btn {
      margin: 10px;
      @media (max-width: 575.98px) {
        font-size: 1em !important;
      }
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .tile {
    position: relative;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f74902;
      border: 2px solid white;
      color: white;
      font-size: 2.5em;
      @media (max-width: 575.98px) {
        font-size: 1.7em;
      }
    }
    &.empty div {
      background-color: white;
    }
    &:not(.empty) {
      cursor: pointer;
    }
  }
  .label {
    color: white;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 102px;
  }
}
</style>
