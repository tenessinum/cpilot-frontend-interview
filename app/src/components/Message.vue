<template>
  <div class="message">
    <div class="message-header">
      <img :src="icon" alt="" />
      <div class="message-title">
        {{ title }}
      </div>
      <img
        :style="{ transform: rotation }"
        id="toggle_button"
        v-on:click="toggle()"
        :src="require('../assets/down_arrow.png')"
        alt=""
      />
    </div>
    <div v-if="this.toggled" class="content">
      <div v-for="(item, key) in payload" :key="key">{{ key }}: {{ item }}</div>
    </div>
  </div>
</template>

<script>
import info_image from "../assets/info.png";
import error_image from "../assets/error.png";
import warning_image from "../assets/warning.png";
import qmark_image from "../assets/qmark.png";

export default {
  name: "Message",
  data() {
    return {
      icon: qmark_image,
      toggled: false,
      rotation: "rotate(0deg)",
    };
  },
  props: {
    title: String,
    payload: Object,
    event_type: String,
  },
  beforeMount() {
    switch (this.event_type) {
      case "INFO":
        this.icon = info_image;
        break;
      case "ERROR":
        this.icon = error_image;
        break;
      case "WARNING":
        this.icon = warning_image;
        break;
    }
  },
  methods: {
    toggle() {
      if (this.toggled) {
        this.rotation = "rotate(0deg)";
      } else {
        this.rotation = "rotate(180deg)";
      }
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style>
.content {
  font-size: 20px;
  padding: 10px;
  background: #fafafa;
  border-radius: 0 0 10px 10px;
}

.message-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 15px;
}

.message-header > img {
  height: 30px;
}

.message {
  box-shadow: 0px 0px 10px 7px rgba(34, 60, 80, 0.2);
  margin: 15px;
  border-radius: 10px;
  width: 500px;
}

#toggle_button {
  cursor: pointer;
}
</style>