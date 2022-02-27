# Dcard 2022 Web Frontend Intern Homework

---

 _**！！！Add badge here！！！**_

---

> [Dcard 2022 Web Frontend Intern Homework.pdf](https://drive.google.com/file/d/1niPucGwf9qGEpLokVptK2a1zNeReS8WL/view)

A [**React**](https://reactjs.org) app designed like [**Dcard**](https://www.dcard.tw) with [Bootstrap](https://github.com/twbs/bootstrap) that could：

- search users/organizations on [GitHub](https://github.com)
- list user's/organization's all repositories with `Infinite Scroll` from [**GitHub REST API**](https://docs.github.com/en/rest)
- read repository's detail from [**GitHub REST API**](https://docs.github.com/en/rest)
- follow or unfollow a user/organization which data store in `localStorage`

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

- `route` at [`/users/{username}/repos`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2c216529e3b8e7bbbb6ea4944dc0a982e63f99e0/src/index.js#L18)
- first check if what user search had already saved in `sessionStorage`
  - if yes：get data from `sessionStorage`
  - else：fetch data from API call [`GET /users/{username}`](https://docs.github.com/en/rest/reference/users#get-a-user)
    - when fetch data from API, also save it in `sessionStorage`

```jsx
const userData =
    sessionStorage.GitHubUser && JSON.parse(sessionStorage.getItem('GitHubUser')).login === owner
      ? JSON.parse(sessionStorage.getItem('GitHubUser'))
      : FetchGitHubUser(owner);
```

- if username isn't exit：show「No Such User」
- else if number of user's repo == 0：show「Haven't created any repository yet」
  - else：list all repositories

```jsx
{userData.message === 'Not Found'
  ? <div className='fs-3 text-center text-middle-blue'>No Such User.</div>
  : userData.public_repos === 0
    ? <div className='fs-3 text-center text-middle-blue'>Haven't created any repository yet.</div>
    : <RepoList username={owner} userData={userData} />
}
```

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/No-Such-User.png" width='50%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Haven't-created-any-repo-yet.png" width='50%' height='100%'/>

1. [**`GitHubUser()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/8786c282a180f0b13a866f35e7f4aa9ca353799a/src/UserPage.js#L85-L109)
   - if username isn't exit：show「Search another User」button, which onClick will go back to [`Home`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Home.js)
   - else：show [`FollowButton`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Components/FollowButton.js)

```jsx
{props.userData.message === 'Not Found'
  ? <a className='btn-light-blue' href='/' role='button'>Search another User</a>
  : <FollowButton avatarUrl={props.userData.avatar_url} name={props.userData.name} username={props.username} />
}
```

2. [**`RepoList()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/8786c282a180f0b13a866f35e7f4aa9ca353799a/src/UserPage.js#L111-L139)
   - handle infinite scroll
   - using `Math.round()` for work well in Chrome

```jsx
if (
  Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight
  &&
  10 * page < props.userData.public_repos
)
```

3. [**`RepoRow()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/327e93da2d5445899d59f10c4d4809b4e11beddd/src/UserPage.js#L141-L157)
   - use `memo` to prevent re-render the whole `RepoList()` while fetch the next 10 repos
   - which means only render the next 10 new repo！

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Prevent-Rerender-RepoRow.gif" width='100%' height='100%'/>

4. [**`Progress()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/327e93da2d5445899d59f10c4d4809b4e11beddd/src/UserPage.js#L159-L171)
   - show「ProgressView」or「No more repository」depends on wether there's more repo to load

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/UserPage.png" width='100%' height='100%'/>

### [RepoDetail.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js)：display repository details

- `route` at [`/users/{username}/repos/{repo}`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2c216529e3b8e7bbbb6ea4944dc0a982e63f99e0/src/index.js#L19)
- fetch data from API call：[`GET /repos/{owner}/{repo}`](https://docs.github.com/en/rest/reference/repos#get-a-repository)
  - `.owner.avatar_url`：owner's avatar url
  - `.owner.login`：owner's username
  - `.full_name`：repo title
  - `.created_at`：the time when the repo been created
  - `.description`：repo description
  - `.topics`：array of repo's topics
  - `.stargazers_count`：repo's stars count
  - `.forks_count`：repo's forks count
  - `.language`：repo's language
  - `.html_url`：external link to GitHub repository page

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/RepoDetail.png" width='100%' height='100%'/>

### [Components/](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/tree/main/src/Components)：used not only on one page

- [**`CreateTime.js`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Components/CreateTime.js)
  - use `memo` to prevent re-render
  - reusable：use `props.displayTime` to display
    - day month year on [`RepoRow`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/327e93da2d5445899d59f10c4d4809b4e11beddd/src/UserPage.js#L141-L157)
    - day month year time on [`RepoDetail`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js)
- [**`IconGroup.js`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Components/IconGroup.js)
  - use `memo` to prevent re-render
- [**`FollowButton.js`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Components/FollowButton.js)
  - return Following or Follow depends on wether the username is saved in [`localStorage`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2d24cf9a754c6076e46cb27ea9c89e3bf14f4a18/src/Components/FollowButton.js#L6)
  - save or delete user data in `localStorage` while the button [onClick](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2d24cf9a754c6076e46cb27ea9c89e3bf14f4a18/src/Components/FollowButton.js#L17)

## Learn More

### Rate Limit

If [5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework](https://5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework) or this React app that run on your computer didn't work well, you may exceed GitHub Rest API Rate Limit which is up to 60 requests per hour. For more information, [view this official doc](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).

### Better User Experience on small Devices

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

### Use Console like Dcard

### 🥰 Dcard Favicon！～

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/DcardFavicon.png" width='50%' height='100%'/>

## License

This package is [MIT licensed](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/LICENSE).
