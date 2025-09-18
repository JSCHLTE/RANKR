'use client'

import Loading from '@/app/components/loading/Loading';
import { ref, get } from 'firebase/database';
import { db } from "../../firebase";
import React, { useEffect, useState } from 'react'

import "./users.css"
import Link from 'next/link';

const Users = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState();

    const fetchRankings = async () => {
        setLoading(true);
        try {
          const usersRef = ref(db, `users`);
          const snapshot = await get(usersRef);
          const usersData = snapshot.val();

          const usersArray = Object.entries(usersData).map(([id, data]) => ({
            id,
            ...data,
          }));
    
          if (snapshot.exists()) {
            setUsers(usersArray)
          }
        } catch (err) {
          console.error(`${err} an error has occurred.`);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchRankings();
      }, []);

      console.log(users)

      if(loading) return <Loading />

  return (
    <div className='users-wrapper flex'>
        { users?.map((item, index) => (
          <Link href={`/users/${item.username}`}>
            <div className='users-item flex' key={index}>
                <img src={item.pfp} width={75} height={75}/>
                <div className='user-name'>
                  <p className='displayname'>{item.displayName}</p>
                  <p className='username'>@{item.username}</p>
                  <p className='joined'>Joined {item.accountCreated}</p>
                </div> 
            </div>
          </Link>
        )) }
    </div>
  )
}

export default Users