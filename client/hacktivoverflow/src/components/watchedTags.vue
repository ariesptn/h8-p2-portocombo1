<template>
  <div>
    <span>Watched tags :</span>
    <div class="btn-group" role="group" v-for="(tag,index) in watchedTags" :key="index">
      <button class="btn btn-secondary" @click="$store.commit('searchTag',tag)">{{tag}}</button>
      <button class="btn btn-danger" @click="removeWatchedTag(tag)">-</button>
    </div>
    <span v-if="watchedTags.length===0">Click "+" button next to the tags to add them here.</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("getWatchedTags");
  },
  computed: {
    ...mapState(["watchedTags"])
  },
  methods: {
    async removeWatchedTag(tag) {
      try {
        let qaTagRequest = await axios({
          baseURL,
          url: "api/qatags/" + tag,
          method: "DELETE",
          headers: { token }
        });
        this.$store.dispatch("getWatchedTags");
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
