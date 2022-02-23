import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import CreateTime from './Components/CreateTime';
import FollowButton from './Components/FollowButton';
import IconGroup from './Components/IconGroup';

export default function UserPage() {
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));

  return (
    <div className='d-flex flex-fill align-items-center'>
      <div className='container backContainer my-4'>
        <div className='frontContainer'>
          <main className='userPageContent'>
            <GitHubUser />
            <div className='container repoRowContainer p-4 mt-2'>
              {userData.message === 'Not Found'
                ? <div className='fs-3 text-center text-middle-blue'>No Such User.</div>
                : userData.public_repos === 0
                  ? <div className='fs-3 text-center text-middle-blue'>Haven't created any repository yet.</div>
                  : <RepoList />
              }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function GitHubUser() {
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));

  return (
    <>
      <img className='ms-2 my-3' src={userData.avatar_url} alt={userData.name} width='142px' height='142px' style={{ backgroundColor: 'white', borderRadius: '50%', border: '6px solid rgb(242,243,244)' }} />
      <header className='d-flex align-items-end ms-2'>
        <div className='text-dark fs-5 fw-bold lh-1 me-auto'>
          {userData.name}
          <br />
          <span className='text-light-gray fw-light' style={{ fontSize: '0.9rem' }}>
            @{userData.login}
            <br />
            {userData.type === 'Organization'
              ?
              <>
                {userData.location &&
                  <span className='d-flex align-items-center mt-1'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-geo-alt' viewBox='0 0 16 16'>
                      <path d='M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z' />
                      <path d='M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                    </svg>
                    {userData.location}
                  </span>
                }
                {userData.blog &&
                  <span className='d-flex align-items-center mt-1'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-link-45deg' viewBox='0 0 16 16'>
                      <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                      <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                    </svg>
                    <a className='text-light-gray d-inline-block text-truncate' href={userData.blog} target='_blank' rel='noreferrer' style={{ maxWidth: '11rem', cursor: 'pointer' }} >
                      {userData.blog}
                    </a>
                  </span>
                }
              </>
              :
              <span>{userData.public_repos} repos · {userData.followers} followers</span>
            }
          </span>
        </div>
        {userData.message === 'Not Found'
          ? <a className='btn-light-blue' href='/' role='button'>Search another User</a>
          : <FollowButton userData={userData} />
        }
      </header>
      <p className='text-dark-gray fs-6 fw-light mt-3'>{userData.bio}</p>
      <hr />
      {userData.type === 'Organization'
        ? <span className='text-dark-gray' style={{ fontSize: '0.8rem' }}>{userData.public_repos} Public Repositories</span>
        : <span className='text-dark-gray' style={{ fontSize: '0.8rem' }}>All Public Repositories</span>
      }
    </>
  );
}

// API call
function FetchRepos(username, page) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/' + username + '/repos?sort=created&per_page=10&page=' + page);
        const json = await response.json();
        setRepos([...repos, ...json]);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchRepos();
  }, [username, page]);

  return repos;
}

function RepoList() {
  const [page, setPage] = useState(1);
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));
  const repoData = FetchRepos(userData.login, page);

  useEffect(() => {
    function infiniteScroll() {
      if (
        Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight
        &&
        10 * page < userData.public_repos
      ) {
        setTimeout(() => {
          setPage(page + 1);
        }, 1000)
      }
    }
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  })

  return (
    <>
      {repoData.map((repo, index) => (
        <RepoRow repo={repo} key={index} />
      ))}
      {10 * page < userData.public_repos
        ?
        <div className='text-center text-middle-blue'>
          <div className='spinner-border align-middle' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
        :
        <div className='fs-5 text-center text-middle-blue'>No more repository</div>
      }
    </>
  );
}

const RepoRow = memo(function RepoRow(props) {
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));

  return (
    <Link to={props.repo.name}>
      <div className='d-flex flex-wrap align-items-center gap-2 mb-2'>
        <img className='img-fluid' src={userData.avatar_url} alt={userData.name} width='20px' height='20px' style={{ borderRadius: '50%' }} />
        <span className='text-dark-gray fs-6 fw-light me-auto' style={{ fontSize: '0.8rem' }}>{userData.name}</span>
        <span className='text-dark-gray fs-6 fw-light' style={{ fontSize: '0.8rem' }}>
          <CreateTime created_at={props.repo.created_at} displayTime={false} />
        </span>
      </div>
      <p className='text-dark fs-5 fw-bold'>{props.repo.name}</p>
      <p className='text-black mb-3' style={{ fontSize: '0.9rem' }}>{props.repo.description}</p>
      <div className='text-light-gray d-flex align-items-center gap-2' style={{ fontSize: '0.8rem' }}>
        <IconGroup starsCount={props.repo.stargazers_count} forksCount={props.repo.forks_count} language={props.repo.language} />
      </div>
      <hr className='text-dark-gray' />
    </Link>
  );
})
