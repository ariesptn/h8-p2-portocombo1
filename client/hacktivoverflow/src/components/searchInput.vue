<template>
  <div>
    <form @submit.prevent="search()">
      Search :
      <input type="text" v-model="searchInput">
      <input type="submit" value="Search">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: ""
    };
  },
  methods: {
    search() {
      this.$store.commit("searchByQuery", this.searchInput);
    }
  }
};
</script>
