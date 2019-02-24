import { db } from '@/apis/firebase.js'

function addAnswer(data) {
    data.type = 0
    db.collection("answers").add(data)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function updateAnswer(id, data) {
    var sfDocRef = db.collection("answers").doc(id);

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

function deleteAnswer(id) {
    db.collection("answers").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

export { addAnswer, updateAnswer, deleteAnswer }
