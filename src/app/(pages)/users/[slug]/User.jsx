"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from "@/app/providers/AuthProvider"
import { ref, get, set, remove, runTransaction } from 'firebase/database';
import { db } from '@/app/firebase';

const User = ({ profile: initialProfile }) => {  // Use initialProfile to distinguish

  const [profile, setProfile] = useState(initialProfile || {});  // Local state for optimistic updates
  const [hover, setHover] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function checkFollowingStatus() {
      if (!user?.uid || !profile?.uid || user.uid === profile.uid) {
        setIsFollowing(false);
        return;
      }

      try {
        const followingRef = ref(db, `users/${user.uid}/following/${profile.uid}`);
        const snapshot = await get(followingRef);
        const following = snapshot.exists();
        setIsFollowing(following);
      } catch (error) {
        console.error('Error checking follow status:', error);
        setIsFollowing(false);
      }
    }

    checkFollowingStatus();
  }, [user?.uid, profile?.uid]);  // Re-check if auth or profile changes

  const handleFollow = async () => {
    if (!user?.uid || profile.uid === user.uid) return;
  
    const followerRef = ref(db, `users/${profile.uid}/followers/${user.uid}`);
    const followingRef = ref(db, `users/${user.uid}/following/${profile.uid}`);
    const profileFollowersCountRef = ref(db, `users/${profile.uid}/followersCount`);
    const userFollowingCountRef = ref(db, `users/${user.uid}/followingCount`);
  
    try {
      const followerSnapshot = await get(followerRef);
      const isFollowing = followerSnapshot.exists();
      
      // Optimistic UI update: Immediately reflect change for the clicker
      setProfile(prev => ({
        ...prev,
        followersCount: isFollowing 
          ? Math.max((prev.followersCount || 0) - 1, 0)
          : (prev.followersCount || 0) + 1,
        followingCount: isFollowing 
          ? Math.max((prev.followingCount || 0) - 0, 0)
          : (prev.followingCount || 0) + 0,
      }));

      if (isFollowing) {
        // Unfollow: Remove and decrement
        await remove(followerRef);
        await remove(followingRef);
        await runTransaction(profileFollowersCountRef, (current) => Math.max((current || 0) - 1, 0));
        await runTransaction(userFollowingCountRef, (current) => Math.max((current || 0) - 1, 0));
		setIsFollowing(false);
      } else {
        // Follow: Add and increment
        await set(followerRef, true);
        await set(followingRef, true);
        await runTransaction(profileFollowersCountRef, (current) => (current || 0) + 1);
        await runTransaction(userFollowingCountRef, (current) => (current || 0) + 1);
		setIsFollowing(true);
      }
      
    } catch (error) {
      console.error('Follow toggle failed:', error);
      
      // On error: Revert optimistic update
      // Optionally refetch actual counts or show error
      const followerSnapshot = await get(followerRef);  // Re-check state
      const actualIsFollowing = followerSnapshot.exists();
      setProfile(prev => ({
        ...prev,
        followersCount: actualIsFollowing ? (prev.followersCount || 0) + 1 : (prev.followersCount || 0) - 1,  // Rough revert
        // For accuracy, better to refetch full profile or counts
      }));
      
      // Or fully refetch counts on error
      // const followersSnap = await get(profileFollowersCountRef);
      // const followingSnap = await get(userFollowingCountRef);
      // setProfile(prev => ({ ...prev, followersCount: followersSnap.val() ?? 0, followingCount: followingSnap.val() ?? 0 }));
    }
  };

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
          { profile?.uid === user?.uid ?  <button className='btn edit'>Edit Profile <i className="fa-solid fa-gear"></i></button> : ( isFollowing ? <button className='btn main following' onClick={handleFollow}>Following <i class="fa-solid fa-user-check"></i></button> : <button className='btn main follow' onClick={handleFollow}>Follow <i className="fa-solid fa-user-plus"></i></button> )}
        </div>
        <div className='user-data-right-wrapper flex'>
          <div className='user-data-following'>{profile?.followingCount ?? 0} <span className='follow-text'>Following</span></div>
          <div className='user-data-followers'>{profile?.followersCount ?? 0} <span className='follow-text'>Followers</span></div>
        </div>
        <div className='user-data-joined'>
          <span>Joined {profile?.accountCreated}</span>
        </div>
      </div>
    </>
  )
}

export default User