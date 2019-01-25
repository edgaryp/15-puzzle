<template>
  <div id="app">
    <Puzzle />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Puzzle from './components/Puzzle.vue';

export default {
  name: 'app',
  data() {
    return {

    };
  },
  components: {
    Puzzle
  },
  computed: {
    ...mapState([
      'puzzleDimension'
    ]),
    ...mapGetters([
      'totalTilesCount',
      'tiles',
      'shuffleTilesInGrid'
    ])
  },
  methods: {
    ...mapActions([

    ])
  },
  created() {

  }
};
</script>

<style lang="less">

</style>
