"use client"

import React, { useEffect, useState } from 'react'
import Loading from '@/app/components/loading/Loading'
import { useParams } from 'next/navigation'
import { getUserBySlug } from '@/app/providers/getUser/getUser'
import UserLayout from './UserLayout'

const User = () => {

    const { slug } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    	const getUser = async () => {
      	setUserData(await getUserBySlug(slug))
    	}
			
			if(slug) getUser();
    }, [slug])

		useEffect(() => {
			if(userData) setLoading(null);
		}, [userData])

    if (loading) return <Loading />

  return (
    <UserLayout userData={userData}/>
  )
}

export default User