import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function RepoDetail() {
  let { owner, repo } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/" + owner + "/" + repo)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [owner, repo])

  if (error) {
    return <div className="container">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="d-flex flex-fill">
        <div className="container">
          <RepoDetailHeader full_name='Loading...' />
          <RepoDetailBackToList owner={owner} />
          <RepoDetailCard name='Loading...' description='Loading...' stargazers_count='Loading...' forks_count='Loading...' language='Loading...' />
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-fill">
        <div className="container">
          <RepoDetailHeader full_name={items.full_name} />
          <RepoDetailBackToList owner={owner} />
          <RepoDetailCard name={items.name} description={items.description} stargazers_count={items.stargazers_count} forks_count={items.forks_count} language={items.language} html_url={items.html_url} />
        </div>
      </div>
    );
  }
}

class RepoDetailHeader extends Component {
  render() {
    return (
      <h2 className="alert alert-primary text-center text-white my-3" role="alert">
        {this.props.full_name}
      </h2>
    );
  }
}

class RepoDetailBackToList extends Component {
  render() {
    return (
      <Link className="btn btn-outline-primary btnBack mb-3" to={"/users/" + this.props.owner + "/repos"} role="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
        </svg> Back to Repository List
      </Link>
    );
  }
}

class RepoDetailCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title p-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-journal-bookmark" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>
            {this.props.name}
          </h3>
          <div className="card-text my-2 ps-1"><b>Description：</b>{this.props.description}</div>
          <ul>
            <li className="card-text"><b>Total Starts Earned：</b>{this.props.stargazers_count}</li>
            <li className="card-text"><b>Forks Count：</b>{this.props.forks_count}</li>
            <li className="card-text"><b>Language：</b>{this.props.language}</li>
          </ul>
          <div className='d-flex justify-content-end'>
            <a href={this.props.html_url} className="btn btn-outline-secondary stretched-link" target='_blank' rel="noreferrer" role='button'>Repository on GitHub</a>
          </div>
        </div>
      </div>
    );
  }
}
