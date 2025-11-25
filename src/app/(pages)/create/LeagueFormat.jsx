import React, { useEffect } from 'react'

import styles from "./format.module.css"
import "../../components/arcButton/button.css"

const LeagueFormat = ({ title, desc, value, setFormValues, formValues, name }) => {

  const isActive = formValues && formValues?.[name] == value

  return (
    <div className={`${styles.formatItem} arc custom rounded ${isActive ? styles.active : ""}`} onClick={() => setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))}>
      <h3>{title}</h3>
      <p>{desc}</p>
      {isActive ? <span className={styles.formatSelected}>Selected</span> : ""}
    </div>
  )
}

export default LeagueFormat