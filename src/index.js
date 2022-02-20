import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Search from './Search';
import UserPage from './UserPage';
import RepoDetail from './RepoDetail';
import Footer from './Footer';

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
