<template>
  <div>
    <div class="form-group">
      <label for="titleInput">Title</label>
      <input type="text" class="form-control" id="titleInput" v-model="titleInput" required>
    </div>
    <div class="form-group">
      <label for="descriptionInput">Question</label>
      <textarea
        class="form-control"
        id="descriptionInput"
        rows="3"
        v-model="descriptionInput"
        required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="tagsInput">Comma separated tags</label>
      <input type="text" class="form-control" id="tagsInput" v-model="tagsInput" required>
    </div>
    <button type="button" class="btn btn-primary" @click="updateQuestion()">Save</button>
    <button type="button" class="btn btn-primary" @click="$emit('edit-form-shown',false)">Cancel</button>
  </div>
</template>

<script>

export default {
  props: ["question"],
  created() {},
  data() {
    return {
      titleInput: this.question.title,
      descriptionInput: this.question.description,
      tagsInput: this.question.tags.join(",")
    };
  },
  methods: {
    async updateQuestion() {
      try {
        let data = {
          title: this.titleInput,
          description: this.descriptionInput,
          tags: this.tagsInput
        };
        let questionData = await axios({
          baseURL,
          url: "/api/questions/" + this.question._id,
          method: "PUT",
          headers: { token },
          data
        });
        this.$emit("get-questions", null);
        this.$emit("edit-form-shown", false);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
