<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <question-card :question="question"></question-card>
        <answer-add :question="question"></answer-add>
        <div v-for="(answer,index) in answerData" :key="index">
          <answer-card :answer="answer"></answer-card>
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
    db.collection("questions")
      .doc(this.$route.params.answerId)
      .onSnapshot(doc => {
        let question = { id: doc.id, ...doc.data() };
        this.question = question;
        console.log(this.question);
      });
    db.collection("answers")
      .where("questionId", "==", this.$route.params.answerId)
      .orderBy("createdAt", "desc")
      .limit(100)
      .onSnapshot(querySnapshot => {
        let answerData = [];
        querySnapshot.forEach(doc => {
          answerData.push({ id: doc.id, ...doc.data() });
        });
        this.answerData = answerData;
        console.log(this.answerData);
      });
  },
  components: {
    QuestionCard,
    AnswerCard,
    AnswerAdd
  },
  data() {
    return {
      question: {},
      answerData: []
    };
  }
};
</script>
