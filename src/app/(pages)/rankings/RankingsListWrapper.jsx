import React from 'react'
import Rankings from './Rankings';

const RankingsListWrapper = ({ rankings }) => {
  return (
    <div>
        <Rankings rankings={rankings} />
    </div>
  )
}

export default RankingsListWrapper;