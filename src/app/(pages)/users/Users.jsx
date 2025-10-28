'use client'
import React, { useEffect, useState } from 'react'

import "./users.css"
import Link from 'next/link';

const Users = ({ users }) => {

  return (
    <div className='users-wrapper'>
        { users.length > 0 ? (users?.map((item, index) => (
          <Link href={`/users/${item.username}`} className='users-item'>
            <div className='flex' key={index}>
                <img src={item.pfp ? item.pfp : "images/lion-blue.svg"} width={75} height={75}/>
                <div className='user-name'>
                  <p className='displayname'>{item.displayName}</p>
                  <p className='username'>@{item.username}</p>
                  <p className='joined'>Joined {item.accountCreated}</p>
                </div> 
            </div>
          </Link>
        ))) : <p>No users found...</p> }
    </div>
  )
}

export default Users