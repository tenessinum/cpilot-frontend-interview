<template>
  <div>
    <div v-if="this.$store.getters.getDeviceError" class="message-list">
      <HomeButton><div>Ищу устройства</div></HomeButton>
    </div>
    <div v-else-if="this.device_exhists" class="message-list">
      <HomeButton>
        <div>{{ this.device.name }}</div>
      </HomeButton>
      <Message
        v-for="message in this.messages"
        :title="message.title"
        :payload="message.raw_message"
        :event_type="message.event_type"
        :key="message.message_id"
      ></Message>
    </div>
    <div v-else class="message-list">
      <HomeButton><div>Такого устройства нет</div></HomeButton>
    </div>
  </div>
</template>

<script>
import consts from "../consts";
import Message from "../components/Message";
import HomeButton from "../components/Home-button.vue";

export default {
  name: "Device",
  components: {
    Message,
    HomeButton,
  },
  data() {
    return {
      device_exhists: false,
      devices_loaded: false,
      device: null,
      connection: null,
      messages: [],
    };
  },
  methods: {
    updateDevice() {
      if (!this.$store.getters.getDeviceError) {
        let hash = this.$route.hash;
        let id = parseInt(hash.toString().slice(1));
        this.device = this.$store.getters.getDevice(id);
        this.device_exhists = this.device !== null;

        if (this.device_exhists) {
          let payload = {
            url: consts.WS_API_URL + "/ws/telemetry/" + this.device.id,
            onmessage: (event) => {
              let raw_message = JSON.parse(event.data);
              let message = {
                title: raw_message.message.split(" ").slice(0, 2).join(" "),
                message_id: this.messages.length,
                raw_message: raw_message,
                event_type: raw_message.event_type,
              };

              delete message.raw_message.event_type;

              this.messages.push(message);
            },
          };

          this.$store.dispatch("wsConnect", payload);
        }
      }
    },
  },
  beforeMount() {
    this.updateDevice();
  },
  computed: {
    devices() {
      return this.$store.getters.getDevices;
    },
  },
  watch: {
    devices(newDevices, oldDevices) {
      this.updateDevice();
    },
  },
};
</script>

<style>
.message-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>