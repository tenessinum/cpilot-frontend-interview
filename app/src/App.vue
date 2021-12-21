<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeMount() {
    this.$store.dispatch('loadDevices');
  },
};
</script>


<style>
#app {
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
}
</style>
