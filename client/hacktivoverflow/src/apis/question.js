import { db } from '@/apis/firebase.js'

function addQuestion(data) {
    data.type = 0
    db.collection("questions").add(data)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function updateQuestion(id, data) {
    var sfDocRef = db.collection("questions").doc(id);

    db.runTransaction(function (transaction) {
        return transaction.get(sfDocRef).then(function (sfDoc) {
            if (!sfDoc.exists) {
                throw "Document does not exist!";
            }
            var originalData = sfDoc.data()
            transaction.update(sfDocRef, data);
            return data;
        });
    }).then(function (data) {
        console.log("Data changed to ", data);
    }).catch(function (err) {
        console.error(err);
    });
}

function deleteQuestion(id) {
    db.collection("questions").doc(id).delete().then(function () {
        return db.collection("answers").where("questionId", "==", id).get()
    }).then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
        return Promise.resolve()
    }).then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

export { addQuestion, updateQuestion, deleteQuestion }
