<template>
  <div id="app">
    <pressure-canvas></pressure-canvas>
  </div>
</template>

<script>
import PressureCanvas from './components/PressureCanvas.vue';

export default {
  name: 'app',
  components: {
    PressureCanvas,
  },
};
</script>

<style lang="scss">
#app {
  margin-top: 60px;
}
</style>
