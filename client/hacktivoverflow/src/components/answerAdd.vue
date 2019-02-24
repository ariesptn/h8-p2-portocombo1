<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-2">
        <h2 class="d-flex align-items-center justify-content-center flex-column">Add answer</h2>
      </div>
      <div class="col-sm-10">
        <div>
          <div class="form-group">
            <label for="descriptionInput">Answer</label>
            <textarea
              class="form-control"
              id="descriptionInput"
              rows="3"
              v-model="descriptionInput"
              required
            ></textarea>
          </div>
          <button type="button" class="btn btn-primary" @click="addAnswer()">Answer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ["question"],
  data() {
    return {
      descriptionInput: ""
    };
  },
  methods: {
    async addAnswer() {
      try {
        let data = {
          description: this.descriptionInput,
          questionId: this.question._id
        };
        let questionData = await axios({
          baseURL,
          url: "/api/answers",
          method: "POST",
          headers: { token },
          data
        });
        this.$emit("get-answers", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
