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
import { updateAnswer } from "@/apis/answer.js";

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
    updateAnswer() {
      updateAnswer(this.answer.id, {
        description: this.descriptionInput,
        updatedAt: new Date()
      });
      this.$emit('edit-form-shown',false)
    }
  }
};
</script>
