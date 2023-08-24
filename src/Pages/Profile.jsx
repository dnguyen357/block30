import { useState,useEffect } from "react";
import { Routes, Route, Link,useParams,useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();
    let data = sessionStorage.getItem("key");
    const [messages, setMessages] = useState([])
    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    const [filterMFromMe,setFilterMFromMe] = useState([]);
    const [filterMToMe,setFilterMToMe] = useState([]);
    let username = sessionStorage.getItem("username");

    async function getMessage(){
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
              },
              
            });
            const result = await response.json();
            const P =result.data;
            
            setMessages(P.messages)
          } catch (err) {
            console.error(err);
          }
    }
    
   
    function handleNext(id){
        navigate(`/message-to/${id}`)
    }
    

    useEffect(() => {
        getMessage();
 
    }, [])
    
    
    
    function filterMessageFromM(){
        const filtered = messages.filter(message=> message.fromUser.username.toLowerCase().includes(username.toLowerCase()))
        setFilterMFromMe(filtered)
    }
    function filterMessageToM(){
        const filtered = messages.filter(message=> !message.fromUser.username.toLowerCase().includes(username.toLowerCase()))
        setFilterMToMe(filtered)
    }
    function Messages ({message}){
        
        return (
            
            <div className="message-box">
                <h2>Seller: {message.post.author.username}</h2>
                <h3>Content: {message.content}</h3>
                <h4>Post: {message.post.title}</h4>
            </div>
        )
        
    }
    useEffect(()=>{
        filterMessageFromM();
        filterMessageToM();
    },[])
    return (

        <div>
            <div>
                <h1>Message To Me</h1>
                  {
                    filterMToMe.map(message=>{
                        return <Messages key={message._id} message={message}/>})
                  }  
                
            </div>
            <div>
                <h1>Message From Me</h1>  
                {
                    filterMFromMe.map(message=>{
                        return <Messages key={message._id} message={message}/>})
                  } 
            </div>
        </div>
    )
}