import { useState,useEffect } from "react";
import { Routes, Route, Link,useParams } from "react-router-dom";
export default function GetMessage(){
    let data = localStorage.getItem("key");
    const [messages, setMessages] = useState("")
    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    const { id } = useParams();
    async function getMessage(){
        try {
            const response = await fetch(`${BASE_URL}/posts`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
              },
              
            });
            const result = await response.json();
            setMessages(result)
          } catch (err) {
            console.error(err);
          }
    }
    useEffect(() => {
        getMessage();
        
    }, [])
    return (
        <div>
        {
            messages.map(message=>{
                
            })
        }
    
        </div>
    )
}