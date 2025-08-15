"use client"

import React, { useEffect, useState } from 'react'
import Loading from '@/app/components/loading/Loading'
import { ref, get } from 'firebase/database'
import { db } from '@/app/firebase'
import { useParams } from 'next/navigation'

const User = () => {

    const { slug } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if(!slug) return;
        
        const fetchData = async () => {
            const usernameRef = ref(db, `usernames/${slug}`)
            const snapshot = await get(usernameRef);

            if(!snapshot.exists) {
                setUserData(null)
                return;
            }

            const uid = snapshot.val();

            const userRef = ref(db, `users/${uid}`)
            const userSnap = await get(userRef);

            if(userSnap.exists()) {
                setUserData(userSnap.val())
            } else {
                setUserData(null)
            }
        }

        fetchData();

    }, [slug])

    if(!userData) return <Loading />

  return (
    <>
        <div className='user-data-left'>
            <div className='user-data-img-wrapper'>
                <img src={userData.pfp ? userData.pfp : '/images/player-default.webp'} alt='User profile picture'/>
            </div>
        </div>
        <div className='user-data-right'>
            <div className='user-data-name flex'>
                <span className='user-data-displayname'>{userData.displayName}</span>
                <span className='user-data-username'>@{userData.username}</span>
            </div>
            <div className='user-data-right-wrapper flex'>
                <div className='user-data-following'>{userData.following ? userData.following : 0} <span className='follow-text'>Following</span></div>
                <div className='user-data-followers'>{userData.followers ? userData.followers : 0} <span className='follow-text'>Followers</span></div>
            </div>
            <div className='user-data-joined'>
                <span>Joined {userData.accountCreated}</span>
            </div>
        </div>
    </>
    
  )
}

export default User