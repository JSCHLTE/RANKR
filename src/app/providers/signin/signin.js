import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
