import React from 'react'
import RankingsListWrapper from './RankingsListWrapper';
import { ref, get } from 'firebase/database';
import { db } from "../../firebase";

import "../CSS/template.css"

const fetchRankings = async () => {
    try {
      const rankingsRef = ref(db, `rankings`);
      const snapshot = await get(rankingsRef);
      const rankingsData = snapshot.val();
  
      const rankingsArray = Object.entries(rankingsData).map(([id, data]) => ({
        id,
        ...data,
      }));
  
      if (snapshot.exists()) {
        return rankingsArray;
      }
    } catch (err) {
      console.error(`${err} an error has occurred.`);
    }
  };

const page = async () => {
    const rankings = await fetchRankings();
  return (
    <main id='templateWrapper'>
        <h1 className='knewave'>Public Rankings</h1>
        <RankingsListWrapper rankings={rankings} />
    </main>
  )
}

export default page