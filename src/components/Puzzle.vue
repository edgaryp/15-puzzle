<template>
  <div class="puzzle-wrap col-12">
    <div v-if="checkVictory" class="victory overlay">
      <h1>You're awesome!!</h1>
      <h4>Play again?</h4>
      <div>
        <PlayButtons />
      </div>
    </div>
    <div v-if="!gameStart" class="overlay">
      <PlayButtons />
    </div>
    <div :class="`row row-${index}`" v-for="(row, index) in shuffleTilesInGrid" :key="index">
      <div class="tile" :class="{'empty': tile.label === 0}" v-for="(tile, index) in row" :key="index" :style="{ width: 100 / puzzleDimension + '%', paddingTop: 100 / puzzleDimension + '%', cursor: tile.movement ? 'pointer' : 'default' }" @click="moveTile(tile)">
        <div>
          <p>{{tile.label || ''}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import PlayButtons from './PlayButtons.vue';

export default {
  name: 'puzzle',
  components: {
    PlayButtons
  },
  computed: {
    ...mapState([
      'puzzleDimension',
      'tiles',
      'targetTile',
      'gameStart'
    ]),
    ...mapGetters([
      'shuffleTilesInGrid',
      'checkVictory'
    ])
  },
  methods: {
    ...mapMutations([
      'updateTiles'
    ]),
    moveTile(tile) {
      this.updateTiles(tile);
    }
  }
};
</script>

<style lang="less" scoped>
.puzzle-wrap {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 2px solid #cacaca;
  padding-top: 5px !important;
  padding-bottom: 5px;
  padding-right: 20px;
  padding-left: 20px;
  .victory {
    flex-direction: column;
    h1 {
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
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
