import React from 'react';

import './UserSearchResults.css';

function UserSearchResults(props) {
  return (
    <div>
      <ul className="userSearchResultsList">
        {
          props.userSearchResults.map((user) => (
            <li key={user.id} className="flex userSearchResult" onClick={() => window.open(user.html_url)}>
              <div>
                <img src={user.avatar_url} alt={user.id} />
              </div>
              <div className="text-left">
                <p>Username: <strong>{user.login}</strong></p>
                <p>Type: {user.type}</p>
                <p>Score: {user.score}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default UserSearchResults;