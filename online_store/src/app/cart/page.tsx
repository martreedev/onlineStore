'use client'
import Topbar from "../components/topbar";
import Footer from "../components/footer";
import CartControls from "../hooks/AddRemoveCart";
import EmptyCart from "./cartComponents/EmptyCart";
import CartInformationContainer from "./cartComponents/CartInformationContainer";
import { useEffect, useState } from "react";
import DeliveryItemContainer from "./cartComponents/DeliveryItemContainer";

interface CartStructure
{
    deliveryType:number
    quantity:number
    price:number
    recordID:string
}

function CartPage(){

    const { refetchCartLength, CartLength, SubTotal } = CartControls();
    
    

    const FilledCart = ()=>{
        return (
            <div>
                
                <div className="pt-28 flex justify-center h-screen">
                
                    <CartInformationContainer SubTotal={SubTotal} ItemCount={CartLength}/>
                
                    <DeliveryItemContainer UpdateCartLengthFunction={refetchCartLength}/>


                </div>

            </div>
            
        )
    }

    return(
        <div>
            <Topbar CartLength={CartLength}/>
            {CartLength >0 ? 
                <FilledCart/>
                :
                <EmptyCart/>
            }
            {/*<Footer/> */}
        </div>
    )
};
export default CartPage;