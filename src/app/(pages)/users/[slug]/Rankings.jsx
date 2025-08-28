"use client"

import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { ref, get, equalTo, query, orderByChild } from "firebase/database";
import { db } from "../../../firebase";
import { getUser } from '@/app/providers/getUser/getUser';

const Rankings = ({ slug }) => {

    const [rankings, setRankings] = useState();

    const fetchRankings = async () => {
      try {
        const rankingsRef = query(
          ref(db, `rankings`),
          orderByChild("author"),
          equalTo(slug)
        );
        const snapshot = await get(rankingsRef);

        if(snapshot.exists()) {
          const rankingsData = snapshot.val();
          const rankingsArray = Object.entries(rankingsData).map(([id, data]) => ({
            id,
            ...data,
          }));
          setRankings(rankingsArray)
        }
      } catch(err) {
        console.error(`${err} an error has occured.`)
      }
    }

    useEffect(() => {
      fetchRankings();
    }, []);

  return (
    <div>
    {rankings ? 
      rankings.map((item, index) => (
        <div key={index} className='ranking-item'>
          <div className='ranking-title-wrapper'>
            <h3>{item.title}</h3>
          </div>
        </div>
      )) : `No rankings found for ${slug}`
     }
    </div>
  )
}

export default Rankings