import React, { useState, useEffect } from 'react';
import Status from './Status';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { fetchServerStatus } from '../../lib/api';
import Login from '../Login';

function App() {
  // const posts = usePosts();
  const isOnline = useIsOnline();

  return (
    <Router>
      <header className="App_Header">
        <nav className="App_Nav">
          <ul>
            <li>
              <Link to="/">BlogEditor</Link>
            </li>
            <li>
              <Link to="/posts">-Posts-</Link>
            </li>
          </ul>
        </nav>
        <Status status={isOnline} />
      </header>

      <Switch>
        {/* <Route path="/" exact>
          <Login />
        </Route> */}
        {/* <Route path="/posts" exact>
          <Posts posts={posts} />
        </Route>
        <Route path="/posts/:postId" exact>
          <PostEditForm posts={posts} />
        </Route>
        <Route path="/posts/new" exact>
          <PostNewForm />
        </Route> */}
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

// fetch posts data and return posts state
// function usePosts() {
//   const [posts, setPosts] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       const posts = await fetchPublishedPosts();

//       if (!posts.error) {
//         addTimestamps(posts);
//         sortByDate(posts);
//         setPosts(posts);
//       } else {
//         console.error('Failed to fetch the data, Try to fetch again in 5sec');
//         setTimeout(fetch, 5000);
//       }
//     };

//     fetch();
//   }, []);

//   return posts;
// }

// fetch server status and return status state
function useIsOnline() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const status = await fetchServerStatus();

      if (!status.error) {
        setIsOnline(true);
      } else {
        console.error('Failed connection to API, Try to reconnect in 10sec');
        setIsOnline(false);
        setTimeout(fetch, 10000);
      }
    };

    fetch();
  });

  return isOnline;
}

export default App;
