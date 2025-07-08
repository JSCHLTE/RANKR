"use client";

import React, { useState } from 'react'
import PlayersEdit from './PlayersEdit';
import PlayersRankings from './PlayersRankings';

const Players = () => {

  const [editMode, setEditMode] = useState(null);

  return (
    <>
      <button onClick={() => setEditMode(prev => !prev)}>{editMode ? "Save Rankings" : "Edit Rankings"}</button>
      {editMode ? <PlayersEdit /> : <PlayersRankings />}
    </>
  )
}

export default Players