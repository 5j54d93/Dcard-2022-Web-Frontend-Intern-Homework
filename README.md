# Dcard 2022 Web Frontend Intern Homework

---

 _**！！！Add badge here！！！**_

---

> [Dcard 2022 Web Frontend Intern Homework.pdf](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/File/2022%20Web%20Frontend%20Intern%20Homework.pdf)

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
2. [**Architecture Design & Explanation**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#architecture-design--explanation)
   - [index.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#indexjsfor-direct-route)：for direct route
   - [Home.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#homejsfor-search-a-github-username--list-all-following-users)：for search a GitHub username ＆ list all following users
   - [UserPage.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#userpagejsfor-display-github-user--hisher-all-repositories)：for display GitHub user ＆ his/her all repositories
   - [RepoDetail.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#repodetailjsfor-display-repository-details)：for display repository details
   - [Components](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#componentsused-not-only-on-one-page)：used not only on one page
3. [**Learn More**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#learn-more)
   - [Rate Limit](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#rate-limit)
   - [Responsive Web Design](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#responsive-web-design)
   - [Better User Experience on small Devices](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#better-user-experience-on-small-devices)
4. [**LICENSE**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#license)：MIT

## How To Use

### On GitHub Page

🎊 This React app had deployed on GitHub page, you could try it on [**5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework**](https://5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework)！

### On Your Computer

0. Your computer should have downloaded [Node.js](https://nodejs.org/en) before（Node >= 14.0.0 and npm >= 5.6）

1. Download this repository via `git clone` or from Releases

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

## Architecture Design & Explanation

### [index.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/index.js)：for direct route

- every page will have [Navbar](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Navbar.js) and [Footer](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Footer.js)
- [Home](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Home.js)：route at `/`
- [UserPage](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/UserPage.js)：route at `/users/{username}/repos`
- [RepoDetail](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js)：route at `/users/{username}/repos/{repo}`

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

### [Home.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Home.js)：for search a GitHub username ＆ list all following users

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Home.png" width='100%' height='100%'/>

1. [**`SearchBar()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/b594b54a099a30a667a19790a0f4d0a75422421f/src/Home.js#L34-L83)
   - a search bar for user to input GitHub username
   - can't submit if there's no input
   - use `useRef()` to prevent re-render while user is typing
   - prepare data `onSubmit` before navigate to `UserPage` to ensure that `UserPage` will already have data to show on first render（won't render twice）
   - store data that fetch from API in `sessionStorage` to prevent API recall if we need the same data later
2. [**`FollowingUsers()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/b594b54a099a30a667a19790a0f4d0a75422421f/src/Home.js#L85-L98)
   - list all following users stored in `localStorage`
   - prepare data `onClick` before navigate to `UserPage` to ensure that `UserPage` will already have data to show on first render（won't render twice）
   - store data that fetch from API in `sessionStorage` to prevent API recall if we need the same data later

### [UserPage.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/UserPage.js)：for display GitHub user ＆ his/her all repositories

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/UserPage.png" width='100%' height='100%'/>

- first check data we need had already saved in `sessionStorage`
  - if yes（get this page from `Home` or `RepoDetail`）：get data from `sessionStorage`
  - else（get this page via link directly）：fetch data from API call and save it in `sessionStorage`
    - GitHub User：[`GET /users/{username}`](https://docs.github.com/en/rest/reference/users#get-a-user)
    - Repos：[`GET /users/{username}/repos`](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user)
    - render [`Loading`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/a41fb7a68d1f00aa88996e370b258804276f06b2/src/UserPage.js#L88-L114) while API call
- check data in `sessionStorage`
  - if username isn't exit：show「No Such User」
  - else if number of user's public repo＝0：show「Haven't created any repository yet」
    - else：show [`RepoList`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/a9cb2cdfffe9c913d0721ecf4f35700b5bb0a432/src/UserPage.js#L171-L236)

```jsx
{userData.message === 'Not Found'
  ? <div className={`fs-3 text-center ${styles.textMiddleBlue}`}>No Such User.</div>
  : userData.public_repos === 0
    ? <div className={`fs-3 text-center ${styles.textMiddleBlue}`}>Haven't created any repository yet.</div>
    : <RepoList />
}
```

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/404.png" width='50%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/0-public-repo.png" width='50%' height='100%'/>

1. [**`GitHubUser()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/43ed25d9a519423da8c4e36eb63424322d219bb9/src/UserPage.js#L116-L169)

Differences between user and organization：

||User|Organization|
|:-:|:-:|:-:|
|**info**|num of repos、num of followers|location、blog link|
|**tag above `RepoList`**|"All Public Repositories"|"`.public_repos` Public Repositories"|

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/User-info.png" width='50%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Organization-info.png" width='50%' height='100%'/>

2. [**`RepoList()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/e73501e7ed093ff15a63b9ebb8533aa071355dba/src/UserPage.js#L171-L236)
   - use `useRef()` & [`IntersectionObserver`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/e73501e7ed093ff15a63b9ebb8533aa071355dba/src/UserPage.js#L199-L210) on [ProgressView](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/e73501e7ed093ff15a63b9ebb8533aa071355dba/src/UserPage.js#L226-L230) to achieve infinite scroll without always listening to `window.innerHeight`、`document.documentElement.scrollTop`、`document.documentElement.offsetHeight`
   - store repos data in `sessionStorage`, so when user go to `RepoDetail` and back, we won't re-fetch data from API
   - use `window.scrollTo()` to ensure that when user go to `RepoDetail` and back, the position of `UserPage` will be the same of previous position（won't go back to top）
     - because `window.scrollTo()` default with animation in Chrome, we use `behavior: 'instant'` to prevent that for better user experience

```jsx
window.scrollTo({
  top: sessionStorage.getItem('offsetY'),
  left: 0,
  behavior: 'instant'
});
```

3. [**`RepoRow()`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/e73501e7ed093ff15a63b9ebb8533aa071355dba/src/UserPage.js#L238-L282)
   - use `React.memo` to prevent re-render every `RepoRow()` in `RepoList()`, only render the next 10 new repos or less in infinite scroll！
   - prepare data `onClick` before navigate to `RepoDetail` to ensure that `RepoDetail` will already have data to show on first render（won't render twice）
   - store data that fetch from API in `sessionStorage` to prevent API recall if we need the same data later
     - we also save `document.documentElement.scrollTop` in `sessionStorage` onClick

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/RepoList-prevent-rerender.gif" width='100%' height='100%'/>

### [RepoDetail.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js)：for display repository details

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/RepoDetail.png" width='100%' height='100%'/>

- first check data we need had already saved in `sessionStorage`
  - if yes（get this page from `UserPage`）：get data from `sessionStorage`
  - else（get this page via link directly）：fetch data from API call and save it in `sessionStorage`
    - GitHub User：[`GET /users/{username}`](https://docs.github.com/en/rest/reference/users#get-a-user)
    - Repo Data：[`GET /repos/{owner}/{repo}`](https://docs.github.com/en/rest/reference/repos#get-a-repository)
    - render [`Loading`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/740823717bb658615f2ac42807d3a9c70825f71c/src/RepoDetail.js#L80-L126) while API call
- Click right-bottom GitHub icon could go to repository page on GitHub

### [Components](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/tree/main/src/Components)：used not only on one page

- [**`CreateTime.js`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Components/CreateTime.js)
  - use `memo` to prevent re-render
  - reusable：use `props.displayTime` to display
    - day month year on `RepoRow`
    - day month year time on `RepoDetail`
- [**`IconGroup.js`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Components/IconGroup.js)
  - use `memo` to prevent re-render
- [**`FollowButton.js`**](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Components/FollowButton.js)
  - return Following or Follow depends on wether the username is saved in [`localStorage`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2d6fba31f1e458306e705857f854a3d4d53a096f/src/Components/FollowButton.js#L9-L16)
  - save or delete user data in `localStorage` while the button [`onClick`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/2d6fba31f1e458306e705857f854a3d4d53a096f/src/Components/FollowButton.js#L19-L32)

## Learn More

### Rate Limit

I've used token on [5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework](https://5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework), so GitHub Rest API Rate Limit will up to 5000 requests per hour. But I don't used it on main branch source code for security, so if you run this React app on your computer, Rate Limit will only up to 60 requests per hour. For more information, [view this official doc](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).

```jsx
const response = await fetch(URL, {
  headers: {
    Authorization: 'token TOKEN'
  }
});
```

### Responsive Web Design

Thanks to Bootstrap, our React app could response well on every different devices！

### Better User Experience on small Devices

1. Truncate Navbar title into「...」
2. smaller padding with `@media (max-width: 760px)`

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Screen-Shot-on-iPhone-1.png" width='33.33%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Screen-Shot-on-iPhone-2.png" width='33.33%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Screen-Shot-on-iPhone-3.png" width='33.33%' height='100%'/>

## License：MIT

This package is [MIT licensed](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/LICENSE).
