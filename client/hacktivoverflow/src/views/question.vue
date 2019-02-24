<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <question-add @get-questions="getQuestions()" v-if="isLoggedIn"></question-add>
        <div v-for="(question,index) in questionData" :key="index">
          <question-card :question="question" @get-questions="getQuestions()"></question-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionAdd from "@/components/questionAdd.vue";
import QuestionCard from "@/components/questionCard.vue";
import { mapState } from "vuex";

export default {
  created() {
    this.getQuestions();
  },
  components: {
    QuestionAdd,
    QuestionCard
  },
  data() {
    return {
      questionData: []
    };
  },
  computed: {
    ...mapState(["userId", "userName", "userEmail", "isLoggedIn"])
  },
  methods: {
    async getQuestions() {
      try {
        let questionRequest = await axios({
          baseURL,
          url: "api/questions/all",
          method: "GET",
          headers: { token }
        });
        this.questionData = questionRequest.data;
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
