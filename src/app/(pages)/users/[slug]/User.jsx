"use client"

import React, { useEffect, useState } from 'react'
import Loading from '@/app/components/loading/Loading'
import { useParams } from 'next/navigation'

const User = ({ user }) => {

	const { slug } = useParams();
	const [hover, setHover] = useState(null);

  return (
		<>
		<div className='user-data-left'>
			<div className='user-data-img-wrapper'>
					<img src={user?.pfp ? user.pfp : '/images/lion-blue.svg'} alt='User profile picture'/>
			</div>
		</div>
		<div className='user-data-right'>
			<div className='user-data-name flex'>
				<div className='user-data-name-group'>
					<span className='user-data-displayname flex'>{user?.displayName} {user?.icons?.includes("affiliate") ? <img src='/images/lion-blue.svg' alt='Blue lion logo' title='This account is affiliated with RANKR'/> : ""}</span>
					<span className='user-data-username'>@{user?.username}</span>
				</div>
				{ user?.uid === user?.uid ?  <button className='btn edit'>Edit Profile <i className="fa-solid fa-gear"></i></button> : <button className='btn main follow'>Follow <i className="fa-solid fa-user-plus"></i></button>}
				{/* <button className='btn main follow'>Follow <i class="fa-solid fa-user-plus"></i></button> */}
				{/* { !hover ? <button className='following' onMouseOver={() => setHover(true)}>Following</button> : <button className='following' onMouseOut={() => setHover(null)}>Unfollow</button> } */}
			</div>
		<div className='user-data-right-wrapper flex'>
				<div className='user-data-following'>{user?.following ? user.following : 0} <span className='follow-text'>Following</span></div>
				<div className='user-data-followers'>{user?.followers ? user.followers : 0} <span className='follow-text'>Followers</span></div>
		</div>
		<div className='user-data-joined'>
				<span>Joined {user?.accountCreated}</span>
		</div>
</div>
		</>
  )
}

export default User