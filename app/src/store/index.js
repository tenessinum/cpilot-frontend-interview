import Vue from 'vue'
import Vuex from 'vuex'
import consts from '../consts'

Vue.use(Vuex)

function deviceRequest(commit) {
    fetch(consts.API_URL + "/devices")
    .then((resp) => resp.json())
    .then((data) => {
        commit('SET_DEVICES', data);
        commit('SET_DEVICE_LOAD_ERROR', false);
    })
    .catch((error) => {
        commit('SET_DEVICES', null);
        commit('SET_DEVICE_LOAD_ERROR', true);
        setTimeout(deviceRequest, 3000, commit);
    });
}

export default new Vuex.Store({
    state: {
        devices: null,
        device_load_error: true,
        ws: null,
    },
    getters: {
        getWS(state) {
            return state.ws
        },
        getDevices(state) {
            return state.devices
        },
        getDevice: (state) => (id) => {
            if (state.devices !== null) {
                for (let i = 0; i < state.devices.length; i++)
                    if (state.devices[i].id === id)
                        return state.devices[i]
            }
            return null
        },
        getDeviceError(state) {
            return state.device_load_error
        }
    },
    mutations: {
        SET_DEVICES(state, payload) {
            state.devices = payload;
        },
        SET_WS(state, payload) {
            state.ws = payload;
        },
        SET_DEVICE_LOAD_ERROR(state, payload) {
            state.device_load_error = payload;
        }
    },
    actions: {
        wsConnect({ commit }, payload) {
            let ws = new WebSocket(payload.url);
            ws.onmessage = payload.onmessage;
            commit('SET_WS', ws);
        },
        wsDisconnect() {
            if (this.state.ws)
                this.state.ws.close();
        },
        loadDevices({ commit }) {
            if (!this.getDevices) {
                deviceRequest(commit)
            }
        }
    }
})