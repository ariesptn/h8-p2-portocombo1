<template>
  <div>
    <form class="form-row" @submit.prevent="search()">
      <input
        type="text"
        class="form-control col-10"
        placeholder="Search"
        id="searchInput"
        v-model="searchInput"
      >
      <input type="submit" class="btn btn-primary form-control col-2" value="🔍">
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
