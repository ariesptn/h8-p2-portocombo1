<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-2">
        <div class="d-flex align-items-center justify-content-center flex-column">
          <button class="btn btn-success">⇧</button>
          <h1>0</h1>
          <button class="btn btn-danger">⇩</button>
        </div>
      </div>
      <div class="col-sm-10">
        <div class="card-header">
          <router-link :to="{name:'answers',params:{questionId:question._id}}">{{question.title}}</router-link>
        </div>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">{{question.description}}</p>
          <span class="card-text">Tags :</span>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-secondary"
              v-for="(tag,index) in question.tags"
              :key="index"
            >{{tag}}</button>
          </div>
          <div>
            <button class="btn btn-primary" @click="editFormShown=true">Edit</button>
            <button class="btn btn-primary" @click="deleteQuestion()">Delete</button>
          </div>
          <question-edit
            :question="question"
            @edit-form-shown="editFormShown=$event"
            @get-questions="$emit('get-questions',null)"
            v-if="editFormShown"
          ></question-edit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteQuestion } from "@/apis/question.js";
import QuestionEdit from "./questionEdit.vue";

export default {
  props: ["question"],
  components: {
    QuestionEdit
  },
  data() {
    return {
      editFormShown: false
    };
  },
  methods: {
    async deleteQuestion() {
      try {
        let questionRequest = await axios({
          baseURL,
          url: "api/questions/" + this.question._id,
          method: "DELETE",
          headers: { token }
        });
        this.$emit("get-questions", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
