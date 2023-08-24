import { useState,useEffect } from "react";
import { Routes, Route, Link,useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UpdatePost from "../components/UpdatePost";
import '../App.css';
export default function Posts({setIsLogin}) {
    
    const BASE_URL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`
    
    const [postList,setPostList] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    let data = sessionStorage.getItem("key");
    let username = sessionStorage.getItem("username");
    const navigate = useNavigate();
    
    async function fetchPosts() {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-A/posts`);
      const {data} = await response.json();
      const P = data.posts;
      setPostList(P);
      setFilteredPosts(P);
    }
    
        
    useEffect(() => {
      fetchPosts();
    }, [])

    async function handleDelete(id){
      console.log(id)
        try {
            const response = await fetch(`${BASE_URL}/posts/${id}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
              }
            });
            const {result} = await response.json();
            console.log(`delete ${result} `)

            window.location.reload();
            setIsLogin(true);
          } catch (err) {
            console.error(err);
          }
    }
    function handleEdit(post){
         navigate(`/update-post/${post._id}`,{state:{post}});
        
         
      
    }
    function handleSentMessage(post){
      navigate(`/message-to/${post._id}`);
    }
    function PostsListAuthorized ({post}){
  
        return (
          
            <div className="post">
              
                
                <h3>Title: {post.title}</h3>
                <h4>Description: {post.description}</h4>
                <h4>Price: {post.price}</h4>
                <h3>Seller: {post.author && post.author.username}</h3>
                <h4>Location: {post.location}</h4>
                
                <div className="buttons">
                        
                    {(post.author.username === username ?
                       <> 
                          <button className="edit"onClick={()=>  handleEdit(post)}>Edit</button>
                          <button className="delete"onClick={() => handleDelete(post._id)}>Delete</button>
                       </>  :
                       <>
                          <button className="sendMessage"onClick={() => handleSentMessage(post)}>Send Message</button>
                       </> 
                    )}      
                  
                  
                    
                </div>
                
            </div>
        )
        
    }
    function PostListUnauthorized({post}){
      return (
        <div className="post">
            <h3>Title: {post.title}</h3>
            <h4>Description: {post.description}</h4>
            <h4>Price: {post.price}</h4>
            <h3>Seller: {post.author && post.author.username}</h3>
            <h4>Location: {post.location}</h4>
            
        </div>
    )
    }
    function handleSubmit(e) {
      e.preventDefault()
      const search = e.target.value
      const filtered = postList.filter((post) => {
        return (
                post.title.toLowerCase().includes(search.toLowerCase()) || 
                post.description.toLowerCase().includes(search.toLowerCase()) ||
                post.price.toLowerCase().includes(search.toLowerCase()) ||
                (post.author && post.author.username).toLowerCase().includes(search.toLowerCase()) ||
                post.location.toLowerCase().includes(search.toLowerCase()) ) 
      })
      setFilteredPosts(filtered)
    }

    return (
        <div>
          
          <form className="search-bar-form"onSubmit={handleSubmit}>
          <label htmlFor="search">Search</label>
          <input onChange={handleSubmit} type="text" id="search" />
          <button onClick={(e)=>{navigate('/CreatePost')}}>Add Post</button>
        </form>
        <div >{
            filteredPosts.map((post)=>{
              return (data === null? <PostListUnauthorized key={post._id} post={post} />:<PostsListAuthorized key={post._id} post={post} />)
            })
          }</div>
          
      
        </div>
    )
}