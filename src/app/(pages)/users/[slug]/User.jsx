"use client"

import React, { useEffect, useState } from 'react'
import Loading from '@/app/components/loading/Loading'
import { ref, get } from 'firebase/database'
import { db } from '@/app/firebase'
import { useParams } from 'next/navigation'
import { getUserBySlug } from '@/app/providers/getUser/getUser'

const User = () => {

    const { slug } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserBySlug(slug);
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchUser();
        }
    }, [slug]);

    if (loading) return <Loading />

  return (
    <>
        <div className='user-data-left'>
            <div className='user-data-img-wrapper'>
                <img src={userData.pfp ? userData.pfp : '/images/lion-blue.png'} alt='User profile picture'/>
            </div>
        </div>
        <div className='user-data-right'>
            <div className='user-data-name flex'>
                <span className='user-data-displayname flex'>{userData.displayName} {userData.icons?.includes("affiliate") ? <img src='/images/lion-blue.svg' alt='Blue lion logo' title='This account is affiliated with RANKR'/> : ""}</span>
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