import React, { useState, useEffect } from 'react';

export default function FollowButton(props) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (localStorage.followingData !== '[]') {
      var followingData = JSON.parse(localStorage.getItem('followingData'));
      for (let i = 0; i < followingData.length; i++) {
        if (followingData[i].username === props.username) {
          setFollowing(true);
        }
      }
    }
  }, [props.username])

  function handleOnClick() {
    if (following) {
      let followingData = JSON.parse(localStorage.getItem('followingData'));
      followingData.forEach((data, index) => {
        if (data.username === props.username) {
          followingData.splice(index, 1);
          localStorage.setItem("followingData", JSON.stringify(followingData));
        };
      })
    } else {
      const userdata = {
        'avatarUrl': props.avatarUrl,
        'name': props.name,
        'username': props.username
      }
      localStorage.setItem('followingData', JSON.stringify(JSON.parse(localStorage.getItem('followingData')).concat([userdata])));
    }

    setFollowing(!following);
  }

  return (
    following
      ? <div className='btn-light-gray' onClick={handleOnClick} role='button'>Following</div>
      : <div className='btn-light-blue' onClick={handleOnClick} role='button'>Follow</div>
  );
}
