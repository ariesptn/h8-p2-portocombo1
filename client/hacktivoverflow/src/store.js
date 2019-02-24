import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

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
      console.log(error)
      swal(errorMessage)
    }
  },
  actions: {

  }
})
