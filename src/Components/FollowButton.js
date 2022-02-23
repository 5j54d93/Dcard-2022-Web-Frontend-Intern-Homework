import React, { useState, useEffect } from 'react';

export default function FollowButton(props) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (localStorage.followingUsers !== '[]') {
      var followingUsers = JSON.parse(localStorage.getItem('followingUsers'));
      for (let i = 0; i < followingUsers.length; i++) {
        if (followingUsers[i].login === props.userData.login) {
          setFollowing(true);
        }
      }
    }
  }, [props.userData.login])

  function handleClick() {
    if (following) {
      let followingUsers = JSON.parse(localStorage.getItem('followingUsers'));
      followingUsers.forEach((followingUser, index) => {
        if (followingUser.login === props.userData.login) {
          followingUsers.splice(index, 1);
          localStorage.setItem('followingUsers', JSON.stringify(followingUsers));
        };
      })
    } else {
      localStorage.setItem('followingUsers', JSON.stringify(JSON.parse(localStorage.getItem('followingUsers')).concat([props.userData])));
    }

    setFollowing(!following);
  }

  return (
    following
      ? <div className='btn-light-gray' onClick={handleClick} role='button'>Following</div>
      : <div className='btn-light-blue' onClick={handleClick} role='button'>Follow</div>
  );
}
