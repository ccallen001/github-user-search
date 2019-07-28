import React, { useState } from 'react';

import UserSearchResults from './components/userSearchResults/UserSearchResults.js';

import './App.css';

import client from './gitclient';
const client_id = client.id
const client_secret = client.secret;

function App() {
  const [nameToSearch, setNameToSearch] = useState('');
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [numTotalResults, setNumTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  let page = 1;

  function searchUsers() {
    fetch(`https://api.github.com/search/users?q=${nameToSearch}in:login&page=${page}&per_page=${10}&client_id=${client_id}&client_secret=${client_secret}`)
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        setNumTotalResults(json.total_count);
        setUserSearchResults(json.items);
      });
  }

  function goToPage(pageNum) {
    pageNum = pageNum > 0 ? pageNum : 1;

    setCurrentPage(pageNum);
    page = pageNum;

    searchUsers();
  }

  return (
    <div className="App">
      <div className="background"></div>

      <div className="ui-container">
        <div>
          <h1>GitHub User Search</h1>
        </div>

        <div>
          <div className="margin-b-16">
            <label>Username/login to search:&nbsp;
            <input type="text" placeholder="github username" onInput={
                (ev) => {
                  const value = ev.currentTarget.value;

                  if (value) {
                    setNameToSearch(ev.currentTarget.value);
                  }
                }
              } />
            </label>
          </div>
          <div>
            <button className="search-btn" onClick={searchUsers}>Search</button>
          </div>
          <div>
            {
              numTotalResults ?
                <p>total results: <strong>{numTotalResults}</strong></p> :
                null
            }
          </div>
          <div>
            {
              numTotalResults ?
                <div className="flex flex-center">
                  <button onClick={() => goToPage(currentPage - 1)}>&larr;</button>
                  <div style={{ margin: '0 8px' }}>current page: <strong>{currentPage}</strong></div>
                  <button onClick={() => goToPage(currentPage + 1)}>&rarr;</button>
                </div> :
                null
            }
          </div>
        </div>
      </div>

      <UserSearchResults userSearchResults={userSearchResults} />
    </div>
  );
}

export default App;
