import { useState,useEffect } from "react";
import { Routes, Route, Link,useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MessageTo(){
    let data = sessionStorage.getItem("key");
    const [messageTo, setMessageTo] = useState("")
    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    const { id } = useParams();
    const navigate = useNavigate()
    async function postMessage(event){
      event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
              },
              body: JSON.stringify({
                message: {
                  content: messageTo
                }
              })
            });
            const result = await response.json();
            console.log(result);
            navigate("/Profile")
            console.log("successfully sent the message")
          } catch (err) {
            console.error(err);
          }
    }
    return (
        <div>
        <h2>Message</h2>
        <form onSubmit={postMessage} >

            <label>
                <div>Message: <input value={messageTo} id="messageTo" onChange={(e)=>{ setMessageTo(e.target.value) }}/></div>
            </label>
                <button>Submit</button>
        </form>
        </div>
    )
}