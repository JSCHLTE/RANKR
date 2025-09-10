import React from 'react'
import User from './User'
import Rankings from './Rankings'
import "./user.css"
import { PlayersList } from "@/app/providers/players/PlayersList"

const page = () => {

  return (
    <section id='content-wrapper'>
      <div className='user-data flex-center'>
        <User />
      </div>
      <div className='user-rankings flex-center'>
        <PlayersList>
          <Rankings />
        </PlayersList>
      </div>
    </section>
  )
}

export default page