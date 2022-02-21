import React, { useState, useEffect, memo } from 'react';
import { Link, useParams } from 'react-router-dom';

import CreateTime from './Components/CreateTime';
import FollowButton from './Components/FollowButton';
import IconGroup from './Components/IconGroup';

// API call
function FetchGitHubUser(username) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = 'https://api.github.com/users/' + username
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (json.message === 'Not Found') {
          json.login = username;
          json.name = 'No Such User';
          json.followers = 0; json.following = 0;
          json.avatar_url = 'https://pbs.twimg.com/profile_images/792371348114845697/YYKpi3s6_400x400.jpg';
        }
        setData(json);
        sessionStorage.setItem('GitHubUser', JSON.stringify(json));
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

export default function UserPage() {
  let { owner } = useParams();
  const userData =
    sessionStorage.GitHubUser && JSON.parse(sessionStorage.getItem('GitHubUser')).login === owner
      ? JSON.parse(sessionStorage.getItem('GitHubUser'))
      : FetchGitHubUser(owner);

  return (
    <div className='d-flex flex-fill align-items-center'>
      <div className='container my-4 backContainer'>
        <div className='frontContainer'>
          <main className='userPageContent'>
            <GitHubUser username={userData.login} userData={userData} />
            <div className='container repoRowContainer p-4 mt-2'>
              {userData.message === 'Not Found'
                ? <div className='fs-3 text-center text-middle-blue'>No Such User.</div>
                : userData.public_repos === 0
                  ? <div className='fs-3 text-center text-middle-blue'>Haven't created any repository yet.</div>
                  : <RepoList username={userData.login} userData={userData} />
              }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function GitHubUser(props) {
  return (
    <>
      <img className='ms-2 my-3' style={{ borderRadius: '50%', border: '6px solid rgb(242,243,244)' }} src={props.userData.avatar_url} alt={props.userData.name} width='142px' height='142px' />
      <header className='d-flex align-items-end ms-2 mb-3 gap-1'>
        <div className='text-dark fs-5 fw-bold lh-1 me-auto'>
          {props.userData.name}
          <br />
          <span className='text-light-gray fw-light' style={{ fontSize: '0.9rem' }}>
            @{props.username}
            <br />
            {props.userData.followers} followers · {props.userData.following} following
          </span>
        </div>
        {props.userData.message === 'Not Found'
          ? <a className='btn-light-blue' href='/Dcard-2022-Web-Frontend-Intern-Homework' role='button'>Search another User</a>
          : <FollowButton avatarUrl={props.userData.avatar_url} name={props.userData.name} username={props.username} />
        }
      </header>
      <p className='text-dark-gray fs-6 fw-light'>{props.userData.bio}</p>
      <hr />
      <span className='text-dark-gray' style={{ fontSize: '0.8rem' }}>All Public Repositories</span>
    </>
  );
}

function RepoList(props) {
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
        <RepoRow repo={repo} userData={props.userData} key={index} />
      ))}
      <Progress page={page} publicRepoNum={props.userData.public_repos} />
    </>
  );
}

const RepoRow = memo(function RepoRow(props) {
  return (
    <Link to={props.repo.name}>
      <div className='d-flex flex-wrap align-items-center gap-2 lh-1 mb-2'>
        <img className='img-fluid' style={{ borderRadius: '50%' }} src={props.userData.avatar_url} alt={props.userData.name} width='20px' height='20px' />
        <span className='text-dark-gray fs-6 fw-light me-auto' style={{ fontSize: '0.8rem' }}>{props.userData.name}</span>
        <span className='text-dark-gray fs-6 fw-light' style={{ fontSize: '0.8rem' }}><CreateTime created_at={props.repo.created_at} displayTime={false} /></span>
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

function Progress(props) {
  return (
    10 * props.page < props.publicRepoNum
      ?
      <div className='text-center text-middle-blue'>
        <div className='spinner-border align-middle' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
      :
      <div className='fs-5 text-center text-middle-blue'>No more repository</div>
  );
}
