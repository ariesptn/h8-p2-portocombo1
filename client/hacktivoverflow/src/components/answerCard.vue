<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-2">
        <div class="d-flex align-items-center justify-content-center flex-column">
          <button class="btn btn-success" @click="upvote()">⇧</button>
          <h1>{{answer.vote}}</h1>
          <button class="btn btn-danger" @click="downvote()">⇩</button>
        </div>
      </div>
      <div class="col-sm-10">
        <div class="card-body">
          <p class="card-text">{{answer.description}}</p>
          <p
            class="card-text"
          >By : {{answer.user.name}} | Created at : {{answer.createdAt}} | Updated at : {{answer.updatedAt}}</p>
          <div>
            <button class="btn btn-primary" @click="editFormShown=true">Edit</button>
            <button class="btn btn-primary" @click="deleteAnswer()">Delete</button>
          </div>
          <answer-edit
            :answer="answer"
            @edit-form-shown="editFormShown=$event"
            @get-answers="$emit('get-answers', null)"
            v-if="editFormShown"
          ></answer-edit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteAnswer } from "@/apis/answer.js";
import AnswerEdit from "./answerEdit.vue";

export default {
  props: ["answer"],
  components: {
    AnswerEdit
  },
  data() {
    return {
      editFormShown: false
    };
  },
  methods: {
    async deleteAnswer() {
      try {
        let questionRequest = await axios({
          baseURL,
          url: "api/answers/" + this.answer._id,
          method: "DELETE",
          headers: { token }
        });
        this.$emit("get-answers", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    },
    async upvote() {
      try {
        let answerRequest = await axios({
          baseURL,
          url: "api/answers/" + this.answer._id + "/upvote",
          method: "POST",
          headers: { token }
        });
        this.$emit("get-answers", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    },
    async downvote() {
      try {
        let answerRequest = await axios({
          baseURL,
          url: "api/answers/" + this.answer._id + "/downvote",
          method: "POST",
          headers: { token }
        });
        this.$emit("get-answers", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
