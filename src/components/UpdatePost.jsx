import { useState,useEffect } from 'react';
import { Routes, Route, Link,useParams,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Postc.css"
export default function UpdatePost() {
    const {state} = useLocation();
    const { post  } = state;

    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    const { id } = useParams();
    let data = sessionStorage.getItem("key");
    const navigate = useNavigate();
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [price, setPrice] = useState(post.price);
    const [location, setLocation] = useState(post.location);
    const [ischecked, setIschecked] = useState(post.willDeliver);
    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
            const response = await fetch(`${BASE_URL}/posts/${id}`, {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
              },
              body: JSON.stringify({
                post: {
                  title: title,
                  description: description,
                  price: price,
                  location: location,
                  willDeliver: ischecked
                }
              })
            });
            const result = await response.json();
            console.log(result)
            navigate("/posts")
          } catch (err) {
            console.error(err);
          }
            
    }
    
    function handleCheckBox(e){
      setIschecked(e.target.checked)
      console.log(ischecked)
    }
  
    return(
        <div className="form-Update">
        
        <form  onSubmit={handleSubmit}>
            <label>
                <div>title: <input value={title}  id="title"  onChange={(e)=>{ setTitle(e.target.value) }}/></div>
            </label>
            <label>
                <div>Description: <input value={description}  id="description" onChange={(e)=>{ setDescription(e.target.value) }}/></div>
            </label>
            <label>
                <div>Price: <input value={price}  id="price" onChange={(e)=>{ setPrice(e.target.value) }}/></div>
            </label>
            <label>
                <div>Location: <input value={location}  id="location" onChange={(e)=>{ setLocation(e.target.value) }}/></div>
            </label>
            <label>
                <div>willDeliver: <input value={ischecked}  id="willDeliver"  type="checkbox" checked={ischecked} onChange={(e)=>{ handleCheckBox(e) }}/></div>
            </label>
                <button className='submit-in-C'>Submit</button>   
        </form>
        </div>
    );
  }