"use client"

import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { ref, get, equalTo, query, orderByChild } from "firebase/database";
import { db } from "../../../firebase";
import { useParams } from 'next/navigation';
import { getUserBySlug } from '@/app/providers/getUser/getUser';
import Loading from '@/app/components/loading/Loading';

const Rankings = () => {

  const { slug } = useParams();
  const user = getUserBySlug(slug);
    const [rankings, setRankings] = useState();
    const [loading, setLoading] = useState(true);

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
          setLoading(false);
        }
        setLoading(false);
      } catch(err) {
        console.error(`${err} an error has occured.`)
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchRankings();
    }, []);

    if(loading) return <p>Fetching {slug}'s rankings...</p>

  return (
    <>
    {rankings ? 
      rankings.map((item, index) => (
        <div key={index} className='ranking-item'>
          <div className='ranking-title-wrapper'>
            <h3>{item.title}</h3>
            <div className='format-wrapper flex'>
              <div className='format-item qb flex'>
                <span className='format-number'>{item.format.QB}</span>
                <span className='format-label'>QB</span>
              </div>
              <div className='format-item rb flex'>
                <span className='format-number'>{item.format.RB}</span>
                <span className='format-label'>RB</span>
              </div>
              <div className='format-item wr flex'>
                <span className='format-number'>{item.format.WR}</span>
                <span className='format-label'>WR</span>
              </div>
              <div className='format-item te flex'>
                <span className='format-number'>{item.format.TE}</span>
                <span className='format-label'>TE</span>
              </div>
              <div className={`format-item ${item.superFlex ? 'sflx' : 'flx'} flex`}>
                <span className='format-number'>{item.format.FLEX}</span>
                <span className='format-label'>{item.superFlex ? 'SFLX' : "FLEX"}</span>
              </div>
            </div>
          </div>
        </div>
      )) : `No rankings found for ${slug}.`
     }
     </>
  )
}

export default Rankings