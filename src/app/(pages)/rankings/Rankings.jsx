import React from 'react'
import RankCard from '@/app/components/rankCard/RankCard'
import { getUserById } from '@/app/providers/getUser/getUser'

const Rankings = ({ rankings }) => {
  return (
    rankings?.map( async (ranking, index) => (
      <RankCard 
        key={index}
        id={ranking.id}
        title={ranking.title}
        teams={ranking.teams}
        type={ranking.type}
        scoring={ranking.scoring}
        format={ranking.format}
        updatedAt={ranking.updatedAt}
        createdAt={ranking.createdAt}
        user={await getUserById(ranking.uid)}
      />
    ))
  )
}

export default Rankings