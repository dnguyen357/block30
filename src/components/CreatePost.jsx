import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './Postc.css'
export default function CreatePost() {
    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [ischecked, setIschecked] = useState(false);

    let data = sessionStorage.getItem("key");
    
    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
            const response = await fetch(`${BASE_URL}/posts`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
              },
              body: JSON.stringify({
                post: {
                  title: title,
                  description: description,
                  price: price,
                  willDeliver: ischecked
                }
              })
            });
            const result = await response.json();
            console.log(result);
            
          } catch (err) {
            console.error(err);
          }
            
    }

    function handleCheckBox(e){
      setIschecked(e.target.checked)
      console.log(ischecked)
    }
    return(
        <div className="form-container">
        
        <form  onSubmit={handleSubmit}>
            <label>
                <div>Title: <input value={title}  id="title" onChange={(e)=>{ setTitle(e.target.value) }}/></div>
            </label>
            <label>
                <div>Description: <input value={description}  id="description" onChange={(e)=>{ setDescription(e.target.value) }}/></div>
            </label>
            <label>
                <div>Price: <input value={price}  id="price" onChange={(e)=>{ setPrice(e.target.value) }}/></div>
            </label>
            <label>
                <div>WillDeliver: <input value={ischecked} type="checkbox" checked={ischecked} id="willDeliver" onChange={(e)=>{ handleCheckBox(e) }}/></div>
            </label>
                <button className="submit-in-C">Submit</button>
               
        </form>
        </div>
    );
  }