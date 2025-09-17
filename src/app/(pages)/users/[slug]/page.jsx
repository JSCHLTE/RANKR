import React from 'react'
import User from './User'
import Rankings from './Rankings'
import "./user.css"
import { PlayersList } from "@/app/providers/players/PlayersList"
import { getUserBySlug } from '@/app/providers/getUser/getUser'

const page = async ({ params }) => {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  return (
    <section id='content-wrapper'>
      <div className='user-data flex-center'>
        <User user={user}/>
      </div>
      <div className='user-rankings flex-center'>
        <PlayersList>
          <Rankings user={user}/>
        </PlayersList>
      </div>
    </section>
  )
}

export default page