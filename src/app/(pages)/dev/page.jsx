import React from 'react'
import Button from '@/app/components/arcButton/button'

const Dev = () => {
  return (
    <div>
        <h1>RANKR Dev Page</h1>
        <p>This is just for testing, nothing to see here.</p>
        
        <Button link={"/users/jordan"} style={"white full"} text="This a test"></Button>
    </div>
  )
}

export default Dev