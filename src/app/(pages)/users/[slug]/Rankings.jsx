"use client"

import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { ref, get, equalTo, query, orderByChild } from "firebase/database";
import { db } from "../../../firebase";

import { getUser } from '@/app/providers/getUser/getUser';

const Rankings = () => {

    const [rankings, setRankings] = useState();

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

    console.log(uid)

    const fetchRankings = async () => {
      try {
        const rankingsRef = query(
          ref(db, `rankings`),
          orderByChild("uid"),
          equalTo(uid)
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

    useEffect(() => {
      console.log(rankings)
    }, [rankings])

  return (
    <div>
    <p>webp</p>
    </div>
  )
}

export default Rankings