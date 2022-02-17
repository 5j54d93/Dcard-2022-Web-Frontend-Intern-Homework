import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
      <div className="d-flex flex-fill align-items-center">
        <main className="container my-4 p-5 repoDetailContainer">
          <RepoOwner owner={repoData.owner} />
          <h1 className='text-dark fs-2 mb-3'>{repoData.full_name}</h1>
          <Link to={"/users/" + owner + "/repos"} style={{ color: 'rgb(51, 151, 207)' }}>Repo List</Link>
          <PublishTime pushed_at={repoData.pushed_at} />
          <p className="description mt-4 mb-5">{repoData.description}</p>
          <RepoTopics topics={repoData.topics} />
          <div className="text-light-gray d-flex flex-wrap align-items-center gap-2 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="starIcon bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span className='me-3'>{repoData.stargazers_count}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-diagram-2-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-3 8A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5v-1z" />
            </svg>
            <span className='me-3'>{repoData.forks_count}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="codeIcon bi bi-code-slash" viewBox="0 0 16 16">
              <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
            </svg>
            <span className='me-auto'>{repoData.language}</span>
            <a className="btn-light-blue mt-auto" href={repoData.html_url} role="button" target='_blank' rel="noreferrer">View on GitHub</a>
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
    <div className="d-flex align-items-center gap-2 mb-4">
      <img className="img-fluid" style={{ borderRadius: '50%' }} src={props.owner.avatar_url} alt={'GitHub user：' + props.owner.login} width='32px' height='32px' />
      <span className='text-dark-gray fs-5 fw-light me-auto'>{props.owner.login}</span>
      <Link className='text-light-gray' to={"/users/" + props.owner.login + "/repos"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 14 14">
          <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
          <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
        </svg>
      </Link>
    </div>
  );
}

PublishTime.defaultProps = {
  publicTime: ''
}
function PublishTime(props) {
  const publicTime = new Date(props.pushed_at);
  return (
    <span className="text-light-gray">・{publicTime.getFullYear()}年{publicTime.getMonth() + 1}月{publicTime.getDate() + 1}日 {publicTime.getHours()}:{publicTime.getMinutes()}</span>
  );
}

RepoTopics.defaultProps = {
  topics: []
}
function RepoTopics(props) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {props.topics.map((topic, index) => (
        <span className="topic" key={index}>
          {topic}
        </span>
      ))}
    </div>
  );
}
