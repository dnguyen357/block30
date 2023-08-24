import { useState,useEffect } from "react"
import Notification from "../components/Notification";
import { useNavigate,useLocation } from "react-router-dom";
import '../components/Postc.css'
export default function Login({setIsLogin}){
    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    
    async function handleLogin(e){
      
      console.log("clicked submit in login page")
      e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: {
                  username: username,
                  password: password
                }
              })
            });
            const result = await response.json();
            console.log(result)
            sessionStorage.setItem("key", result.data.token);
            setIsLogin(true)
            setShowNotification(true);
            navigate('/')
            sessionStorage.setItem("username",username );
          
          } catch (err) {
            console.error(err);
          }
        
    }
    

    return (
        <div>
          
            <form className="form-login"onSubmit={handleLogin} >
            <label>
                <div>Username: <input value={username} type="username" id="username" onChange={(e)=>{ setUsername(e.target.value) }}/></div>
                
            </label>
            <label>
                <div>Password: <input value={password} type="password" id="password" onChange={(e)=>{ setPassword(e.target.value) }}/></div>
            </label>
                <button type="submit" >Submit</button>
            </form>
            {showNotification && <Notification message="You are logged in!" />}
        
        </div>
    )
}