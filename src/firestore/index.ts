import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBelZAGDWvPK16-vyBQLj7zW86udxx3Ewg',
    authDomain: 'color-game-b5d44.firebaseapp.com',
    databaseURL:
        'https://color-game-b5d44-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'color-game-b5d44',
    storageBucket: 'color-game-b5d44.appspot.com',
    messagingSenderId: '278077859406',
    appId: '1:278077859406:web:3a138c2b87d985ecac051f',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const fireStoreBase = getFirestore(firebaseApp);
export const database = getDatabase(firebaseApp);
