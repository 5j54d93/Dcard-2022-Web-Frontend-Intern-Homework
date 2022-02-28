import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import IconGroup from './Components/IconGroup';
import CreateTime from './Components/CreateTime';
import FollowButton from './Components/FollowButton';

import styles from './Styles/UserPage.module.css';

export default function UserPage() {
  const { owner } = useParams();
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('GitHubUser')));

  useEffect(() => {
    if (!localStorage.FollowingUsers) {
      localStorage.setItem('FollowingUsers', '[]');
    }
    if (!sessionStorage.GitHubUser) {
      sessionStorage.setItem('GitHubUser', '{"login": ""}');
    }
    if (!sessionStorage.repoDetail) {
      sessionStorage.setItem('repoDetail', '{}');
    }
  })

  useEffect(() => {
    if (!sessionStorage.GitHubUser || owner.toUpperCase() !== JSON.parse(sessionStorage.getItem('GitHubUser')).login.toUpperCase()) {
      sessionStorage.setItem('page', 1);
      sessionStorage.setItem('offsetY', 0);
      fetchGitHubUser();
      async function fetchGitHubUser() {
        const response = await fetch('https://api.github.com/users/' + owner);
        const json = await response.json();
        if (json.message === 'Not Found') {
          json.login = owner;
          json.name = 'No Such User';
          json.followers = 0; json.following = 0;
          json.avatar_url = 'https://pbs.twimg.com/profile_images/792371348114845697/YYKpi3s6_400x400.jpg';
          sessionStorage.setItem('GitHubUser', JSON.stringify(json));
          setUserData(JSON.parse(sessionStorage.getItem('GitHubUser')));
        } else if (json.public_repos === 0) {
          sessionStorage.setItem('GitHubUser', JSON.stringify(json));
          setUserData(JSON.parse(sessionStorage.getItem('GitHubUser')));
        } else {
          sessionStorage.setItem('GitHubUser', JSON.stringify(json));
          fetchRepos();
        }
      }
      async function fetchRepos() {
        const response = await fetch('https://api.github.com/users/' + owner + '/repos?sort=created&per_page=10&page=1');
        const json = await response.json();
        sessionStorage.setItem('Repos', JSON.stringify(json));
        setUserData(JSON.parse(sessionStorage.getItem('GitHubUser')));
      }
    }
  })

  if (
    sessionStorage.GitHubUser
    &&
    owner.toUpperCase() === JSON.parse(sessionStorage.getItem('GitHubUser')).login.toUpperCase()
  ) {
    return (
      <div className='d-flex flex-fill align-items-center'>
        <div className={`container ${styles.bgLightGrayContainer}`}>
          <div className={styles.banner} />
          <main className={styles.userPage}>
            <GitHubUser />
            <div className={`p-4 mt-2 ${styles.bgWhiteContainer}`}>
              {userData.message === 'Not Found'
                ? <div className={`fs-3 text-center ${styles.textMiddleBlue}`}>No Such User.</div>
                : userData.public_repos === 0
                  ? <div className={`fs-3 text-center ${styles.textMiddleBlue}`}>Haven't created any repository yet.</div>
                  : <RepoList />
              }
            </div>
          </main>
        </div>
      </div>
    );
  } else {
    return (
      <Loading />
    );
  }
}

function Loading() {
  return (
    <div className='d-flex flex-fill align-items-center'>
      <div className={`container ${styles.bgLightGrayContainer}`}>
        <div className={styles.banner} />
        <main className={styles.userPage}>
          <img className={`ms-2 mb-2 ${styles.avartar}`} src='https://pbs.twimg.com/profile_images/792371348114845697/YYKpi3s6_400x400.jpg' alt='loading' width='142px' height='142px' />
          <header className='d-flex flex-wrap align-items-end ms-2'>
            <div className='me-auto lh-1'>
              <h1 className={styles.name}>Loading</h1>
              <span className={`fw-light ${styles.userDetail}`}>
                <h2 className={styles.username}>@loading</h2>
                <span>0 repos · 0 followers</span>
              </span>
            </div>
            <a className={`mt-2 ${styles.btnSearchAnotherUser}`} href='/' role='button'>Loading</a>
          </header>
          <p className={styles.bio}>Loading...</p>
          <hr />
          <div className={`p-4 mt-2 ${styles.bgWhiteContainer}`}>
            <div className={`fs-3 text-center ${styles.textMiddleBlue}`}>Loading...</div>
          </div>
        </main>
      </div>
    </div>
  );
}

