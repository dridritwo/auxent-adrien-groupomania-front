import { createStore } from "vuex";

export const store = createStore({
  state: {
    user: null 
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
  }
  },
  getters: {
    formattedUser: state => {
        return `${state.user.username}-${state.user.id}-${state.user.email}`
    },
    userToken: state => {
      return state.user.token;
    }
},
  actions: {
      
  }
});

export default store;