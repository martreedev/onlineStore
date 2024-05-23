'use client';
import CopyToClipBoard from "@/app/functions/Command Functions/CopyToClipBoard";
import { useEffect, useState } from "react";


export default function TestLoginFrame(){
    const [EmailIsCoppied, setEmailIsCoppied] = useState(false);
    const [PasswordIsCoppied, setPasswordIsCoppied] = useState(false);

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

    return(
        <div className='mt-6 flex  flex-col items-center'>
            <p className='text-gray-500'>Test Login:</p>
            <p onClick={()=>{CopyToClipBoard(TestEmail as string); setEmailIsCoppied(true)}} className='text-gray-500 hover:cursor-pointer hover:text-red-600'>{TestEmail} {EmailIsCoppied?"Coppied":""}</p>
            <p onClick={()=>{CopyToClipBoard(TestPass as string); setPasswordIsCoppied(true)}} className='text-gray-500 hover:cursor-pointer hover:text-red-600 '>{TestPass} {PasswordIsCoppied?"Coppied":""}</p>
        </div>
    )
}