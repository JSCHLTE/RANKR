"use client"

import React, { useState } from 'react'
import styles from "./edit.module.css"
import Button from '@/app/components/arcButton/Button';

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [username, setUsername] = React.useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    // TO DO: implement update logic here
  };

  return (
    <div className={styles.editWrapper}>
      <form onSubmit={handleUpdate}>
        <div className={styles.field}>
          <label>Profile Picture:</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="Enter profile picture URL"
          />
        </div>

        <div className={styles.field}>
          <label>Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter display name"
          />
        </div>

        <div className={styles.field}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <Button type="submit" text="Update Profile"></Button>
      </form>
    </div>
  );
};

export default EditProfile;