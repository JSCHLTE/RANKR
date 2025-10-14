"use client"

import React, { useState } from 'react'
import { useAuth } from "@/app/providers/AuthProvider"

const User = ({ profile }) => {

	const [hover, setHover] = useState(null);
	const { user } = useAuth();

  return (
		<>
		<div className='user-data-left'>
			<div className='user-data-img-wrapper'>
					<img src={profile?.pfp ? profile.pfp : '/images/lion-blue.svg'} alt='User profile picture'/>
			</div>
		</div>
		<div className='user-data-right'>
			<div className='user-data-name flex'>
				<div className='user-data-name-group'>
					<span className='user-data-displayname flex'>{profile?.displayName} {profile?.icons?.includes("affiliate") ? <img src='/images/lion-blue.svg' alt='Blue lion logo' title='This account is affiliated with RANKR'/> : ""}</span>
					<span className='user-data-username'>@{profile?.username}</span>
				</div>
				{ profile?.uid === user?.uid ?  <button className='btn edit'>Edit Profile <i className="fa-solid fa-gear"></i></button> : <button className='btn main follow'>Follow <i className="fa-solid fa-user-plus"></i></button>}
				{/* <button className='btn main follow'>Follow <i class="fa-solid fa-user-plus"></i></button> */}
				{/* { !hover ? <button className='following' onMouseOver={() => setHover(true)}>Following</button> : <button className='following' onMouseOut={() => setHover(null)}>Unfollow</button> } */}
			</div>
		<div className='user-data-right-wrapper flex'>
				<div className='user-data-following'>{profile?.following ? profile.following : 0} <span className='follow-text'>Following</span></div>
				<div className='user-data-followers'>{profile?.followers ? profile.followers : 0} <span className='follow-text'>Followers</span></div>
		</div>
		<div className='user-data-joined'>
				<span>Joined {profile?.accountCreated}</span>
		</div>
</div>
		</>
  )
}

export default User