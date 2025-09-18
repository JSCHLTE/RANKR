'use client'
import React, { useEffect, useState } from 'react';
import Search from './Search';
import Users from './Users';

const UserListWrapper = ({ users }) => {

    const [searchUsers, setSearchUsers] = useState(users);

    useEffect(() => {
        setSearchUsers(users);
    }, [users]);

    const handleSearch = (searchTerm) => {
        if(!searchTerm) {
            setSearchUsers(users);
            return;
        };

        const lowerTerm = searchTerm.toLowerCase();
        const filtered = users?.filter(user => 
            user.username?.toLowerCase().includes(lowerTerm)
        );
        setSearchUsers(filtered);
    };

  return (
    <>
        <Search onSearch={handleSearch}/>
        <Users users={searchUsers}/>
    </>
  );
};

export default UserListWrapper;