import { initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbWlLKPH0BRawRUP_ILeK1s4bPySA1Upg",
    authDomain: "assignment-krishna.firebaseapp.com",
    projectId: "assignment-krishna",
    storageBucket: "assignment-krishna.appspot.com",
    messagingSenderId: "819711135140",
    appId: "1:819711135140:web:340b700674fd4724ae8531",
};

const app = initializeApp(firebaseConfig, "KrishnaSharmaRS");

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const createUserDocument = async (userAuth: User, additionData: Object) => {
    if (!userAuth) return;
    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) return;
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        setDoc(userRef, { displayName, email, createdAt, ...additionData });
    } catch (error) { }

    return userRef;
};

export const getUserDocument = async (userAuth: User) => {
    if (!userAuth) return null;
    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) return null;

    return userSnapshot.data();
};
