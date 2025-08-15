import { ref, get } from 'firebase/database'
import { db } from '@/app/firebase'

export const getUser = async (uid) => {
    console.log(`${uid} this is the one`)
    const userRef = ref(db, `users/${uid}`)
    const userSnap = await get(userRef);

    if(userSnap.exists()) {
        const userData = userSnap.val()
        console.log(userData)
        return userData
    } else {
        return null
    }
}