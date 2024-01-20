'use client'
import OnlineStoreLogo from '../images/logo.png'
import { useEffect, useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const [EmailValue, setEmailValue] = useState("");
    const [PasswordValue, setPasswordValue] = useState('');

    const [PasswordVisible, setPasswordVisible] = useState("password");
    const [RenderErrorText, setRenderErrorText] = useState(false);

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [EmailIsCoppied, setEmailIsCoppied] = useState(false);
    const [PasswordIsCoppied, setPasswordIsCoppied] = useState(false);
    
    
    
    const router = useRouter();

    const TestEmail = process.env.NEXT_PUBLIC_TEST_EMAIL
    const TestPass = process.env.NEXT_PUBLIC_TEST_PASSWORD

    useEffect(()=>{
        setTimeout(()=>{
            if (EmailIsCoppied){
                setEmailIsCoppied(false)
            }
        },1500)
    },[EmailIsCoppied])

    useEffect(()=>{
        setTimeout(()=>{
            if (PasswordIsCoppied){
                setPasswordIsCoppied(false)
            }
        },1500)
    },[PasswordIsCoppied])

    const togglePasswordVisible = ()=>{ 
        if(PasswordVisible === "password"){
            setPasswordVisible("text")
        }else if (PasswordVisible === "text"){
            setPasswordVisible("password")
        }
    }

    const submitForm = async()=>{
        setRenderErrorText(false)
        
        try{
            const res = await signInWithEmailAndPassword(EmailValue, PasswordValue);
            if (!res){
                throw Error
            }
            sessionStorage.setItem('user', "true")
            router.push('/')
        }catch(e){
            setRenderErrorText(true)
        }
    }

    const CopyToClipBoard = (text:string)=>{
        navigator.clipboard.writeText(text);
    }

    return(
        <div>                                                                                         
            <form action={submitForm} className="w-1/3 h-2/5  flex justify-items-center flex-col items-center pt-20 " style={{margin: "auto"}}>
                    <Link href='/'><img src={OnlineStoreLogo.src} className='w-20' alt='Online store logo'></img></Link>
                    <h1 className='text-2xl font-bold pt-3.5' >Sign into your Online Store account</h1>
                    <p className={RenderErrorText? "text-yellow-600 mt-3" : "hidden"}>We can't find your account.</p>
                    
                    <div className="pt-6">
                        <div className=" relative group ">
                            <input type="text" onChange={(event)=>{setEmailValue(event.target.value)}} id="username" required className="w-96 border-2 border-gray-400 h-10 px-4 text-sm peer  outline-none"/>
                            <label htmlFor="username" className="text-gray-400 cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Email</label>
                        </div>
                    </div>

                    <div className="pt-6 ">
                        <div className=" relative group">
                            
                            <div className='border-2 border-gray-400 flex items-center w-96'>
                                <input onChange={(event)=>{setPasswordValue(event.target.value)}} type={PasswordVisible} id="password" required className="w-full h-10 px-4 text-sm peer outline-none"/>
                                <button onClick={togglePasswordVisible} type='button' className='mx-2 underline hover:no-underline'>show</button>
                                <label htmlFor="password" className="text-gray-400 cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Password</label>
                            </div>

                            
                        </div>
                    </div>
                    
                    <div className='mt-6 flex  flex-col items-center'>
                        <p className='text-gray-500'>Test Login:</p>
                        <p onClick={()=>{CopyToClipBoard(TestEmail as string); setEmailIsCoppied(true)}} className='text-gray-500 hover:cursor-pointer hover:text-red-600'>{TestEmail} {EmailIsCoppied?"Coppied":""}</p>
                        <p onClick={()=>{CopyToClipBoard(TestPass as string); setPasswordIsCoppied(true)}} className='text-gray-500 hover:cursor-pointer hover:text-red-600 '>{TestPass} {PasswordIsCoppied?"Coppied":""}</p>
                    </div>

                    <button className='w-full mt-5 bg-red-600 text-white text-xl font-bold hover:bg-red-800 transition-all h-14 rounded-md'>Sign in</button>
            </form>
        </div>
    )
}
    