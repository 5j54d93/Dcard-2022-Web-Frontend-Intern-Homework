import React from 'react';
import { Link } from 'react-router-dom';

import FollowButton from './Components/FollowButton';
import CreateTime from './Components/CreateTime';
import IconGroup from './Components/IconGroup';

import styles from './Styles/RepoDetail.module.css';

export default function RepoDetail() {
  const repoData = JSON.parse(sessionStorage.getItem('repoDetail'));

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
}

function RepoOwner() {
  const userData = JSON.parse(sessionStorage.getItem('GitHubUser'));

  return (
    <div className='d-flex mb-4'>
      <Link className='d-flex align-items-center gap-2 me-auto' to={'/users/' + userData.login + '/repos'}>
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
    </div >
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
