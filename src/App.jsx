import { useState,useEffect } from 'react'

import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Posts from './Pages/Posts';
import Profile from './Pages/Profile';
import SignUpForm from './Pages/SignUpForm';
import Logout from './Pages/Logout';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import MessageTo from './components/MessageTo';
function App() {
 
  
  const [isLogin,setIsLogin] = useState(sessionStorage.getItem("key"));
  console.log(isLogin)
  const CheckLogin = ()=>{
    
    if (isLogin) {
      return (
      <div id="navbar">
        <Link id = "navbar-sub" to="/">Home</Link>
        <Link id = "navbar-sub" to="/Posts">Posts</Link>
        <Link id = "navbar-sub" to="/Profile">Profile</Link>
        <Link id = "navbar-sub" to="/Logout">Logout</Link>
          
      </div>
      )
    }

    return (
      <div id="navbar">
        <Link id = "navbar-sub" to="/">Home</Link>
        <Link id = "navbar-sub" to="/Posts">Posts</Link>
        <Link id = "navbar-sub" to="/Profile">Profile</Link>
        <Link id = "navbar-sub" to="/Login">Login</Link>
        <Link id = "navbar-sub" to="/SignUpForm">Sign Up</Link> 
      </div>
      );
  }

 
  
  return (
    <>
      <CheckLogin />
    <div id="main-section">
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Posts" element={<Posts setIsLogin={setIsLogin}/>}/>
          <Route path="/CreatePost" element={<CreatePost />}/>
          <Route path="/update-post/:id" element={<UpdatePost />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/message-to/:id" element={<MessageTo />}/>
          <Route path="/Login" element={<Login setIsLogin={setIsLogin}/>}/>
          <Route path="/Logout" element={<Logout setIsLogin={setIsLogin}/>}/>
          <Route path="/SignUpForm" element={<SignUpForm/>}/>

      </Routes>
    </div>

      
    </>
  )
}

export default App
