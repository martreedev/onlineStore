'use client'
import logo from '../images/logo.png'
import AccountImage from '../images/Account_Image.svg'
import ShoppingCartImage from '../images/Shopping_cart_image.svg'
import SearchImage from '../images/search_img.png'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useEffect } from 'react'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'


interface CartStructure
{
    deliveryType:number
    quantity:number
    price:number
    recordID:string
}

interface TopbarProps
{
    CartLength:number
}

export default function Topbar(props:TopbarProps){
    const [user] = useAuthState(auth);
    const userSession = sessionStorage.getItem('user');
    const CartLength = props.CartLength;


    const button_class = "font-semibold  rounded-lg h-11 px-7 hover:bg-gray-100 transition-all mr-4"

    return (
    <nav className='w-full flex justify-start pl-60 h-20 items-center fixed z-30 bg-white shadow-lg'>
        <Link href={'/'}>
            <img src={logo.src} alt="store-logo-image" className='w-16 mr-4 cursor-pointer'></img>
        </Link>
        
        <button className={button_class} >Electronics</button>
        <button className={button_class}>Kitchen & Dining</button>
        <button className={button_class}>Furniture</button>
        <button className={button_class}>Clothing</button>
        
        <div className='flex bg-gray-100 w-1/4 rounded-xl mr-6' >
            <input className=' bg-gray-100 rounded-xl outline-0 h-11 w-11/12 pl-3 px-3' placeholder="What can I help you find?"></input>
            <button className='w-4 '>
                <img src={SearchImage.src} alt='search image button'></img>
            </button>
        </div>
        
        {!user && !userSession ? 
        <Link href='/login' className='cursor-pointer flex w-32 justify-center h-11 hover:bg-gray-100 rounded-lg mr-4 transition-all'>
            <img className='w-6' src={AccountImage.src} alt="account image" />
            <button>Sign in</button>
        </Link> 
         : 
         <Link href='/user' className='cursor-pointer flex w-10 justify-center h-11 hover:bg-gray-100 rounded-lg mr-4 transition-all'>
            <img className='w-6' src={AccountImage.src} alt="account image" />
         </Link>
         }
         
       

        <button className='w-11 h-11 hover:bg-gray-100 flex justify-center items-center rounded-lg mr-4 transition-all'>
            <img className='w-6 ' src={ShoppingCartImage.src} alt="shopping cart image"></img>
            
            <div className='rounded-full w-5 bg-red-600 absolute ml-8 mb-5'>
                <p className='text-white text-sm'>{CartLength >0? CartLength : null}</p>
            </div>


            
        </button>
        
    </nav>
    )
}