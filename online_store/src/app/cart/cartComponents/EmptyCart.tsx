import EmptyCartImage from '@/app/images/EmptyCartImage.png'
import Link from "next/link";
const EmptyCart = ()=>{
    return(
        <div className="pt-28 flex justify-center h-screen">
            <div className=" shadow-lg w-3/4 h-1/2 flex flex-col justify-center items-center">

                <h1 className="font-semibold text-3xl pb-3">Your cart is empty</h1>
                <h3 className="text-lg pb-2">Check out what we're featuring now!</h3>
                <Link href={'/'}>
                        <button className="bg-red-600 w-80 h-12 rounded-lg text-white font-bold text-lg hover:bg-red-700">Go to homepage</button>
                    
                </Link>
                <img className="w-36 pt-6" src={EmptyCartImage.src}></img>

            </div>
        </div>
    )
};
export default EmptyCart