<template>
  <div class="alert alert-primary col-12" role="alert">
    Tile {{invalidMove.label}} can't move
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'alert-message',
  computed: {
    ...mapState([
      'invalidMove'
    ])
  }
};
</script>
