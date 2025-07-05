import React from 'react'
import User from './User'
import "./user.css"

const page = () => {

  return (
    <div>
      <div className='user-data flex-center'>
        <User />
      </div>
    </div>
  )
}

export default page