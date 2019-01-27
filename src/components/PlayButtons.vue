<template>
  <div>
    <button type="button" class="btn btn-success btn-lg" @click="start(3)">Easy</button>
    <button type="button" class="btn btn-success btn-lg" @click="start(4)">Medium</button>
    <button type="button" class="btn btn-success btn-lg" @click="start(5)">Hard</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'play-buttons',
  methods: {
    ...mapMutations([
      'startPuzzle',
      'createTiles',
    ]),
    start(difficulty) {
      this.startPuzzle(difficulty);
      this.createTiles();
    },
  },
};
</script>

<style lang="less" scoped>
  .btn {
    margin: 10px;
    @media (max-width: 575.98px) {
      font-size: 1em !important;
    }
  }
</style>
