/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'
import OnlineStoreLogo from '../images/logo.png'
import { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import Link from 'next/link'
import EmailInput from './LoginComponents/EmailInput'
import PasswordInput from './LoginComponents/PasswordInput'
import TestLoginFrame from './LoginComponents/TestLoginFrame'

interface FormDataStruct
{
    email:string
    password:string
}

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
    } = useForm();

    const [RenderErrorText, setRenderErrorText] = useState(false);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    
    const SubmitLogin = async(FormData:FormDataStruct)=>{
        setRenderErrorText(false)
        try{
            const res = await signInWithEmailAndPassword(FormData.email, FormData.password);
            if (!res){
                throw new Error("Invalid Username or Password")
            }
            sessionStorage.setItem('user', "true")
            router.push('/')
        }catch(e){
            setRenderErrorText(true)
        }
    }

    return(                                                                              
        <div className="w-1/3 h-2/5  flex justify-items-center flex-col items-center pt-20 " style={{margin: "auto"}}>

            <Link href='/'><img src={OnlineStoreLogo.src} className='w-20' alt='Online store logo'></img></Link>
            <h1 className='text-2xl font-bold pt-3.5' >Sign into your Online Store account</h1>
            <p className={RenderErrorText? "text-yellow-600 mt-3" : "hidden"}>We can't find your account.</p>

            <form
                onSubmit={handleSubmit((FormData:any)=>{
                    SubmitLogin(FormData)
                })}
            >
                <EmailInput register={register}/>
                <PasswordInput register={register}/>
                <TestLoginFrame/>

                <button type='submit' className='w-full mt-5 bg-red-600 text-white text-xl font-bold hover:bg-red-800 transition-all h-14 rounded-md'>Sign in</button>
            </form>
        </div>
    )
}
    