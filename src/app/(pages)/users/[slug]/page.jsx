import React from 'react'
import User from './User'
import Rankings from './Rankings'
import "./user.css"
import { useParams } from 'next/navigation'
import { getUser } from '@/app/providers/getUser/getUser'

const page = () => {

  const { slug } = useParams();
  const user = getUser(slug);

  return (
    <div>
      <div className='user-data flex-center'>
        <User slug={slug} user={user}/>
      </div>
      <div className='user-rankings'>
        <Rankings slug={slug} user={user}/>
      </div>
    </div>
  )
}

export default page