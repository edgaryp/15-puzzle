<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-10 offset-sm-1">
          <h1>15 Puzzle</h1>
          <div class="container">
            <div class="row">
              <Puzzle />
            </div>
            <div v-if="invalidMoveTile"  class="row">
              <AlertMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Puzzle from './components/Puzzle.vue';
import AlertMessage from './components/AlertMessage.vue';

export default {
  name: 'app',
  data() {
    return {

    };
  },
  components: {
    Puzzle,
    AlertMessage
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
      'invalidMoveTile'
    ])
  },
  methods: {
    ...mapActions([
      'createTiles'
    ])
  },
  created() {
    this.createTiles();
  }
};
</script>

<style lang="less">

#app {
  > .container {
    padding-top: 3%;
  }
}

h1 {
  text-align: center;
}

@media (max-width: 575.98px) {
  h1 {
    font-size: 1.8em !important;
  }
}
</style>
