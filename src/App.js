import React, { useState } from "react";

export default function App() {
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');

  const onChangeHandler = (event) => {
    setUsername(event.target.value);
    setUrl('/users/' + event.target.value + '/repos');
  };

  const onSubmitHandler = () => { }

  return (
    <div className="d-flex align-items-center flex-fill">
      <div className="container">
        <form onSubmit={onSubmitHandler} action={url}>
          <label htmlFor="InputGitHubUsername" className="form-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 20 20">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub Username
          </label>
          <div className="input-group">
            <input type="search" className="form-control form-control-lg" placeholder="Search for GitHub user" aria-label="GitHub username" aria-describedby="GitHubUsername" value={username} onChange={onChangeHandler} autoFocus={true} required />
            <button className="btn btn-secondary" type="submit" id="searchButton" aria-label="search a GitHub user's repositories">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search mx-1" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
          <div className="form-text">Input a GitHub username to view all his/her repositories.</div>
        </form>
      </div>
    </div>
  );
}
