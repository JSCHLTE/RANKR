import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/app/providers/getDate/getDate'

import "./rankCard.module.css"

const RankCard = ({ id, title, teams, type, scoring, format, updatedAt, createdAt, user }) => {
  return (
    <Link href={`/rankings/${id}`}>
      <div className='rankingItem flex'>
        <div className='rankingTitleWrapper'>
          <h3>{title}</h3>
        </div>
        <div className='rankingCategories flex'>
          <span className='rankingType'>{teams} Team</span>
          <span className='rankingType'>{type}</span>
          <span className='rankingType'>{scoring}</span>
        </div>
        <div className='formatWrapper flex'>
          <div className='formatItem qb flex'>
            <span className='formatNumber'>{format.QB}</span>
            <span className='formatLabel'>QB</span>
          </div>
          <div className='formatItem rb flex'>
            <span className='formatNumber'>{format.RB}</span>
            <span className='formatLabel'>RB</span>
          </div>
          <div className='formatItem wr flex'>
            <span className='formatNumber'>{format.WR}</span>
            <span className='formatLabel'>WR</span>
          </div>
          <div className='formatItem te flex'>
            <span className='formatNumber'>{format.TE}</span>
            <span className='formatLabel'>TE</span>
          </div>
          <div className='formatItem flx flex'>
            <span className='formatNumber'>{format.FLEX}</span>
            <span className='formatLabel'>FLEX</span>
          </div>
          {format.SUPERFLEX ? <div className='formatItem sf flex'>
            <span className='formatNumber'>{format.SUPERFLEX}</span>
            <span className='formatLabel'>SF</span>
          </div> : ""}
        </div>
        <div className='dateWrapper flex'>{updatedAt ? <><span className='updated'>Updated: {formatDate(updatedAt)}</span></> : ""}<span className={`created ${updatedAt ? "faded" : ""}`}>Created: {formatDate(createdAt)}</span></div>
        {user ? <div className='userInfo flex'>
          <img src={user?.pfp ? user.pfp : '/images/lion-blue.svg'} alt='PFP' width={40} height={40} />
          <div className='userNameWrapper flex'>
            <p className='displayName'>{user?.displayName}</p>
            <p className='username'>@{user?.username}</p>
          </div>
        </div> : <p>Fetching user...</p>}
      </div>
    </Link>
  )
}

export default RankCard