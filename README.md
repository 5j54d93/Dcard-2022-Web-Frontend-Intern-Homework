# Dcard 2022 Web Frontend Intern Homework

A [React](https://reactjs.org) app design with [Bootstrap](https://bootstrap5.hexschool.com) like [Dcard](https://www.dcard.tw) that could fetch data from [GitHub REST API](https://docs.github.com/en/rest) to list a [GitHub](https://github.com) user's all repositories！

- **Dcard 2022 Web Frontend Intern Homework：**[Doc](https://drive.google.com/file/d/1niPucGwf9qGEpLokVptK2a1zNeReS8WL/view)

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/Demo.gif" width='100%' height='100%'/>

> ### Repositories List

User's Repositories route at `/users/{username}/repos`

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/RepositoryList.png" width='100%' height='100%'/>

> ### Single Repository Page

- Include a hyperlink to GitHub repository.
- Repository detail route at `/users/{username}/repos/{repo}`

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/SingleRepository.png" width='100%' height='100%'/>

## Overview

1. [How to use](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#how-to-use)
2. [Learn More](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#learn-more)
3. [Extra：Dcard Favicon！～](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#-extradcard-favicon)
4. [License](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework#dcard-2022-web-frontend-intern-homeworklicense-ricky-chuang)

## How to use

### 🎊！！！This is a Deploied React app！！！🎊

#### You could use this React app on [**5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework**](https://5j54d93.github.io/Dcard-2022-Web-Frontend-Intern-Homework) ！

_or Run this React app on your computer：_

### 0. You should have downloaded [Node.js](https://nodejs.org/en/) before

> _Node >= 14.0.0 and npm >= 5.6_

### 1. First download this repository

```shell
git clone https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework
```

### 2. Change directories to this repository

```shell
cd Dcard-2022-Web-Frontend-Intern-Homework
```

### 3. Run this React app

```shell
npm install
npm start
```

Open [**http://localhost:3000**](http://localhost:3000) to view it in your browser.

## Architecture Design

> [index.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/index.js)：
> - for route direct
> - [`UserRepo`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/10d4d3fcd4b0901e4ca6dc216e1c81e76431776a/src/index.js#L21-L31) include a header & [`RepoList`](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoList.js)
> - default at [App.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/App.js)

```jsx
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users/:owner/repos" element={<UserRepo />} />
        <Route path="/users/:owner/repos/:repo" element={<RepoDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

export default function UserRepo() {
  let { owner } = useParams();
  return (
    <div>
      <header class="text-center alert alert-primary" role="alert">
        <h1 class='my-3'>GitHub Username：{owner}</h1>
      </header>
      <RepoList username={owner} />
    </div>
  );
}
```

>> [App.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/App.js)：for search GitHub User
>> - a form for user to input a GitHub user name
>> - can't submit if there's no input
>>
>> [RepoList.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoList.js)
>> - fetch data from api：[`GET /users/{username}/repos`](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user)
>>   - using [parameter](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user--parameters)：`per_page=10`、`page=`
>> - check wether a user exist or not：[`GET /users/{username}`](https://docs.github.com/en/rest/reference/users#get-a-user)
>> - check if reach bottom of page：[code here](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/6c04cedaa30703ad2abf4afd7182a8807e2d06e5/src/RepoList.js#L47-L50)（using `Math.round` for work well on Chrome）
>> ```jsx
>> Math.round(window.innerHeight + document.documentElement.scrollTop)
>> === document.documentElement.offsetHeight
>> ```
>> - Call API if there's more repositories to fetch：[code here](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/3d7cd6cdeb31f863fef5919f9fe3708116755d97/src/RepoList.js#L48)
>> ```jsx
>> 10 * this.state.page < this.state.publicReposNum
>> ```
>> - 2 Component：
>>   - [BackToHome](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/39f73717b5c15c15d116ce5454529ac040ee4343/src/RepoList.js#L4-L14)：a button to [App.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/App.js)
>>   - [RepoTableHead](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/39f73717b5c15c15d116ce5454529ac040ee4343/src/RepoList.js#L16-L28)：table header（Index、Repositories、Stars Earned）
>>
>> [RepoDetail.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js)
>> - fetch data from api：[`GET /repos/{owner}/{repo}`](https://docs.github.com/en/rest/reference/repos#get-a-repository)
>> - 3 Component：
>>   - [RepoDetailHeader](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/39f73717b5c15c15d116ce5454529ac040ee4343/src/RepoDetail.js#L53-L61)：full name of a repository
>>   - [RepoDetailBackToList](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/39f73717b5c15c15d116ce5454529ac040ee4343/src/RepoDetail.js#L63-L73)：a button to [RepoList.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoList.js)
>>   - [RepoDetailCard](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/39f73717b5c15c15d116ce5454529ac040ee4343/src/RepoDetail.js#L75-L99)：repository's detail

## Learn More

### Search a GitHub user's repositories without input

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/SearchWithoutInput.png" width='100%' height='100%'/>

### Deal with exception：If there's no such user on GitHub

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/NoSuchUser.png" width='50%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/404.png" width='50%' height='100%'/>

### A GitHub user but haven't creat any repository yet

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/Haven't-created-any-repository-yet.png" width='50%' height='100%'/><img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/GitHub：YiLongSun.png" width='50%' height='100%'/>

## 🥰 Extra：Dcard Favicon！～

<img src="https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/.github/assets/DcardFavicon.png" width='50%' height='100%'/>

## MIT License｜© Ricky Chuang

This package is licensed under MIT license. See [LICENSE](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework) for details.  
