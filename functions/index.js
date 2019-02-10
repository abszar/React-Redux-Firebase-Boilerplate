const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// this function is to add to the 'notification' collection in the DB
const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("notification added", doc));
};

//firebase function to make a new post creation notification / after that it will add to the 'notification' collection inside the DB usinf the function above
exports.postCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(doc => {
    const post = doc.data();
    const notification = {
      content: "Added a new post",
      user: `${post.authorFirstName} ${post.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
  });

//firebase function to make a new user joining notification / after that it will add to the 'notification' collection inside the DB usinf the function above
exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: "Joined to the website",
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    });
});
