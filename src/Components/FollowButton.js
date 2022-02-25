import React, { useState, useEffect } from 'react';

import styles from '../Styles/FollowButton.module.css';

export default function FollowButton(props) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (localStorage.followingUsers !== '[]') {
      const followingUsers = JSON.parse(localStorage.getItem('FollowingUsers'));
      followingUsers.forEach(followingUser => {
        if (followingUser.login === props.userData.login) {
          setFollowing(true);
        }
      });
    }
  })

  function handleClick() {
    if (following) {
      let followingUsers = JSON.parse(localStorage.getItem('FollowingUsers'));
      followingUsers.forEach((followingUser, index) => {
        if (followingUser.login === props.userData.login) {
          followingUsers.splice(index, 1);
          localStorage.setItem('FollowingUsers', JSON.stringify(followingUsers));
        }
      })
    } else {
      localStorage.setItem('FollowingUsers', JSON.stringify(JSON.parse(localStorage.getItem('FollowingUsers')).concat([props.userData])));
    }
    setFollowing(!following);
  }

  return (
    following
      ? <div className={styles.btnFollowing} onClick={handleClick} role='button'>Following</div>
      : <div className={styles.btnFollow} onClick={handleClick} role='button'>Follow</div>
  );
}
