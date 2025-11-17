"use client"

import React, { useState } from 'react'
import styles from "./edit.module.css"
import Button from '@/app/components/arcButton/Button';

const EditProfile = ({ profile }) => {
  const [profilePicture, setProfilePicture] = React.useState(profile.pfp);
  const [displayName, setDisplayName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    // TO DO: implement update logic here
  };

  return (
  <>
  <div className={styles.overlay}></div>
    <div className={styles.editWrapper}>
      <h2 className={`knewave ${styles.editTitle}`}>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className={styles.field}>
          <label>Profile Picture</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="Enter profile picture URL"
          />
        </div>

        <div className={styles.field}>
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder={profile.displayName}
          />
        </div>

        <div className={styles.field}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={profile.username}
          />
        </div>
      </form>
      <div className={`${styles.btnWrapper} flex`}>
          <Button type="submit" text="Save Changes" style={styles.save}></Button>
          <Button type="submit" text="Cancel" style={styles.cancel}></Button>
        </div>
    </div>
    </>
  );
};

export default EditProfile;