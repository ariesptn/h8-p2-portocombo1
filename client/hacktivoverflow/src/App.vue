<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <router-link to="/">
            <h1>Mini Overflow</h1>
          </router-link>
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
      <div class="row">
        <div class="col-9">
          <watched-tags v-if="isLoggedIn"></watched-tags>
        </div>
        <div class="col-3">
          <search-input></search-input>
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
import WatchedTags from "@/components/watchedTags.vue";
import SearchInput from "@/components/searchInput.vue";

export default {
  data() {
    return {};
  },
  components: {
    WatchedTags,
    SearchInput
  },
  created() {
    this.$store.dispatch("loginCheck");
    this.$store.dispatch("getWatchedTags");
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
