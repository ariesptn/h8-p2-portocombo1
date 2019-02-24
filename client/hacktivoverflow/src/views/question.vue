<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <question-add></question-add>
        <div v-for="(question,index) in questionData" :key="index">
          <question-card :question="question"></question-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionAdd from "@/components/questionAdd.vue";
import QuestionCard from "@/components/questionCard.vue";
import { db } from "@/apis/firebase.js";

export default {
  created() {
    db.collection("questions")
      .orderBy("createdAt", "desc")
      .limit(100)
      .onSnapshot(querySnapshot => {
        let questionData = [];
        querySnapshot.forEach(doc => {
          questionData.push({ id: doc.id, ...doc.data() });
        });
        this.questionData = questionData;
        console.log(this.questionData);
      });
  },
  components: {
    QuestionAdd,
    QuestionCard
  },
  data() {
    return {
      questionData: []
    };
  }
};
</script>
