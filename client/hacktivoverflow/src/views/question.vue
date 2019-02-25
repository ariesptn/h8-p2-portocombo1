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
  watch: {
    searchQuery(val) {
      this.getQuestions();
    },
    searchTag(val) {
      this.getQuestions();
    }
  },
  computed: {
    searchQuery() {
      return this.$route.params.searchQuery;
    },
    searchTag() {
      return this.$route.params.tag;
    },
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
        if (this.searchQuery) {
          let searchQuery = this.searchQuery;
          this.questionData = questionRequest.data.filter(e => {
            return (
              e.title.includes(searchQuery) ||
              e.description.includes(searchQuery) ||
              e.tags.some(tag => tag.includes(searchQuery))
            );
          });
        } else if (this.searchTag) {
          let tag = this.searchTag;
          this.questionData = questionRequest.data.filter(e =>
            e.tags.includes(tag)
          );
        } else {
          this.questionData = questionRequest.data;
        }
      } catch (err) {
        this.$store.commit("displayError", err);
      }
    }
  }
};
</script>
