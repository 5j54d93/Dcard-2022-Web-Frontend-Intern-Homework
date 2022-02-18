import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import CreateTime from './CreateTime';
import IconGroup from './IconGroup';

// API call
function FetchRepoData(owner, repo) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = 'https://api.github.com/repos/' + owner + '/' + repo;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [owner, repo]);

  return data;
}

export default function RepoDetail() {
  let { owner, repo } = useParams();
  const repoData = FetchRepoData(owner, repo);

  if (repoData) {
    return (
      <div className='d-flex flex-fill align-items-center'>
        <main className='container my-4 p-5 repoDetailContainer'>
          <RepoOwner owner={repoData.owner} />
          <h1 className='text-dark fs-2 mb-3'>{repoData.full_name}</h1>
          <Link to={'/users/' + owner + '/repos'} style={{ color: 'rgb(51, 151, 207)' }}>Repo List</Link>
          <span className='text-light-gray'>・<CreateTime created_at={repoData.created_at} displayTime={true} /></span>
          <p className='description mt-4 mb-5'>{repoData.description}</p>
          <RepoTopics topics={repoData.topics} />
          <div className='text-light-gray d-flex flex-wrap align-items-center gap-2 mt-4'>
            <IconGroup starsCount={repoData.stargazers_count} forksCount={repoData.forks_count} language={repoData.language} />
            <a className='btn-light-blue mt-auto' href={repoData.html_url} role='button' target='_blank' rel='noreferrer'>View on GitHub</a>
          </div>
        </main>
      </div>
    );
  }
}

RepoOwner.defaultProps = {
  owner: {
    login: '',
    avatar_url: ''
  }
}
function RepoOwner(props) {
  return (
    <div className='d-flex mb-4'>
      <Link className='d-flex align-items-center gap-2 me-auto' to={'/users/' + props.owner.login + '/repos'}>
        <img className='img-fluid' style={{ borderRadius: '50%' }} src={props.owner.avatar_url} alt={'GitHub user：' + props.owner.login} width='32px' height='32px' />
        <span className='text-dark-gray fs-5 fw-light'>{props.owner.login}</span>
      </Link>
      <Link className='text-light-gray' to={'/users/' + props.owner.login + '/repos'}>
        <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 14 14'>
          <path fillRule='evenodd' d='M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z' />
          <path fillRule='evenodd' d='M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z' />
        </svg>
      </Link>
    </div>
  );
}

RepoTopics.defaultProps = {
  topics: []
}
function RepoTopics(props) {
  return (
    <div className='d-flex flex-wrap gap-2'>
      {props.topics.map((topic, index) => (
        <a className='topic' href={'https://github.com/topics/' + topic} target='_blank' rel='noreferrer' key={index}>
          {topic}
        </a>
      ))}
    </div>
  );
}
