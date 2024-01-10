'use client'
import logo from '../images/logo.png'

export default function Topbar(){
    const loginStatus = false;
    
    return (
    <div>
        <img src={logo.src} alt="store-logo-image"></img>
        <button>Electronics</button>
        <button>Kitchen & Dining</button>
        <button>Furniture</button>
        <button>Clothing</button>
        <input placeholder="What can I help you find"></input>
        <button disabled={loginStatus}>{loginStatus? "Welcome Back" : "Sign in"}</button>
    </div>
    )
}