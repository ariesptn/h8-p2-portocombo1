firebase.initializeApp({
    apiKey: "AIzaSyDSHyjU6Wvh3wJwnapSFMxKZ0rBA42G3ek",
    authDomain: "minioverflow-3310e.firebaseapp.com",
    databaseURL: "https://minioverflow-3310e.firebaseio.com",
    projectId: "minioverflow-3310e",
    storageBucket: "minioverflow-3310e.appspot.com",
    messagingSenderId: "479044785696"
});
var db = firebase.firestore();

function updateType(id, direction) {
    var sfDocRef = db.collection("kanban").doc(id);

    db.runTransaction(function (transaction) {
        return transaction.get(sfDocRef).then(function (sfDoc) {
            if (!sfDoc.exists) {
                throw "Document does not exist!";
            }

            var type = sfDoc.data().type
            if (direction === 'left') {
                type--
            } else if (direction === 'right') {
                type++
            }
            if (type <= 3 && type >= 0) {
                transaction.update(sfDocRef, { type });
                return type;
            } else {
                return Promise.reject("out of bound");
            }
        });
    }).then(function (newPopulation) {
        console.log("Type changed to ", newPopulation);
    }).catch(function (err) {
        // This will be an "out of bound" error.
        console.error(err);
    });
}

export { db }
