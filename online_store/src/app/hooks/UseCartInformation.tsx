import { update } from "firebase/database";
import { useEffect, useState } from "react";




function UseCartInformation(){
    const [CartLength, setCartLength] = useState(0);
    


    const updateCart=()=>{
        const SessionCart = sessionStorage.getItem('Cart');
        if (SessionCart){
            const cart = JSON.parse(SessionCart);
            setCartLength(cart.length)
           
        }
    }   
    useEffect(()=>{
        updateCart()
    },[])
   
    return {CartLength, updateCart}

};
export default UseCartInformation;