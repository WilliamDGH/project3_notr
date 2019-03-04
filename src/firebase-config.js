import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD5I5SNSzovUWMbPkvk3cV0sh5jMYd25w0",
  authDomain: "project3-notr.firebaseapp.com",
  databaseURL: "https://project3-notr.firebaseio.com",
  projectId: "project3-notr",
  storageBucket: "project3-notr.appspot.com",
  messagingSenderId: "172867758503"
};

export default firebase.initializeApp(config);
