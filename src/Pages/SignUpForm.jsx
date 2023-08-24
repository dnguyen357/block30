import { useState } from 'react';
import '../components/Postc.css'
export default function SignUpForm(){
    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch(
              `${BASE_URL}/users/register`, {
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
            const {data} = await response.json();
            console.log(data.token)
          } catch (err) {
            console.error(err);
          }
    }
    
    return(
        <div className='form-signup'>
        <h2>Register Form</h2>
        <form onSubmit={handleSubmit} >
            <label>
                <div>Username: <input value={username} type="username" id="username" onChange={(e)=>{ setUsername(e.target.value) }}/></div>
                
            </label>
            <label>
                <div>Password: <input value={password} type="password" id="password" onChange={(e)=>{ setPassword(e.target.value) }}/></div>
            </label>
                <button>Submit</button>
        </form>
        </div>
    
    )
    
}