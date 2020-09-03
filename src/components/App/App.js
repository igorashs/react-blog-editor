import React, { useState, useEffect, lazy, Suspense } from 'react';
import Status from './Status';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { fetchServerStatus } from '../../lib/api';

import Loading from '../Loading';
const Login = lazy(() => import('../Login'));
const Posts = lazy(() => import('../Posts'));

function App() {
  // const posts = usePosts();
  const isOnline = useIsOnline();
  const token = useToken();

  return (
    <Router>
      <header className="App_Header">
        <nav className="App_Nav">
          <ul>
            <li>
              <Link to="/">BlogEditor</Link>
            </li>
            {token ? (
              <li>
                <Link to="/posts">-Posts-</Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </nav>
        <div className="Status">
          <Status status={isOnline} />
          {token ? (
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          ) : (
            ''
          )}
        </div>
      </header>
      <Suspense fallback={<Loading />}>
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

          <Route path="/login">{token ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/">
            {!token ? <Redirect to="/login" /> : <Posts />}
          </Route>
        </Switch>
      </Suspense>
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

// get the token from LocalStorage
function useToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return token;
}

export default App;

function handleLogout() {
  localStorage.removeItem('token');
  window.location.reload();
}
