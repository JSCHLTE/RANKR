'use client';
import React from 'react';
import Link from 'next/link';
import "./users.css";
import "../../components/arcButton/button.css"

const Users = ({ users }) => {
  return (
    <div className="users-wrapper">
      {users.length > 0 ? (
        users.map((item) => (
          <Link
            href={`/users/${item.username}`}
            className="users-item flex arc custom rounded"
            key={item.username}
          >
            {/* User Avatar */}
            <div className="user-pfp flex">
              <img
                src={item.pfp || "/images/lion-blue.svg"}
                alt={`${item.displayName}'s avatar`}
                className="avatar-img"
              />
            </div>

            {/* User Info */}
            <div className="user-name flex">
              <p className="displayname">{item.displayName}</p>
              <p className="username">@{item.username}</p>
              <p className="joined">Joined {item.accountCreated}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="empty-msg">No users found...</p>
      )}
    </div>
  );
};

export default Users;