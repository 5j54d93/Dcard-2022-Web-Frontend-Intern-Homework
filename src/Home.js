import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FollowButton from './Components/FollowButton';

export default function Home() {

  useEffect(() => {
    if (!localStorage.followingUsers) {
      localStorage.setItem('followingUsers', '[]');
    }
    if (!sessionStorage.GitHubUser) {
      sessionStorage.setItem('GitHubUser', '{"login": ""}');
    }
  })

  return (
    <div className='d-flex flex-fill align-items-center'>
      <main className='container my-4 homeContainer'>
        <SearchBar />
        <FowllowingUsers />
      </main >
    </div >
  );
}

function SearchBar() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (JSON.parse(sessionStorage.getItem('GitHubUser')).login.toUpperCase() !== inputRef.current.value.toUpperCase()) {
      async function fetchData() {
        let url = 'https://api.github.com/users/' + inputRef.current.value;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'token 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'
          }
        });
        const json = await response.json();
        if (json.message === 'Not Found') {
          json.login = inputRef.current.value;
          json.name = 'No Such User';
          json.public_repos = 0;
          json.followers = 0;
          json.avatar_url = 'https://pbs.twimg.com/profile_images/792371348114845697/YYKpi3s6_400x400.jpg';
        }
        sessionStorage.setItem('GitHubUser', JSON.stringify(json));
        navigate('/users/' + JSON.parse(sessionStorage.getItem('GitHubUser')).login + '/repos');
      }
      fetchData();
    } else {
      navigate('/users/' + JSON.parse(sessionStorage.getItem('GitHubUser')).login + '/repos');
    }
  }

  return (
    <form className='input-group' onSubmit={handleSubmit}>
      <input type='search' ref={inputRef} className='form-control form-control-lg' placeholder='Search a GitHub username' aria-label='GitHub username' aria-describedby='GitHubUsername' required />
      <button className='btn btn-secondary btnSearch' type='submit' aria-label="search a GitHub user's repositories">
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-search mx-1' viewBox='0 0 16 16'>
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
        </svg>
      </button>
    </form>
  );
}

function FowllowingUsers() {
  return (
    <div className='followingUsersContainer mt-4'>
      <h3>Fowllowing Users</h3>
      <hr />
      {localStorage.followingUsers && JSON.parse(localStorage.getItem('followingUsers')).length > 0
        ? JSON.parse(localStorage.getItem('followingUsers')).map((followingUser, index) => (
          <div className='container repoRowContainer d-flex p-3 mb-2' key={index}>
            <Link className='d-flex flex-grow-1 align-items-center gap-2' onClick={() => sessionStorage.setItem('GitHubUser', JSON.stringify(followingUser))} to={'/users/' + followingUser.login + '/repos'}>
              <img className='img-fluid' style={{ borderRadius: '50%' }} src={followingUser.avatar_url} alt={followingUser.name} width='32px' height='32px' />
              <div className='text-black lh-1'>
                <span className='fw-bolder'>{followingUser.name}</span>
                <br />
                <span className='text-light-gray' style={{ fontSize: '0.8rem' }}>@{followingUser.login}</span>
              </div>
            </Link>
            <FollowButton userData={followingUser} />
          </div>
        ))
        : <div className='mb-2'>Explore users and follow his/her！</div>
      }
    </div>
  );
}
