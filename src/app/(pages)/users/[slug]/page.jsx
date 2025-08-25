import React from 'react'
import User from './User'
import Rankings from './Rankings'
import "./user.css"

const page = () => {

  return (
    <div>
      <div className='user-data flex-center'>
        <User />
      </div>
      <div className='user-rankings'>
        <Rankings />
      </div>
    </div>
  )
}

export default page