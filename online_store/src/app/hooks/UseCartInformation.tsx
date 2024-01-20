'use client'

import { useEffect, useState } from "react";




function UseCartInformation(){
    const [CartLength, setCartLength] = useState(0);
    
    const updateCartLength=()=>{
        const SessionCart = sessionStorage.getItem('Cart');
        if (SessionCart){
            const cart = JSON.parse(SessionCart);
            setCartLength(cart.length)
           
        }
    }   
    useEffect(()=>{
        updateCartLength()
    },[])
   
    return {CartLength, updateCartLength}

};
export default UseCartInformation;