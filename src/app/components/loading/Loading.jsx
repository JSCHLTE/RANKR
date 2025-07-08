import React from 'react'
import Image from 'next/image'

import "./loading.css"

const Loading = () => {
  return (
    <div className='spinner-wrapper'>
        <Image src="images/blue-long.svg" width={300} height={90} alt="Lion" className='logo'/>
    </div>
  )
}

export default Loading