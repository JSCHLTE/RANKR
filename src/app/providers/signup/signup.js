import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { getTime } from '../getTime/getTime';

const time = getTime();

export async function signUp(email, password, displayName) {

  const username = displayName.toLowerCase();

  // Check if username is taken
  const usernameRef = ref(db, `usernames/${username}`);
  const snapshot = await get(usernameRef);

  if (snapshot.exists()) {
    throw new Error("Username is already taken.");
  }

  // Create Firebase Auth user
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const userData = {
    username,
    displayName,
    email: cred.user.email,
    pfp: "",
    accountCreated: time,
    icons: ["user"],
    followers: [],
    following: []
  };

  // Save user record
  const userRef = ref(db, `users/${uid}`);
  await set(userRef, userData);

  // Save username mapping
  await set(usernameRef, uid);
}