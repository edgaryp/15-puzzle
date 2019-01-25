<template>
  <table>
    <tr v-for="(row, index) in shuffleTilesInGrid" :key="index">
      <td v-for="(tile, index) in row" :key="index">
        {{tile || ''}}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'puzzle',
  data() {
    return {

    };
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
  }
};
</script>

<style lang="less" scoped>
</style>
