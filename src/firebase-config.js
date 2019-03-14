import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB3TUWHzK6Q4ULG3wFsaT5TDZvH2d_Zi7Q",
  authDomain: "notr-2df7d.firebaseapp.com",
  databaseURL: "https://notr-2df7d.firebaseio.com",
  projectId: "notr-2df7d",
  storageBucket: "notr-2df7d.appspot.com",
  messagingSenderId: "239598273199"
};

export default firebase.initializeApp(config);
