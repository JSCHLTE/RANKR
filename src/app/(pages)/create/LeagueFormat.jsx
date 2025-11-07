import React, { useEffect } from 'react'

import "./format.css"
import "../../components/arcButton/button.css"

const LeagueFormat = ({ title, desc, value, setFormValues, formValues, name }) => {

  const isActive = formValues && formValues?.[name] == value

  return (
        <div className={`format-item arc custom rounded ${isActive ? "active" : ""}`} onClick={() => setFormValues((prev) => ({
          ...prev,
          [name]: value
        }))}>
            <h3>{title}</h3>
            <p>{desc}</p>
            { isActive ? <span className='format-selected'>Selected</span> : "" }
        </div>
  )
}

export default LeagueFormat