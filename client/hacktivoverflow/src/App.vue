<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Mini Overflow</h1>
        </div>
        <div class="col">
          <div v-if="isLoggedIn">
            {{userName}} ({{userEmail}})
            <button class="btn btn-primary" @click="signOut()">Logout</button>
          </div>
          <div v-if="!isLoggedIn">
            <router-link to="/loginregister">
              <button class="btn btn-primary">Login/Register</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="container">
      <div id="googleSigninButton2" class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("loginCheck");
  },
  computed: {
    ...mapState(["userId", "userName", "userEmail", "isLoggedIn"])
  },
  methods: {
    signOut() {
      signOut();
    }
  }
};
</script>


<style>
</style>
