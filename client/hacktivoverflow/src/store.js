import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    userName: '',
    userEmail: '',
    isLoggedIn: false,
    watchedTags: [],
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
        state.userId = loginDetails.response._id
        state.userName = loginDetails.response.name;
        state.userEmail = loginDetails.response.email;
        state.isLoggedIn = true;
      } else {
        state.userId = ''
        state.userName = "";
        state.userEmail = "";
        state.isLoggedIn = false;
      }
    },
    getWatchedTags(state, payload) {
      state.watchedTags = payload.tags || []
    },
    searchTag(state, tag) {
      router.push('/tag/' + tag)
    },
    searchByQuery(state, searchQuery) {
      router.push('/search/' + searchQuery)
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
    async getWatchedTags({ commit, state }, payload) {
      try {
        let qaTagRequest = await axios({
          baseURL,
          url: "api/qatags",
          method: "GET",
          headers: { token }
        });
        commit('getWatchedTags', qaTagRequest.data || {})
      } catch (err) {
        commit("displayError", err);
      }
    }
  }
})
