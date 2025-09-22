import React from 'react'
import RankCard from '@/app/components/rankCard/RankCard'

const Rankings = ({ rankings }) => {
  return (
    rankings?.map((ranking, index) => (
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
      />
    ))
  )
}

export default Rankings