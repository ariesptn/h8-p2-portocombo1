import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userEmail: '',
    isLoggedIn: false,
  },
  mutations: {
    displayError: function (state, error) {
      let errorMessage = ''
      if (error.response) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "" + JSON.stringify(error, null, 2) + "";
      }
      swal(errorMessage)
      console.log(error)
    },
    loginCheck(state) {
      if (loginDetails.status) {
        state.userName = loginDetails.response.name;
        state.userEmail = loginDetails.response.email;
        state.isLoggedIn = true;
      } else {
        state.userName = "";
        state.userEmail = "";
        state.isLoggedIn = false;
      }
    },
  },
  actions: {
    loginCheck({ commit, state }, payload) {
      loginDetails.listener = () => {
        commit('loginCheck')
        if (!loginDetails.status) {
          commit('displayError', loginDetails.response);
        }
      };
    },
  }
})
