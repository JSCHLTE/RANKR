"use client"

import React, { useState } from 'react'
import styles from "./edit.module.css"
import Button from '@/app/components/arcButton/Button';

const EditProfile = ({ profile }) => {
  const [profilePicture, setProfilePicture] = React.useState(profile.pfp);
  const [displayName, setDisplayName] = React.useState(profile.displayName || "");
  const [username, setUsername] = React.useState(profile.username || "");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { updateProfile } = await import('@/app/providers/updateProfile/updateProfile');

      await updateProfile(profile.uid, profile, {
        username,
        displayName,
        pfp: profilePicture
      });

      setSuccess("Profile updated successfully!");
      // Reload page to reflect changes and update profile prop
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.editWrapper}>
        <h2 className={`knewave ${styles.editTitle}`}>Edit Profile</h2>
        {error && <p className={styles.error} style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        {success && <p className={styles.success} style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
        <form onSubmit={handleUpdate}>
          <div className={styles.field}>
            <div className={`${styles.previewWrapper} flex`}>
              <div className={styles.item}>
                <div className={styles.current}>
                  <img src={profile.pfp || '/images/lion-blue.svg'} alt='User profile picture' />
                </div>
                <p>Current</p>
              </div>
              <div className={styles.item}>
                <div className={styles.preview}>
                  <img src={profilePicture != profile.pfp ? profilePicture : '/images/lion-blue.svg'} alt='User profile picture' />
                </div>
                <p>Preview</p>
              </div>
            </div>
            <label>Profile picture
              <input
                type="text"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                placeholder="Enter profile picture URL"
              />
            </label>
          </div>

          <div className={styles.field}>
            <label>Display name
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={profile.displayName}
              />
            </label>
          </div>

          <div className={styles.field}>
            <label>Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={profile.username}
              />
            </label>
            <p className={styles.desc}>Usernames can only be changed every 30 days</p>
          </div>

          <div className={`${styles.btnWrapper} flex`}>
            <Button type="submit" text={loading ? "Saving..." : "Save changes"} style={styles.save} disabled={loading}></Button>
            <Button type="button" link={`/users/${profile?.username}`} text="Back to profile" style={styles.cancel}></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;