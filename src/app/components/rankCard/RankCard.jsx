import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/app/providers/getDate/getDate'

import "./rankCard.css"

const RankCard = ({ id, title, teams, type, scoring, format, updatedAt, createdAt, user }) => {
  return (
    <Link href={`/rankings/${id}`}>
    <div className='ranking-item flex'>
      <div className='ranking-title-wrapper'>
        <h3>{title}</h3>
      </div>
      <div className='ranking-categories flex'>
        <span className='ranking-type'>{teams} Team</span>
        <span className='ranking-type'>{type}</span>
        <span className='ranking-type'>{scoring}</span>
      </div>
      <div className='format-wrapper flex'>
        <div className='format-item qb flex'>
          <span className='format-number'>{format.QB}</span>
          <span className='format-label'>QB</span>
        </div>
        <div className='format-item rb flex'>
          <span className='format-number'>{format.RB}</span>
          <span className='format-label'>RB</span>
        </div>
        <div className='format-item wr flex'>
          <span className='format-number'>{format.WR}</span>
          <span className='format-label'>WR</span>
        </div>
        <div className='format-item te flex'>
          <span className='format-number'>{format.TE}</span>
          <span className='format-label'>TE</span>
        </div>
        <div className='format-item flx flex'>
          <span className='format-number'>{format.FLEX}</span>
          <span className='format-label'>FLEX</span>
        </div>
        { format.SUPERFLEX ?                 <div className='format-item sflx flex'>
          <span className='format-number'>{format.SUPERFLEX}</span>
          <span className='format-label'>SFLX</span>
        </div> : "" }
      </div>
      <div className='date-wrapper flex'>{ updatedAt ? <><span className='updated'>Updated: {formatDate(updatedAt)}</span></> : ""}<span className={`created ${ updatedAt ? "faded" : "" }`}>Created: {formatDate(createdAt)}</span></div>
      { user ?       <div className='user-info flex'>
        <img src={user?.pfp ? user.pfp : '/images/lion-blue.svg'} alt='PFP' width={40} height={40}/>
        <div className='user-name-wrapper flex'>
          <p className='displayName'>{user?.displayName}</p>
          <p className='username'>@{user?.username}</p>
        </div>
      </div> : <p>Fetching user...</p> }
    </div>
    </Link>
  )
}

export default RankCard