'use client'
import { signOut } from 'firebase/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function UserPage(){
    const [user] = useAuthState(auth)

    const router = useRouter(); 
    
    if (!user){
        router.push('/')
    }
    
    const logout = async()=>{
        await signOut(auth)
        sessionStorage.removeItem('user')
        router.push('/')
    }

    return(
        <div>
            user page!!
            <button onClick={logout}>Log Out</button>
        </div>
    )
}