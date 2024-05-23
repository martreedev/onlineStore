import {UseFormRegister, FieldValues} from 'react-hook-form'

interface EmailInputProps
{
    register:UseFormRegister<FieldValues>;
}

const EmailInput = (props:EmailInputProps)=>{

    return (
        <div className="pt-6">
            <div className=" relative group ">
                <input
                    {...props.register("email")}
                    type="email" 
                    id="email" 
                    required 
                    className="w-96 border-2 border-gray-400 h-10 px-4 text-sm peer  outline-none"
                />  
                
                <label 
                    htmlFor="email" 
                    className="text-gray-400 cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Email</label>
            </div>
        </div>
    )
}
export default EmailInput;