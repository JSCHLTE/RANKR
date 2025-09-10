"use client"

import React, { useEffect, useState } from 'react'
import { ref, get, equalTo, query, orderByChild } from "firebase/database";
import { db } from "../../../firebase";
import { useParams } from 'next/navigation';
import { getUserBySlug } from '@/app/providers/getUser/getUser';
import { formatDate } from '@/app/providers/getDate/getDate';
import Link from 'next/link';

const Rankings = () => {
  const { slug } = useParams();
  const [rankings, setRankings] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const fetchRankings = async () => {
    try {
      const rankingsRef = query(
        ref(db, `rankings`),
        orderByChild("author"),
        equalTo(slug)
      );
      const snapshot = await get(rankingsRef);

      if (snapshot.exists()) {
        const rankingsData = snapshot.val();
        const rankingsArray = Object.entries(rankingsData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setRankings(rankingsArray);
      }
    } catch (err) {
      console.error(`${err} an error has occurred.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const fetched = await getUserBySlug(slug);
      setUser(fetched);
    };
    fetchUser();
    fetchRankings();
  }, [slug]);

  if (loading) return <p>Fetching {slug}'s rankings...</p>;

  return (
    <>
      {rankings ? 
        rankings.map((ranking, index) => {
          return (
            <Link href="#" key={index}>
            <div key={index} className='ranking-item flex'>
              <div className='ranking-title-wrapper'>
                <h3>{ranking.title}</h3>
                <p><span className='updated'>Updated {formatDate(ranking.updatedAt)}</span> | <span className='created'>Created {formatDate(ranking.createdAt)}</span></p>
              </div>
              <div className='format-wrapper flex'>
                <div className='format-item qb flex'>
                  <span className='format-number'>{ranking.format.QB}</span>
                  <span className='format-label'>QB</span>
                </div>
                <div className='format-item rb flex'>
                  <span className='format-number'>{ranking.format.RB}</span>
                  <span className='format-label'>RB</span>
                </div>
                <div className='format-item wr flex'>
                  <span className='format-number'>{ranking.format.WR}</span>
                  <span className='format-label'>WR</span>
                </div>
                <div className='format-item te flex'>
                  <span className='format-number'>{ranking.format.TE}</span>
                  <span className='format-label'>TE</span>
                </div>
                <div className={`format-item ${ranking.superFlex ? 'sflx' : 'flx'} flex`}>
                  <span className='format-number'>{ranking.format.FLEX}</span>
                  <span className='format-label'>{ranking.superFlex ? 'SFLX' : "FLEX"}</span>
                </div>
              </div>
              <div className='user-info flex'>
                <img src={user?.pfp ? user.pfp : '/images/lion-blue.svg'} alt='PFP' width={40} height={40}/>
                <p>{user?.displayName}</p>
              </div>
            </div>
            </Link>
          );
        }) : `No rankings found for ${slug}.`
      }
    </>
  );
};

export default Rankings;