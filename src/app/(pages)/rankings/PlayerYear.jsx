import React from 'react'

const PlayerYear = () => {
  return (
    <div className='playerYearWrapper'>
        <div className='playerYearGroup flex-center'>
            <button><i className="fa-solid fa-chevron-left"></i></button>
            <span>2025</span>
            <button><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>
  )
}

export default PlayerYear