import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import FollowButton from './Components/FollowButton';

import styles from './Styles/Home.module.css';

export default function Home() {

  useEffect(() => {
    if (!localStorage.FollowingUsers) {
      localStorage.setItem('FollowingUsers', '[]');
    }
    if (!sessionStorage.repoDetail) {
      sessionStorage.setItem('repoDetail', '{}');
    }
    if (!sessionStorage.GitHubUser) {
      sessionStorage.setItem('GitHubUser', '{"login":""}');
    }
    sessionStorage.setItem('page', 1);
    sessionStorage.setItem('offsetY', 0);
  })

  return (
    <div className='d-flex flex-fill align-items-center'>
      <main className={`container ${styles.home}`}>
        <SearchBar />
        <FowllowingUsers />
      </main >
    </div >
  );
}

function SearchBar() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  async function fetchUser() {
    const response = await fetch('https://api.github.com/users/' + inputRef.current.value);
    const json = await response.json();
    sessionStorage.setItem('GitHubUser', JSON.stringify(json));
    if (json.message === 'Not Found') {
      json.login = inputRef.current.value;
      json.name = 'No Such User';
      json.public_repos = 0;
      json.followers = 0;
      json.avatar_url = 'https://pbs.twimg.com/profile_images/792371348114845697/YYKpi3s6_400x400.jpg';
      sessionStorage.setItem('GitHubUser', JSON.stringify(json));
      navigate('/users/' + inputRef.current.value + '/repos');
    } else if (json.public_repos === 0) {
      navigate('/users/' + json.login + '/repos');
    } else {
      fetchRepos(json.login);
    }
  }

  async function fetchRepos(username) {
    const response = await fetch('https://api.github.com/users/' + username + '/repos?sort=created&per_page=10&page=1');
    const json = await response.json();
    sessionStorage.setItem('Repos', JSON.stringify(json));
    navigate('/users/' + username + '/repos');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!sessionStorage.GitHubUser || JSON.parse(sessionStorage.getItem('GitHubUser')).login.toUpperCase() !== inputRef.current.value.toUpperCase()) {
      fetchUser();
    } else {
      fetchRepos(JSON.parse(sessionStorage.getItem('GitHubUser')).login);
    }
  }

  return (
    <form className='input-group' onSubmit={handleSubmit}>
      <input type='search' ref={inputRef} className='form-control form-control-lg' placeholder='Search a GitHub username' aria-label='GitHub username' required />
      <button className={`btn ${styles.btnSearch}`} type='submit' aria-label="search a GitHub username">
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-search mx-1' viewBox='0 0 16 16'>
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
        </svg>
      </button>
    </form>
  );
}

function FowllowingUsers() {
  return (
    <div className={`mt-4 ${styles.bgLightGrayContainer}`}>
      <h3>Fowllowing Users</h3>
      <hr />
      {localStorage.FollowingUsers && JSON.parse(localStorage.getItem('FollowingUsers')).length > 0
        ? JSON.parse(localStorage.getItem('FollowingUsers')).map((followingUser, index) => (
          <FowllowingUserRow followingUser={followingUser} key={index} />
        ))
        : <span>Explore GitHub users and follow his/her！</span>
      }
    </div>
  );
}

function FowllowingUserRow(props) {
  const navigate = useNavigate();

  async function fetchRepos(username) {
    const response = await fetch('https://api.github.com/users/' + username + '/repos?sort=created&per_page=10&page=1');
    const json = await response.json();
    sessionStorage.setItem('Repos', JSON.stringify(json));
    navigate('/users/' + props.followingUser.login + '/repos');
  }

  const handleClick = () => {
    if (JSON.parse(sessionStorage.getItem('GitHubUser')).login !== props.followingUser.login) {
      sessionStorage.setItem('GitHubUser', JSON.stringify(props.followingUser));
      fetchRepos(props.followingUser.login);
    } else {
      fetchRepos(props.followingUser.login);
    }
  }

  return (
    <div className={`d-flex p-3 mt-2 ${styles.bgWhiteContainer}`}>
      <div className={`d-flex flex-grow-1 align-items-center gap-2 ${styles.cursorPointer}`} onClick={handleClick} >
        <img className={`img-fluid ${styles.roundImg}`} src={props.followingUser.avatar_url} alt={props.followingUser.name} width='32px' height='32px' />
        <div className='lh-1'>
          <span className='fw-bolder'>{props.followingUser.name}</span>
          <br />
          <span className={styles.username}>@{props.followingUser.login}</span>
        </div>
      </div>
      <FollowButton userData={props.followingUser} />
    </div>
  );
}
