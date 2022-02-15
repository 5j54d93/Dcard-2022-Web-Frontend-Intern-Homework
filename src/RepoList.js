import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function RepoList() {
  let { owner } = useParams();
  return (
    <div class="d-flex flex-fill">
      <div class="container">
        <h2 class="alert alert-primary text-center text-white my-3" style={{ background: 'rgb(51,151,207)', border: 'rgb(51,151,207)' }} role="alert">
          GitHub Username：{owner}
        </h2>
        <BackToHome />
        <div class="table-responsive-sm">
          <table class="table table-hover table-bordered">
            <thead style={{ background: 'rgb(3, 106, 166)' }}>
              <tr class='text-white'>
                <th class='align-middle text-center' scope="col">#</th>
                <th class='align-middle text-center' scope="col">Repositories</th>
                <th class='align-middle text-center' scope="col">Stars Earned</th>
              </tr>
            </thead>
            <RepoRow username={owner} />
          </table>
        </div>
      </div>
    </div>
  );
}

class RepoRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      page: 1,
      message: '',
      publicRepoNum: 0
    };
  }

  componentDidMount = () => {
    this.checkUser();
    if (this.state.message !== "Not Found") {
      window.addEventListener('scroll', this.infiniteScroll);
      this.fetchData(this.state.page);
    }
  }

  checkUser = () => {
    let url = 'https://api.github.com/users/' + this.props.username

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          message: data.message,
          publicRepoNum: data.public_repos
        })
      });
  }

  infiniteScroll = () => {
    // End of the document reached?
    if (
      Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight
      &&
      10 * this.state.page < this.state.publicRepoNum
    ) {
      let newPage = this.state.page;
      newPage++;
      this.setState({
        page: newPage
      });

      this.fetchData(newPage);
    }
  }

  fetchData = (pageNum) => {
    let Url = 'https://api.github.com/users/' + this.props.username + '/repos?per_page=10&page=' + pageNum;

    fetch(Url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: [...this.state.repos, ...data]
        })
      });
  }

  render() {
    if (this.state.message === "Not Found") {
      return (
        <tbody style={{ color: 'black', background: 'white' }}>
          <tr>
            <td class='text-center py-5' colspan="3"><h2>No such user</h2></td>
          </tr>
        </tbody>
      );
    } else if (this.state.repos.length === 0) {
      return (
        <tbody style={{ color: 'black', background: 'white' }}>
          <tr>
            <td class='text-center py-5' colspan="3"><h2>Haven't created any repository yet.</h2></td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody style={{ color: 'black', background: 'white' }}>
          {this.state.repos.map((repo, index) => (
            <tr>
              <th class='align-middle text-center' scope="row">
                {index + 1}
              </th>
              <td>
                <div class='fs-5' style={{ fontWeight: '500' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-bookmark" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z" />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                  </svg>
                  <Link style={{ color: 'rgb(3, 106, 166)' }} to={repo.name}>{repo.name}</Link>
                </div>
                <div>{repo.description}</div>
                <div>
                  {repo.topics.map((topic, index) =>
                    <span class="badge rounded-pill me-1" style={{ background: 'rgb(51,151,207)' }} key={index}>{topic}</span>
                  )}
                </div>
              </td>
              <td class='align-middle text-center'>
                {repo.stargazers_count}
              </td>
            </tr>
          ))}
          <LoadMore page={this.state.page} publicRepoNum={this.state.publicRepoNum} />
        </tbody>
      );
    }
  }
}

class BackToHome extends Component {
  render() {
    return (
      <Link class="btn btn-outline-primary mb-3" to='/' role='button'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
        </svg> Search for another user
      </Link>
    );
  }
}

class LoadMore extends Component {
  render() {
    if (10 * this.props.page < this.props.publicRepoNum) {
      return (
        <tr>
          <th class='text-center text-white' style={{ background: 'rgb(3, 106, 166)' }} colspan="3">
            <div class="spinner-border align-middle" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th class='text-center text-white' style={{ background: 'rgb(3, 106, 166)' }} colspan="3">No more repository</th>
        </tr>
      );
    }
  }
}
