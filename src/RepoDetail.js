import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FollowButton from './Components/FollowButton';
import CreateTime from './Components/CreateTime';
import IconGroup from './Components/IconGroup';

import styles from './Styles/RepoDetail.module.css';

export default function RepoDetail() {
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState(JSON.parse(sessionStorage.getItem('repoDetail')));

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
    if (!sessionStorage.page) {
      sessionStorage.setItem('page', 0);
    }
    if (!sessionStorage.offsetY) {
      sessionStorage.setItem('offsetY', 0);
    }
  })

  useEffect(() => {
    if (!sessionStorage.repoDetail || repo !== JSON.parse(sessionStorage.getItem('repoDetail')).name) {
      fetchGitHubUser();
      async function fetchGitHubUser() {
        const response = await fetch('https://api.github.com/users/' + owner);
        const json = await response.json();
        sessionStorage.setItem('GitHubUser', JSON.stringify(json));
        fetchRepoData();
      }
      async function fetchRepoData() {
        const response = await fetch('https://api.github.com/repos/' + owner + '/' + repo);
        const json = await response.json();
        sessionStorage.setItem('repoDetail', JSON.stringify(json));
        setRepoData(JSON.parse(sessionStorage.getItem('repoDetail')));
      }
    }
  })

  if (sessionStorage.repoDetail && repo === JSON.parse(sessionStorage.getItem('repoDetail')).name) {
    return (
      <div className='d-flex flex-fill align-items-center'>
        <main className={`container ${styles.repoDetail}`}>
          <RepoOwner />
          <h1 className='fs-2 mb-3'>{repoData.full_name}</h1>
          <Link to={'/users/' + repoData.owner.login + '/repos'} className={styles.repoListLink}>Repo List</Link>
          <span className={styles.creatAt}>・<CreateTime created_at={repoData.created_at} displayTime={true} /></span>
          <p className='description mt-4 mb-5'>{repoData.description}</p>
          <RepoTopics topics={repoData.topics} />
          <div className={`d-flex align-items-center gap-2 mt-4 ${styles.iconGroup}`}>
            <IconGroup repoData={repoData} />
            <a className={styles.btnGitHub} href={repoData.html_url} role='button' target='_blank' rel='noreferrer'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' className='bi bi-github' viewBox='0 0 16 16'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
              </svg>
            </a>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <Loading login={owner} />
    );
  }
}

function Loading(props) {
  return (
    <div className='d-flex flex-fill align-items-center'>
      <main className={`container ${styles.repoDetail}`}>
        <div className='d-flex mb-4'>
          <Link className='d-flex align-items-center gap-2 me-auto' to={'/users/' + props.login + '/repos'} >
            <img className={`img-fluid ${styles.roundImage}`} src='https://pbs.twimg.com/profile_images/792371348114845697/YYKpi3s6_400x400.jpg' alt='loading' width='32px' height='32px' />
            <div className='lh-1'>
              <span className={styles.name}>{props.login}</span>
              <br />
              <span className={styles.username}>@{props.login}</span>
            </div>
          </Link>
          <Link className={`d-flex align-items-center ms-3 me-1 ${styles.x}`} to={'/users/' + props.login + '/repos'}>
            <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 14 14'>
              <path fillRule='evenodd' d='M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z' />
              <path fillRule='evenodd' d='M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z' />
            </svg>
          </Link>
        </div>
        <h1 className='fs-2 mb-3'>Loading</h1>
        <Link to={'/users/' + props.login + '/repos'} className={styles.repoListLink}>Repo List</Link>
        <span className={styles.creatAt}>・22 Feb 2022  22：22</span>
        <p className='description mt-4 mb-5'>Loading</p>
        <div className={`d-flex align-items-center gap-2 mt-4 ${styles.iconGroup}`}>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-star-fill' viewBox='0 0 16 16'>
            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
          </svg>
          <span className='me-3'>7</span>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-diagram-2-fill' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-3 8A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5v-1z' />
          </svg>
          <span className='me-3'>7</span>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-code-slash' viewBox='0 0 16 16'>
            <path d='M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z' />
          </svg>
          <span className='me-auto'>Javascript</span>
          <a className={styles.btnGitHub} href='https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework' role='button' target='_blank' rel='noreferrer'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' className='bi bi-github' viewBox='0 0 16 16'>
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}

function RepoOwner() {
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));

  return (
    <div className='d-flex mb-4'>
      <Link className='d-flex align-items-center gap-2 me-auto' to={'/users/' + userData.login + '/repos'} >
        <img className={`img-fluid ${styles.roundImage}`} src={userData.avatar_url} alt={'GitHub user：' + userData.name} width='32px' height='32px' />
        <div className='lh-1'>
          <span className={styles.name}>{userData.name}</span>
          <br />
          <span className={styles.username}>@{userData.login}</span>
        </div>
      </Link>
      <FollowButton userData={userData} />
      <Link className={`d-flex align-items-center ms-3 me-1 ${styles.x}`} to={'/users/' + userData.login + '/repos'}>
        <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 14 14'>
          <path fillRule='evenodd' d='M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z' />
          <path fillRule='evenodd' d='M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z' />
        </svg>
      </Link>
    </div>
  );
}

function RepoTopics(props) {
  return (
    <div className='d-flex flex-wrap gap-2'>
      {props.topics.map((topic, index) => (
        <a className={styles.topic} href={'https://github.com/topics/' + topic} target='_blank' rel='noreferrer' key={index}>
          {topic}
        </a>
      ))}
    </div>
  );
}
