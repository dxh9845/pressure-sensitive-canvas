<template>
  <div id="app">
    <pressure-canvas></pressure-canvas>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import PressureCanvas from './components/PressureCanvas.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    PressureCanvas,
  },
};
</script>

<style lang="scss">
#app {
  margin-top: 60px;
}
</style>
