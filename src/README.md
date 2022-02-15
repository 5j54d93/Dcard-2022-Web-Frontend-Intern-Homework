## Architecture Design

### [index.js](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/index.js)：default at [App](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/App.js)

- for route direction
- every page will have [Navbar](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Navbar.js) and [Footer](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/Footer.js)
- only change content between [App](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/App.js)、[RepoList](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoList.js)、[RepoDetail](https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework/blob/main/src/RepoDetail.js) depend on different route

```jsx
ReactDOM.render(
  <React.StrictMode>
    <div class="d-flex flex-column min-vh-100">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users/:owner/repos" element={<RepoList />} />
          <Route path="/users/:owner/repos/:repo" element={<RepoDetail />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
```
