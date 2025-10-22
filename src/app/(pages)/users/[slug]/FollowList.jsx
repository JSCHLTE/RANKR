'use client'

import { useEffect, useState } from "react";
import { ref, get } from 'firebase/database';
import { db } from "@/app/firebase";
import "./followList.css";
import { getUserById } from "@/app/providers/getUser/getUser";
import Close from "@/app/components/close/Close";

const FollowList = ({ uid, pfp, username, followList, setFollowList }) => {
  const [userList, setUserList] = useState([]);
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!followList) {
      setUserList([]);
      setPeople([]);
      return;
    }

    const fetchUserIds = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const path = followList === "followers" 
          ? `users/${uid}/followers` 
          : `users/${uid}/following`;
        const dataRef = ref(db, path);
        const snapshot = await get(dataRef);
        const data = snapshot.val();

        const userIds = data ? Object.keys(data) : [];

        setUserList(userIds);
      } catch (err) {
        console.error(`Error fetching ${followList}:`, err);
        setError(`Failed to load ${followList}. Please try again.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserIds();
  }, [followList, uid]);

  useEffect(() => {
    if (!userList.length) {
      setPeople([]);
      return;
    }

    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const users = await Promise.all(
          userList.map(async (userId) => {
            const user = await getUserById(userId);
            return user ? { id: userId, ...user } : null;
          })
        );

        const uniqueUsers = users
          .filter((user) => user)
          .reduce((acc, user) => {
            if (!acc.some((existingUser) => existingUser.id === user.id)) {
              acc.push(user);
            }
            return acc;
          }, []);

        setPeople(uniqueUsers);
      } catch (err) {
        console.error(`Error fetching users:`, err);
        setError("Failed to load user data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [userList]);

  return (
    <div className="follow-list-wrapper">
      <div className="follow-list-inner-wrapper">
        <Close />
        <div className="follow-list-title flex">
          <div className="user-pfp">
            <img
              src={pfp || '/images/lion-blue.svg'}
              alt="User profile picture"
              width={50}
              height={50}
            />
          </div>
          <p>
            {username ? `${username}'s ${followList}` : `User's ${followList || "list"}`}
          </p>
        </div>
        <div className="follow-list-list">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : people.length > 0 ? (
            people.map((item) => (
              <div key={item.id} className="flex">
                <div className="user-pfp">
                  <img
                    src={item.pfp || '/images/lion-blue.svg'}
                    alt="User profile picture"
                    width={50}
                    height={50}
                  />
                </div>
                <p>{item.username || "Unknown"}</p>
              </div>
            ))
          ) : (
            <p>No {followList || "users"} found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowList;