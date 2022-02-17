import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
    let url = 'https://api.github.com/users/' + username + '/repos?per_page=10&page=' + page;
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
    userData.html_url = '/';
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
      <header className="d-flex ms-2 mb-3">
        <div className='text-dark fs-5 fw-bold lh-1 me-auto'>
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
    <div>
      {repoData.map((repo, index) => (
        <Link to={repo.name} key={index}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <img className="img-fluid" style={{ borderRadius: '50%' }} src={props.userData.avatar_url} alt={props.userData.name} width='20px' height='20px' />
            <span className='text-dark-gray fs-6 fw-light' style={{ fontSize: '0.8rem' }}>{props.userData.name}</span>
          </div>
          <p className='text-dark fs-5 fw-bold'>{repo.name}</p>
          <p className='text-black mb-3' style={{ fontSize: '0.9rem' }}>{repo.description}</p>
          <div className="text-light-gray d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="starIcon bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span className='me-3'>{repo.stargazers_count}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-diagram-2-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-3 8A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5v-1z" />
            </svg>
            <span className='me-3'>{repo.forks_count}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="codeIcon bi bi-code-slash" viewBox="0 0 16 16">
              <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
            </svg>
            {repo.language}
          </div>
          <hr className='text-dark-gray' />
        </Link>
      ))}
      <Progress page={page} publicRepoNum={props.userData.public_repos} />
    </div>
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
