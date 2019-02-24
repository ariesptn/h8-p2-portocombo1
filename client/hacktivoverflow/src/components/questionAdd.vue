<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-2">
        <h2 class="d-flex align-items-center justify-content-center flex-column">Ask something</h2>
      </div>
      <div class="col-sm-10">
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
          <button type="button" class="btn btn-primary" @click="addQuestion()">Ask</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addQuestion } from "@/apis/question.js";

export default {
  data() {
    return {
      titleInput: "",
      descriptionInput: "",
      tagsInput: ""
    };
  },
  methods: {
    async addQuestion() {
      try {
        let data = {
          title: this.titleInput,
          description: this.descriptionInput,
          tags: this.tagsInput
        };
        let questionData = await axios({
          baseURL,
          url: "/api/questions",
          method: "POST",
          headers: { token },
          data
        });
        this.$emit("get-questions", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
