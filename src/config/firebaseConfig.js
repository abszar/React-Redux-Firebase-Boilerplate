import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCSwOsNf9tHmJnvSC-XFQ31h1Rq5VSoIeY",
  authDomain: "github-react-rrdux.firebaseapp.com",
  databaseURL: "https://github-react-rrdux.firebaseio.com",
  projectId: "github-react-rrdux",
  storageBucket: "",
  messagingSenderId: "39214460443"
};
firebase.initializeApp(config);

//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