function GitHubUser() {
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));

  return (
    <>
      <img className={`ms-2 mb-2 ${styles.avartar}`} src={userData.avatar_url} alt={userData.name} width='142px' height='142px' />
      <header className='d-flex flex-wrap align-items-end ms-2'>
        <div className='me-auto lh-1'>
          <h1 className={styles.name}>{userData.name}</h1>
          <span className={`fw-light ${styles.userDetail}`}>
            <h2 className={styles.username}>@{userData.login}</h2>
            {userData.type === 'Organization'
              ?
              <>
                {userData.location &&
                  <span className='d-flex align-items-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' className='bi bi-geo-alt' viewBox='0 0 17 17'>
                      <path d='M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z' />
                      <path d='M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                    </svg>
                    <span className={styles.username}>{userData.location}</span>
                  </span>
                }
                {userData.blog &&
                  <span className='d-flex align-items-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-link-45deg' viewBox='0 0 16 16'>
                      <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                      <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                    </svg>
                    <a className={`d-inline-block text-truncate ${styles.blogLink}`} href={userData.blog} target='_blank' rel='noreferrer' >
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
          ? <a className={`mt-2 ${styles.btnSearchAnotherUser}`} href='/' role='button'>Search another User</a>
          : <span className='mt-2'><FollowButton userData={userData} /></span>
        }
      </header>
      <p className={styles.bio}>{userData.bio}</p>
      <hr />
      {userData.type === 'Organization'
        ? <span className={styles.repoListTag}>{userData.public_repos} Public Repositories</span>
        : <span className={styles.repoListTag}>All Public Repositories</span>
      }
    </>
  );
}

function RepoList() {
  const progressRef = useRef(null);
  const page = Number(sessionStorage.getItem('page'));
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));
  const [repoData, setRepoData] = useState(JSON.parse(sessionStorage.getItem('Repos')));

  async function fetchRepos(page) {
    const response = await fetch('https://api.github.com/users/' + userData.login + '/repos?sort=created&per_page=10&page=' + page);
    const json = await response.json();
    sessionStorage.setItem('Repos', JSON.stringify(JSON.parse(sessionStorage.getItem('Repos')).concat(json)));
    sessionStorage.setItem('page', page);
    sessionStorage.setItem('offsetY', document.documentElement.scrollTop);
    setRepoData([...repoData, ...json]);
  }

  useEffect(() => {
    window.scrollTo({
      top: sessionStorage.getItem('offsetY'),
      left: 0,
      behavior: 'instant'
    });
    if (JSON.parse(sessionStorage.getItem('Repos')).length === 0) {
      fetchRepos(1);
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && 10 * page < userData.public_repos) {
        fetchRepos(page + 1);
      }
    }, { root: null, rootMargin: '0px', threshold: 0 });

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }
    return () => {
      observer.disconnect();
    }
  })

  return (
    JSON.parse(sessionStorage.getItem('Repos')).length > 0
      ?
      <>
        {repoData.map((repo, index) => (
          <span key={index}>
            <RepoRow repo={repo} />
            {repo !== repoData[repoData.length - 1] &&
              <hr className={styles.hr} />
            }
          </span>
        ))}
        {10 * page < userData.public_repos &&
          <div className={`d-flex justify-content-center ${styles.progress}`}>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden' ref={progressRef}>Loading...</span>
            </div>
          </div>
        }
      </>
      :
      <div className={`fs-5 text-center ${styles.textMiddleBlue}`}>Loading...</div>
  );
}

const RepoRow = memo(function RepoRow(props) {
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));
  const navigate = useNavigate();

  async function fetchData() {
    const response = await fetch('https://api.github.com/repos/' + userData.login + '/' + props.repo.name);
    const json = await response.json();
    sessionStorage.setItem('repoDetail', JSON.stringify(json));
    navigate(props.repo.name);
  }

  const handleClick = () => {
    sessionStorage.setItem('offsetY', document.documentElement.scrollTop);
    if (JSON.parse(sessionStorage.getItem('repoDetail')).name !== props.repo.name) {
      fetchData();
    } else {
      navigate(props.repo.name);
    }
  }

  return (
    <div className={styles.repoRow} onClick={handleClick}>
      <div className='d-flex align-items-center gap-2 mb-2'>
        <img className={`img-fluid ${styles.roundImage}`} src={userData.avatar_url} alt={userData.name} width='16px' height='16px' />
        <span className={`me-auto ${styles.repoRowOwnerTag}`}>{userData.name}</span>
        <span className={styles.repoRowOwnerTag}>
          <CreateTime created_at={props.repo.created_at} displayTime={false} />
        </span>
      </div>
      <p className={styles.repoName}>{props.repo.name}</p>
      {props.repo.description
        ? <p className={styles.description}>{props.repo.description}</p>
        : <p className={styles.description}>No description</p>
      }
      <div className={`d-flex align-items-center gap-2 ${styles.iconGroup}`}>
        <IconGroup repoData={props.repo} />
      </div>
      <hr className={styles.hr} />
    </div>
  );
})
