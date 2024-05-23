import { MouseEventHandler, useState } from 'react';
import {UseFormRegister, FieldValues} from 'react-hook-form'

interface PasswordInputProps
{
    register:UseFormRegister<FieldValues>;
}

const PasswordInput = (props:PasswordInputProps)=>{
    const [PasswordVisible, setPasswordVisible] = useState("password");
    
    const togglePasswordVisible = ()=>{ 
        if(PasswordVisible === "password"){
            setPasswordVisible("text")
        }else if (PasswordVisible === "text"){
            setPasswordVisible("password")
        }
    }

    return(
        <div className="pt-6 ">
            <div className=" relative group">
                <div className='border-2 border-gray-400 flex items-center w-96'>
                    <input 
                        {...props.register("password")}
                        type={PasswordVisible} 
                        id="password" 
                        required 
                        className="w-full h-10 px-4 text-sm peer outline-none"
                    />
                    <button onClick={togglePasswordVisible} type='button' className='mx-2 underline hover:no-underline'>show</button>
                    <label 
                        htmlFor="password" 
                        className="text-gray-400 cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Password</label>
                </div>
            </div>
        </div>
    )
}
export default PasswordInput;