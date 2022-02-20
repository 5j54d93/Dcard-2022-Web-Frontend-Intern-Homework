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
- default at [Home](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Home.js)

```jsx
ReactDOM.render(
  <React.StrictMode>
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
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

### [Home.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Home.js)：for search a GitHub user ＆ list all following users

1. [**`Search()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/ffa33d92b4c7434372286a3bc01770b1e4ca6420/src/Home.js#L17-L54)
   - a search bar for user to input a GitHub username
   - can't search if there's no input
2. [**`FollowingUser()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/eba05fb1c4a56daef4b983e00f534f3dcb67ae62/src/Home.js#L56-L81)
   - list all following users
   - data from `localStorage`

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Home.png" width='100%' height='100%'/>

### [UserPage.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/UserPage.js)：show the GitHub user's info ＆ list all repositories

- first check if what user search had already saved in `sessionStorage`
  - if yes：get data from `sessionStorage`
  - else：fetch data from API call [`GET /users/{username}`](https://docs.github.com/en/rest/reference/users#get-a-user)
- [link to code below](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2824d3745cf60c43d34638ef1ee50c0da5a21cb2/src/UserPage.js#L60-L62)

```jsx
const userData =
    sessionStorage.GitHubUser && JSON.parse(sessionStorage.getItem('GitHubUser')).login === owner
      ? JSON.parse(sessionStorage.getItem('GitHubUser'))
      : FetchGitHubUser(owner);
```

- if username isn't exit：show「Search another User」button, that click will go back to search page
- else：show「follow」button
- [link to code below](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2824d3745cf60c43d34638ef1ee50c0da5a21cb2/src/UserPage.js#L99-L102)

```jsx
{props.userData.message === 'Not Found'
  ? <a className='btn-light-blue' href='/' role='button'>Search another User</a>
  : <FollowButton avatarUrl={props.userData.avatar_url} name={props.userData.name} username={props.username} />
}
```

- if username isn't exit：show「No Such User」
- else if number of user's repo == 0：show「Haven't created any repository yet」
  - else：list all repositories
- [link to code below](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2824d3745cf60c43d34638ef1ee50c0da5a21cb2/src/UserPage.js#L71-L76)

```jsx
{userData.message === 'Not Found'
  ? <div className='fs-3 text-center text-middle-blue'>No Such User.</div>
  : userData.public_repos === 0
    ? <div className='fs-3 text-center text-middle-blue'>Haven't created any repository yet.</div>
    : <RepoList username={owner} userData={userData} />
}
```

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/UserPage.png" width='100%' height='100%'/>



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
