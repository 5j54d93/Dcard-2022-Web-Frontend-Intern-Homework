# Dcard 2022 Web Frontend Intern Homework

---

 _**！！！Add badge here！！！**_

---

A [**React**](https://reactjs.org) app designed with [Bootstrap](https://github.com/twbs/bootstrap) like [**Dcard**](https://www.dcard.tw) that could：

- search users/organizations on [GitHub](https://github.com)
- list a [GitHub](https://github.com) user's/organization's all repositories from [**GitHub REST API**](https://docs.github.com/en/rest)
- read repository's detail from [**GitHub REST API**](https://docs.github.com/en/rest)
- follow or unfollow a user/organize

> [Dcard 2022 Web Frontend Intern Homework.pdf](https://drive.google.com/file/d/1niPucGwf9qGEpLokVptK2a1zNeReS8WL/view)

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Demo.gif" width='100%' height='100%'/>

## Overview

1. [**How To Use**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#how-to-use)
   - [On GitHub Page](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#on-github-page)
   - [On Your Computer](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#on-your-computer)
2. [**Architecture Design**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#architecture-design)
3. [**Learn More**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#learn-more)
4. [**LICENSE**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#license)

## How To Use

### On GitHub Page

🎊 This React app had deployed on GitHub page, so you could try it on [**5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework**](https://5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework)！

### On Your Computer

0. Your computer should have downloaded [Node.js](https://nodejs.org/en) before（Node >= 14.0.0 and npm >= 5.6）

1. Download this repository

```shell
git clone https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework
```

2. Change directories to this repository

```shell
cd Dcard-2022-Web-Frontend-Intern-Homework
```

3. Run this React app

```shell
npm install
npm start
```

`npm start` will automatically open [**http://localhost:3000**](http://localhost:3000) on your computer.

## Architecture Design

### [index.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/index.js)：for direct route

- every page will have [Navbar](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Navbar.js) and [Footer](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Footer.js)
- default at [Search](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Search.js)

```jsx
ReactDOM.render(
  <React.StrictMode>
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/users/:owner/repos' element={<UserPage />} />
          <Route path='/users/:owner/repos/:repo' element={<RepoDetail />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### [Search.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Search.js)：for search a GitHub user ＆ list all following users

1. **Search Bar**
   - a form for user to input a GitHub username
   - can't search if there's no input
2. **Following Users**
   - list all following users
   - data from `localStorage`
   - use [`memo`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/336b48f299b00c9c4862664f214ac38942f0c8fb/src/Search.js#L50) to prevent re-render while input username

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Search.png" width='100%' height='100%'/>

### [RepoList.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoList.js)：list all the GitHub user's repositories

- check wether a user exist or not from API call：[`GET /users/{username}`](https://docs.github.com/en/rest/reference/users#get-a-user)
- [Link to code](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/177b5b1d0af12f8d1a8fc484c2358ab0f065bbfe/src/RepoList.js#L50-L61)

```jsx
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
```

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/No-such-user.png" width='100%' height='100%'/>

- if no：display「No such user」
- if yes：fetch his/her public repositories from API call：[`GET /users/{username}/repos`](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user)
- [Link to code](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/177b5b1d0af12f8d1a8fc484c2358ab0f065bbfe/src/RepoList.js#L80-L90)
```jsx
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
```

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Haven't-created-any-repository-yet.png" width='100%' height='100%'/>

- if repositoy count == 0：display「Haven't created any repository yet」
- else：list all his/her repositories
  - using [parameter](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user--parameters)
    - `per_page=10`：fetch 10 repositories per `page` on every API call
    - `page`：default = 1
  - infinite scroll：using `Math.round` to work well on Chrome
  - [Link to code](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/177b5b1d0af12f8d1a8fc484c2358ab0f065bbfe/src/RepoList.js#L63-L78)

```jsx
if (
  Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight
  &&
  10 * this.state.page < this.state.publicRepoNum
)
```

- if reach bottom of the page && there's more repositories to fetch
  - increase `page` by 1
  - call API
  - show「progress view」at table foot
- else：
  - do nothing（won't call API）
  - show「No more repository」at table foot

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/RepoList.png" width='100%' height='100%'/>
<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/No-more-repository.png" width='100%' height='100%'/>

### [RepoDetail.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js)：display repository details
- fetch data from API call：[`GET /repos/{owner}/{repo}`](https://docs.github.com/en/rest/reference/repos#get-a-repository)
  - `.name`：repo title
  - `.description`：repo description
  - `.stargazers_count`：repo stars count
  - `.forks_count`：repo forks count
  - `.language`：repo language
  - `.html_url`：external link to GitHub repository page

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/RepoDetail.png" width='100%' height='100%'/>

## Learn More

### Rate Limit

If [5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework](https://5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework) or this React app that run on your computer didn't work well, you may exceed GitHub Rest API Rate Limit which is up to 60 requests per hour. For more information, [view this official doc](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).

### Responsive Web Design

Thanks to Bootstrap, our React app could response well on every different devices！

### Lighthouse：PageSpeed Insights

#### All performance scores got 100 on desktop.

#### [App](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/App.js) on mobile

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Lighthouse：App.png" width='100%' height='100%'/>

#### [RepoList](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoList.js) on mobile

Performance score got orange（50-89）because of using Bootstrap which cost 0.15s to load.

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Lighthouse：RepoList.png" width='100%' height='100%'/>

#### [RepoDetail](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js) on mobile

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Lighthouse：RepoDetail.png" width='100%' height='100%'/>

### 🥰 Dcard Favicon！～

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/DcardFavicon.png" width='50%' height='100%'/>

## License

This package is [MIT licensed](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/LICENSE).
