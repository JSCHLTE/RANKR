import React from 'react'
import User from './User'
import Rankings from './Rankings'
import { PlayersList } from "@/app/providers/players/PlayersList"
import { getUserBySlug } from '@/app/providers/getUser/getUser'
import { ref, get, equalTo, query, orderByChild } from "firebase/database";
import { db } from "../../../firebase";

import "./user.module.css"

const fetchRankings = async (slug) => {
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
      return rankingsArray
    }
  } catch (err) {
    console.error(`${err} an error has occurred.`);
  }
};

const page = async ({ params }) => {

  const { slug } = await params;
  const profile = await getUserBySlug(slug);
  const rankings = await fetchRankings(slug);

  return (
    <section id='content-wrapper'>
      <div className='user-data flex-center'>
        <User profile={profile} />
      </div>
      <div className='user-rankings flex-center'>
        <PlayersList>
          <Rankings rankings={rankings} />
        </PlayersList>
      </div>
    </section>
  )
}

export default page