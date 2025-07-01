"use client";

import React, { useEffect, useState } from 'react'
import PlayerCard from './PlayerCard'
import { playerData } from './playerData';
import '@/app/components/home/playerSlider.css'

const PlayerSlider = () => {

    const [sliderIndex, setSliderIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        console.log('hi')
        if(isPaused) return

        const sliderDuration = setTimeout(() => {
            setSliderIndex(prev => prev > playerData.length - 2 ? 0 : prev + 1);
        }, 3000);

        return () => clearTimeout(sliderDuration)

    }, [sliderIndex, isPaused])

  return (
    <>
    <div className="player-slider" onClick={() => setIsPaused(prev => !prev)} onMouseOver={() => setIsPaused(true)} onMouseOut={() => setIsPaused(false)}>
        <div className="player-slider-inner" style={{ transform: `translateX(-${sliderIndex * 100}%)`}}>
            <PlayerCard />
        </div>
    </div>
    <div className='slider-circle-wrapper flex-center'>
    {playerData.map((item, index) => (
                    <div className={`slider-circle ${sliderIndex === index ? 'active' : ''}`} key={index} onClick={() => setSliderIndex(index)}></div>
        ))}
    </div>
    </>
  )
}

export default PlayerSlider