<template>
  <router-link class="device" :to="{ name: 'Device', hash: '#' + this.id }">
    <div class="id">
      {{ id }}
    </div>
    <div class="name">
      {{ name }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Device",
  props: {
    id: Number,
    name: String,
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}

.device {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  cursor: pointer;
  transition: 0.5s;
  width: 100%;
}

.name {
  text-align: center;
  width: 100%;
}

@media screen and (max-width: 799px) {
  .device {
    border-bottom: solid;
  }
}

@media screen and (min-width: 800px) {
  .device {
    flex-direction: column;
    width: fit-content;
    box-shadow: 0px 0px 10px 7px rgba(34, 60, 80, 0.2);
    margin: 15px;
    border-radius: 10px;
  }

  .device:hover {
    margin: 10px;
    padding: 25px;
    transition: 0.5s;
  }

  .device .name {
    width: fit-content;
    min-width: 0;
  }
}
</style>