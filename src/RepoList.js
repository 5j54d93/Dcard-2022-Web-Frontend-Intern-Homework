import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import CreateTime from './CreateTime';
import IconGroup from './IconGroup';

// API call
function FetchGitHubUser(username) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = 'https://api.github.com/users/' + username
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
  }, [username]);

  return data;
}

// API call
function FetchUserRepos(username, page) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = 'https://api.github.com/users/' + username + '/repos?sort=created&per_page=10&page=' + page;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData([...data, ...json]);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [username, page]);

  return data;
}

export default function RepoList() {
  let { owner } = useParams();
  let userData = FetchGitHubUser(owner);

  if (userData.message === 'Not Found') {
    userData.avatar_url = 'https://pbs.twimg.com/profile_images/1259107362805170177/UZ7yQGYr_400x400.jpg';
    userData.name = 'No Such User';
    userData.followers = 0;
    userData.following = 0;
    userData.html_url = '/Dcard-2022-Web-Frontend-Intern-Homework';
    return (
      <div className="d-flex flex-fill align-items-center">
        <div className="container my-4 backContainer">
          <div className="px-5 frontContainer">
            <main className="repoListContent">
              <GitHubUser username={owner} userData={userData} btnValue='Search another user' />
              <div className="container repoRowContainer p-4 mt-2">
                <div className='fs-3 text-center text-middle-blue'>No Such User.</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  } else if (userData.public_repos === 0) {
    return (
      <div className="d-flex flex-fill align-items-center">
        <div className="container my-4 backContainer">
          <div className="px-5 frontContainer">
            <main className="repoListContent">
              <GitHubUser username={owner} userData={userData} btnValue='View on GitHub' />
              <div className="container repoRowContainer p-4 mt-2">
                <div className='fs-3 text-center text-middle-blue'>Haven't created any repository yet.</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-fill align-items-center">
        <div className="container my-4 backContainer">
          <div className="px-5 frontContainer">
            <main className="repoListContent">
              <GitHubUser username={owner} userData={userData} btnValue='View on GitHub' />
              <div className="container repoRowContainer p-4 mt-2">
                <RepoRow username={owner} userData={userData} />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

function GitHubUser(props) {
  return (
    <>
      <img className="ms-2 my-3" style={{ borderRadius: '50%', border: '6px solid rgb(242,243,244)' }} src={props.userData.avatar_url} alt={props.userData.name} width='142px' height='142px' />
      <header className="d-flex flex-wrap ms-2 mb-3 gap-1">
        <div className='text-dark fs-5 fw-bold lh-1 me-auto mb-2'>
          {props.userData.name}<br />
          <span className='text-light-gray fw-light' style={{ fontSize: '0.9rem' }}>@{props.username}</span>
          <br />
          <span className='text-light-gray fw-light' style={{ fontSize: '0.9rem' }}>{props.userData.followers} followers · {props.userData.following} following</span>
        </div>
        <a className="btn-light-blue mt-auto" href={props.userData.html_url} role="button">{props.btnValue}</a>
      </header>
      <p className='text-dark-gray fs-6 fw-light'>{props.userData.bio}</p>
      <hr />
      <span className='text-dark-gray' style={{ fontSize: '0.8rem' }}>All Public Repositories</span>
    </>
  );
}

function RepoRow(props) {
  const [page, setPage] = useState(1);
  const repoData = FetchUserRepos(props.username, page);

  useEffect(() => {
    function infiniteScroll() {
      if (
        Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight
        &&
        10 * page < props.userData.public_repos
      ) {
        setPage(page + 1);
      }
    }
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [page, props.userData.public_repos])

  return (
    <>
      {repoData.map((repo, index) => (
        <Link to={repo.name} key={index}>
          <div className="d-flex flex-wrap align-items-center gap-2 lh-1 mb-2">
            <img className="img-fluid" style={{ borderRadius: '50%' }} src={props.userData.avatar_url} alt={props.userData.name} width='20px' height='20px' />
            <span className='text-dark-gray fs-6 fw-light me-auto' style={{ fontSize: '0.8rem' }}>{props.userData.name}</span>
            <span className='text-dark-gray fs-6 fw-light' style={{ fontSize: '0.8rem' }}><CreateTime created_at={repo.created_at} displayTime={false} /></span>
          </div>
          <p className='text-dark fs-5 fw-bold'>{repo.name}</p>
          <p className='text-black mb-3' style={{ fontSize: '0.9rem' }}>{repo.description}</p>
          <div className="text-light-gray d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
            <IconGroup starsCount={repo.stargazers_count} forksCount={repo.forks_count} language={repo.language} />
          </div>
          <hr className='text-dark-gray' />
        </Link>
      ))}
      <Progress page={page} publicRepoNum={props.userData.public_repos} />
    </>
  );
}

function Progress(props) {
  if (10 * props.page < props.publicRepoNum) {
    return (
      <div className='text-center text-middle-blue'>
        <div className="spinner-border align-middle" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className='fs-5 text-center text-middle-blue'>No more repository</div>
    );
  }
}
