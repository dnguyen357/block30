import Notification from "../components/Notification";
import { useState,useEffect } from "react"
export default function Logout({setIsLogin}){
    const [showNotification, setShowNotification] = useState(false);
    useEffect(() => {
        setIsLogin(false);
        sessionStorage.removeItem("key");
        console.log("You are logout")
        setShowNotification(true)
    }, [])
    

    return (
        <>
        
        {showNotification && <Notification message="You are logged out!" />}
        </>
        
       
    )
}