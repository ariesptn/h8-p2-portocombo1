<template>
  <div>
    <div class="form-group">
      <label for="descriptionInput">Answer</label>
      <textarea class="form-control" id="descriptionInput" rows="3" v-model="descriptionInput" required></textarea>
    </div>
    <button type="button" class="btn btn-primary" @click="updateAnswer()">Save</button>
    <button type="button" class="btn btn-primary" @click="$emit('edit-form-shown',false)">Cancel</button>
  </div>
</template>

<script>

export default {
  props: ["answer"],
  created() {
  },
  data() {
    return {
      descriptionInput: this.answer.description
    };
  },
  methods: {
    async updateAnswer() {
      try {
        let data = {
          description: this.descriptionInput,
        };
        let questionData = await axios({
          baseURL,
          url: "/api/answers/" + this.answer._id,
          method: "PUT",
          headers: { token },
          data
        });
        this.$emit("get-answers", null);
        this.$emit("edit-form-shown", false);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
