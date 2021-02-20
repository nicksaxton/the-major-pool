import firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAjmyo515HY60-P4gKTPQVOZ8MCzg8gblE',
  authDomain: 'the-major-pool-a347c.firebaseapp.com',
  projectId: 'the-major-pool-a347c',
  storageBucket: 'the-major-pool-a347c.appspot.com',
  messagingSenderId: '440321344662',
  appId: '1:440321344662:web:307b2c3f7274a2715d2eb7',
};

export const fb = firebase.initializeApp(firebaseConfig);
