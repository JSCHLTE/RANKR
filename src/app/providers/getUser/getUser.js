import { ref, get } from 'firebase/database'
import { db } from '@/app/firebase'

export const getUserBySlug = async (slug) => {

    const usernameRef = ref(db, `usernames/${slug}`)
    const snapshot = await get(usernameRef);

    if(!snapshot.exists) {
        alert(`No user found under ${slug}`);
        return;
    }

    const uid = snapshot.val();

    const userRef = ref(db, `users/${uid}`)
    const userSnap = await get(userRef);

    if(userSnap.exists()) {
        const userData = userSnap.val()
        return userData
    } else {
        return null
    }
}

export const getUserById = async (uid) => {

    const userRef = ref(db, `users/${uid}`)
    const userSnap = await get(userRef);

    if(userSnap.exists()) {
        const userData = userSnap.val()
        return userData
    } else {
        return null
    }
}