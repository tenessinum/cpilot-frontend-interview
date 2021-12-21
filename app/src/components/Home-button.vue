<template>
  <div class="home">
    <router-link :to="{ name: 'Main' }">
      <img :src="require('../assets/home.png')" alt="" />
    </router-link>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home {
  display: flex;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 7px rgba(34, 60, 80, 0.2);
  margin: 10px;
  width: 470px;
  align-items: center;
  flex-direction: row;
}

.home img {
  height: 40px;
}

.home > div {
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
}
</style>