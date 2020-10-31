import { ENV } from 'app/config/Env';
import firebase from 'firebase';

const { firebaseConfig } = ENV;

firebase.initializeApp(firebaseConfig);

export default {
  signInAnonymously() {
    firebase.auth().signInAnonymously();
  },
};
