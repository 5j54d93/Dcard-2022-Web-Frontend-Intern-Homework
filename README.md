# Dcard 2022 Web Frontend Intern Homework

---

 _**！！！Add badge here！！！**_

---

> [Dcard 2022 Web Frontend Intern Homework.pdf](https://drive.google.com/file/d/1niPucGwf9qGEpLokVptK2a1zNeReS8WL)

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

🎊 This React app had deployed on GitHub page, you could try it on [**5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework**](https://5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework)！

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
- [UserPage](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/UserPage.js)：route at `/users/{username}/repos`
- [RepoDetail](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js)：route at `/users/{username}/repos/{repo}`
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

### [Home.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Home.js)：for search GitHub username ＆ list all following users

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

difference between users and Organizations：

|＼|User|Organization|
|:-:|:-:|:-:|
|**info**|num of repos、num of followers|location、blog link|
|**tag below `hr`**|All Public Repositories|`num` Public Repositories|

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/User-info.png" width='50%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/Asset/Organization-info.png" width='50%' height='100%'/>

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
