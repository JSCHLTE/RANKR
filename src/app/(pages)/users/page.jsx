import React from 'react'
import UserListWrapper from './UserListWrapper';
import { ref, get } from 'firebase/database';
import { db } from "../../firebase";

import "./page.css"

const fetchUsers = async () => {
  try {
    const usersRef = ref(db, `users`);
    const snapshot = await get(usersRef);
    const usersData = snapshot.val();

    const usersArray = Object.entries(usersData).map(([id, data]) => ({
      id,
      ...data,
    }));

    if (snapshot.exists()) {
      return usersArray;
    }
  } catch (err) {
    console.error(`${err} an error has occurred.`);
  }
};

const page = async () => {
  const users = await fetchUsers();
  return (
    <main id='usersWrapper'>
      <h1 className='knewave'>RANKR Users</h1>
      <UserListWrapper users={users}/>
    </main>
  )
}

export default page