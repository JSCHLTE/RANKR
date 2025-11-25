import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/app/providers/getDate/getDate'

import styles from "./rankCard.module.css"
import "../../components/arcButton/button.css"

const RankCard = ({ id, title, teams, type, scoring, format, updatedAt, createdAt, user }) => {
  return (
    <Link href={`/rankings/${id}`} className='arc custom rounded'>
      <div className={`${styles.rankingItem} flex`}>
        <div className={`${styles.rankingTitleWrapper}`}>
          <h3>{title}</h3>
        </div>
        <div className={`${styles.rankingCategories} flex`}>
          <span className={`${styles.rankingType}`}>{teams} Team</span>
          <span className={`${styles.rankingType}`}>{type}</span>
          <span className={`${styles.rankingType}`}>{scoring}</span>
        </div>
        <div className={`${styles.formatWrapper} flex`}>
          <div className={`${styles.formatItem} ${styles.qb} flex`}>
            <span className={`${styles.formatNumber}`}>{format.QB}</span>
            <span className={`${styles.formatLabel}`}>QB</span>
          </div>
          <div className={`${styles.formatItem} ${styles.rb} flex`}>
            <span className={`${styles.formatNumber}`}>{format.RB}</span>
            <span className={`${styles.formatLabel}`}>RB</span>
          </div>
          <div className={`${styles.formatItem} ${styles.wr} flex`}>
            <span className={`${styles.formatNumber}`}>{format.WR}</span>
            <span className={`${styles.formatLabel}`}>WR</span>
          </div>
          <div className={`${styles.formatItem} ${styles.te} flex`}>
            <span className={`${styles.formatNumber}`}>{format.TE}</span>
            <span className={`${styles.formatLabel}`}>TE</span>
          </div>
          <div className={`${styles.formatItem} ${styles.flx} flex`}>
            <span className={`${styles.formatNumber}`}>{format.FLEX}</span>
            <span className={`${styles.formatLabel}`}>FLEX</span>
          </div>
          {format.SUPERFLEX ? <div className={`${styles.formatItem} ${styles.sf} flex`}>
            <span className={`${styles.formatNumber}`}>{format.SUPERFLEX}</span>
            <span className={`${styles.formatLabel}`}>SF</span>
          </div> : ""}
        </div>
        <div className={`${styles.dateWrapper} flex`}>{updatedAt ? <><span className={`${styles.updated}`}>Updated: {formatDate(updatedAt)}</span></> : ""}<span className={`created ${updatedAt ? "faded" : ""}`}>Created: {formatDate(createdAt)}</span></div>
        {user ? <div className={`${styles.userInfo} flex`}>
          <img src={user?.pfp ? user.pfp : '/images/lion-blue.svg'} alt='PFP' width={40} height={40} />
          <div className={`${styles.userNameWrapper} flex`}>
            <p className={`${styles.displayName}`}>{user?.displayName}</p>
            <p className={`${styles.username}`}>@{user?.username}</p>
          </div>
        </div> : <p>Fetching user...</p>}
      </div>
    </Link>
  )
}

export default RankCard