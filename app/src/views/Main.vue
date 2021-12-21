<template>
  <div class="device_container">
    <h4>Список устройств</h4>
    <div v-if="this.$store.getters.getDeviceError">
      загрузить не удалось (но я пытаюсь)<br/>
      проверьте ссылки или сервер
    </div>
    <div v-else id="device_list">
      <Device
        v-for="device in this.$store.getters.getDevices"
        v-bind:id="device.id"
        v-bind:name="device.name"
        :key="device.id"
      ></Device>
    </div>
  </div>
</template>

<script>
import Device from "../components/Device-component.vue";

export default {
  name: "Main",
  components: {
    Device,
  },
  beforeMount() {
    this.$store.dispatch("wsDisconnect");
  },
};
</script>

<style>
html {
  padding: 0;
}

.device_container {
  margin: 30px;
}

#device_list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

@media screen and (min-width: 800px) {
  #device_list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
  }
}

@media screen and (max-width: 799px) {
  .device_container > h4 {
    text-align: center;
  }

  .device_container > div {
    text-align: center;
  }
}
</style>
