<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-2">
        <div class="d-flex align-items-center justify-content-center flex-column">
          <button class="btn btn-success" @click="upvote()">⇧</button>
          <h1>{{question.vote}}</h1>
          <button class="btn btn-danger" @click="downvote()">⇩</button>
        </div>
      </div>
      <div class="col-sm-10">
        <div class="card-header">
          <router-link :to="{name:'answers',params:{questionId:question._id}}">
            <strong>{{question.title}}</strong>
          </router-link>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{question.title}}</h5>
          <p class="card-text">{{question.description}}</p>
          <span class="card-text">Tags :</span>
          <div class="btn-group" role="group" v-for="(tag,index) in question.tags" :key="index">
            <button
              type="button"
              class="btn btn-secondary"
              @click="$store.commit('searchTag',tag)"
            >{{tag}}</button>
            <button class="btn btn-success" @click="addWatchedTag(tag)">+</button>
          </div>
          <p
            class="card-text"
          >By : {{question.user.name}} | Created at : {{question.createdAt}} | Updated at : {{question.updatedAt}}</p>
          <div v-if="userId==question.user._id">
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
import QuestionEdit from "./questionEdit.vue";
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["userId", "userName", "userEmail", "isLoggedIn"])
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
    },
    async upvote() {
      try {
        let questionRequest = await axios({
          baseURL,
          url: "api/questions/" + this.question._id + "/upvote",
          method: "POST",
          headers: { token }
        });
        this.$emit("get-questions", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    },
    async downvote() {
      try {
        let questionRequest = await axios({
          baseURL,
          url: "api/questions/" + this.question._id + "/downvote",
          method: "POST",
          headers: { token }
        });
        this.$emit("get-questions", null);
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    },
    async addWatchedTag(tag) {
      try {
        let qaTagRequest = await axios({
          baseURL,
          url: "api/qatags/" + tag,
          method: "POST",
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
