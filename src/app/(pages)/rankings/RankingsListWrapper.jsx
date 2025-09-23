import React from 'react'
import Rankings from './Rankings';
import "./rankings.css"

const RankingsListWrapper = ({ rankings }) => {
  return (
    <section className='rankings-wrapper'>
        <Rankings rankings={rankings} />
    </section>
  )
}

export default RankingsListWrapper;