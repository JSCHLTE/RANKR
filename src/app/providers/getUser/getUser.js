import { ref, get } from 'firebase/database'
import { db } from '@/app/firebase'

export const getUser = async (uid) => {
    const userRef = ref(db, `users/${uid}`)
    const userSnap = await get(userRef);

    if(userSnap.exists()) {
        const userData = userSnap.val()
        return userData
    } else {
        return null
    }
}