import { isIntegerKey } from "@vue/shared";
import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      username: String,
      email: String,
      id: Number,
      role: String,
      token: String
    } 
  },
  mutations: {
    SET_USER(state, payload) {
      console.log("store", payload)
      state.user = payload
  }
  },
  getters: {
    formattedUser: state => {
        return `${state.user.username}-${state.user.id}-${state.user.email}`
    }
},
  actions: {
      
  }
});