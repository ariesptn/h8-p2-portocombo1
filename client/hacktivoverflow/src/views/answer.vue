<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <question-card :question="question" @get-questions="getQuestion()"></question-card>
        <answer-add :question="question" @get-answers="getAnswers()"></answer-add>
        <div v-for="(answer,index) in answerData" :key="index">
          <answer-card :answer="answer" @get-answers="getAnswers()"></answer-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/apis/firebase.js";
import QuestionCard from "@/components/questionCard.vue";
import AnswerCard from "@/components/answerCard.vue";
import AnswerAdd from "@/components/answerAdd.vue";

export default {
  created() {
    this.getQuestion();
    this.getAnswers();
  },
  components: {
    QuestionCard,
    AnswerCard,
    AnswerAdd
  },
  data() {
    return {
      question: { user: {} },
      answerData: []
    };
  },
  methods: {
    async getQuestion() {
      try {
        let questionRequest = await axios({
          baseURL,
          url: "api/questions/" + this.$route.params.questionId,
          method: "GET",
          headers: { token }
        });
        if (!questionRequest.data) {
          this.$router.push("/questions");
        }
        this.question = questionRequest.data;
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    },
    async getAnswers() {
      try {
        let questionRequest = await axios({
          baseURL,
          url: "api/answers/byQuestionId/" + this.$route.params.questionId,
          method: "GET",
          headers: { token }
        });
        this.answerData = questionRequest.data;
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
