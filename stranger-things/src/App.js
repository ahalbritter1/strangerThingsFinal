import React, { useState } from 'react'
import Header from "./Header"
import './App.css';
import Posts from "./Posts";
import { BrowserRouter as Router, Route, Switch, Redirect, useParams } from 'react-router-dom';
import Login from "./Login"
import Home from "./Home"
import Profile from './Profile';
import Register from './Register';
import Messages from './Messages';
import CreatePost from './CreatePost'
import PostInfo from './PostInfo'
// ask about merging branches and file collision, and package downloads, imports, etc
// ask about getting a box shadow on the searchbar
// why does promise.all work and fetch does not
// if i use method: delete on the fetch message api will it delete it as intended?
const Secured = ({
  storeloginUser,
  loginToken,
  createPostTitle,
  setCreatePostTitle,
  createPostDescription,
  setCreatePostDescription,
  createPostPrice,
  setCreatePostPrice,
  createPostLocation,
  setCreatePostLocation,
  posts,
  setPostId,
  userMessages,
  setUserMessages,
  userPosts,
  setUserPosts,
}) => {
  console.log('SECURED', loginToken, storeloginUser)
  if (!loginToken && !storeloginUser) {
    return <Redirect to='/' />
  }
  return (
    <>
      <Header loginToken={loginToken} />
      <Route exact path='/home'>
        <Home storeloginUser={storeloginUser} />
      </Route>
      <Route exact path='/posts'>
        <Posts
          storeloginUser={storeloginUser}
          loginToken={loginToken}
        // postId={postId}
        // setPostId={setPostId}
        />
      </Route>
      <Route exact path='/profile'>
        <Profile loginToken={loginToken} />
      </Route>
      <Route exact path='/posts/add'>
        <CreatePost
          createPostTitle={createPostTitle}
          setCreatePostTitle={setCreatePostTitle}
          createPostDescription={createPostDescription}
          setCreatePostDescription={setCreatePostDescription}
          createPostPrice={createPostPrice}
          setCreatePostPrice={setCreatePostPrice}
          createPostLocation={createPostLocation}
          setCreatePostLocation={setCreatePostLocation}
          loginToken={loginToken}
          storeloginUser={storeloginUser} />
      </Route>
      <Route exact path='/messages/:postId'>
        <Messages loginToken={loginToken} posts={posts} setPostId={setPostId} userMessages={userMessages} setUserMessages={setUserMessages} userPosts={userPosts} setUserPosts={setUserPosts} />
      </Route>
    </>
  );
}
function App() {
  /* I'd argue this is necessary */
  const [loginToken, setloginToken] = useState(localStorage.getItem("token"));
  /* I'd argue this could be necessary but isn't necessarily */
  const [storeloginUser, setstoreloginUser] = useState(localStorage.getItem("username"));
  /* I'd consider taking a look at this and see if this can be moved into their 
    respective components */
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registerToken, setregisterToken] = useState("");
  const [storeloginPass, setstoreloginPass] = useState("");
  const [postId, setPostId] = useState("")
  const [message, setMessage] = useState("")
  const [posts, setPosts] = useState([]);
  const [replyId, setReplyId] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  // const [postId, setPostId] = useState("")
  const [createPostTitle, setCreatePostTitle] = useState("")
  const [createPostDescription, setCreatePostDescription] = useState("")
  const [createPostPrice, setCreatePostPrice] = useState("")
  const [createPostLocation, setCreatePostLocation] = useState("")
  // const [message, setMessage] = useState("")
  console.log('APP', loginToken, storeloginUser)
  return (
    <Router>
      <div className="App">
        {/* the login component reroutes to profile (messages) */}
        <Switch>
          <Route exact path='/'>
            <Login registerToken={registerToken} username={username} password={password}
              setregisterToken={setregisterToken} loginToken={loginToken} setloginToken={setloginToken}
              storeloginUser={storeloginUser} setstoreloginUser={setstoreloginUser}
              storeloginPass={storeloginPass} setstoreloginPass={setstoreloginPass}
            />
          </Route>
          <Route exact path='/register'>
            <Register
              username={username} password={password} setUsername={setUsername}
              setPassword={setPassword} setregisterToken={setregisterToken} registerToken={registerToken}
            />
          </Route>
          <Route exact path='/posts/edit/:postId'>
            <PostInfo
              loginToken={loginToken}
            />
          </Route>
          <Secured
            storeloginUser={storeloginUser}
            loginToken={loginToken}
            createPostTitle={createPostTitle}
            setCreatePostTitle={setCreatePostTitle}
            createPostDescription={createPostDescription}
            setCreatePostDescription={setCreatePostDescription}
            createPostPrice={createPostPrice}
            setCreatePostPrice={setCreatePostPrice}
            createPostLocation={createPostLocation}
            setCreatePostLocation={setCreatePostLocation}
            posts={posts}
            userMessages={userMessages}
            setUserMessages={setUserMessages}
            userPosts={userPosts}
            setUserPosts={setUserPosts}
          // postId={postId}
          // setPostId={setPostId}
          />
          <Route exact path='/posts/add'>
            <CreatePost
              createPostTitle={createPostTitle}
              setCreatePostTitle={setCreatePostTitle}
              createPostDescription={createPostDescription}
              setCreatePostDescription={setCreatePostDescription}
              createPostPrice={createPostPrice}
              setCreatePostPrice={setCreatePostPrice}
              createPostLocation={createPostLocation}
              setCreatePostLocation={setCreatePostLocation}
              loginToken={loginToken}
              storeloginUser={storeloginUser} />
          </Route>
        </Switch>
        {/* adding post button routes to a new url /posts/add 
      when looking at an individual post the url changes to the post ID*/}
        {/* Home */}
        {/* Profile */}
        {/* Logout */}
      </div>
    </Router>
  );
}
export default App;