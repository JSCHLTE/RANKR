"use client";

import React, { useEffect, useState } from 'react'
import PlayerCard from './PlayerCard'
import { playerData } from './playerData';

const PlayerSlider = () => {

    const [slideNumber, setSlideNumber] = useState(0);

    useEffect(() => {

        const sliderDuration = setTimeout(() => {
            setSlideNumber(prev => prev < (-playerData.length + 2) * 100 ? 0 : prev - 100);
        }, 3000);

        return () => clearTimeout(sliderDuration)

    }, [slideNumber])

  return (
    <div className="player-slider">
        <div className="player-slider-inner" style={{ transform: `translateX(${slideNumber}%)` }}>
            <PlayerCard />
        </div>
  </div>
  )
}

export default PlayerSlider