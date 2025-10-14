import React from 'react'
import User from './User'
import Rankings from './Rankings'
import "./user.css"
import { PlayersList } from "@/app/providers/players/PlayersList"
import { getUserBySlug } from '@/app/providers/getUser/getUser'

const page = async ({ params }) => {
  const { slug } = await params;
  const profile = await getUserBySlug(slug);

  return (
    <section id='content-wrapper'>
      <div className='user-data flex-center'>
        <User profile={profile}/>
      </div>
      <div className='user-rankings flex-center'>
        <PlayersList>
          <Rankings profile={profile} slug={slug}/>
        </PlayersList>
      </div>
    </section>
  )
}

export default page