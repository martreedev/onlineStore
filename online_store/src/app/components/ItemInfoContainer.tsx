'use client'
import DeliveryTypeContainer from "./DeliveryTypeContainer";
import ItemQuantitySelecter from "./ItemQuantitySelecter";
import StripeLogo from '@/app/images/stripe_logo.png'
import InfoImage from '@/app/images/Info.svg'
import { useEffect, useState } from "react";
import UseCartInformation from "../hooks/UseCartInformation";

import CartControls from "../hooks/AddRemoveCart";

interface ItemInfoContainerProps
{   
    UpdateCart:Function;
    ItemQuantity:number;
    recordID: string;
    realPrice:number|undefined
    name:string | undefined;
    PriceTextColor: string;
    DisplayPrice:String;
    ChangeQuantityEventHadler:Function;
}

interface CartStructure
{
    deliveryType:number
    quantity:number
    price:number
    recordID:string
}

function ItemInfoContainer(props:ItemInfoContainerProps){
    const [SelectedDeliveryType, setSelectedDeliveryType] = useState<number>(1);
    
    
    const {
        Cart, 
        setCart, 
        ItemAlreadyInCart,
        setItemAlreadyInCart,
        setQuantityInCart,
        QuantityInCart,
        AddToCart,
        DeleteItemFromCart,
        CheckIfItemInCart
        } = CartControls()
    
    
    useEffect(()=>{
        CheckIfItemInCart(props.recordID);
    },[])

    const AddToCartOnClick = ()=>{
        AddToCart(props.recordID, props.ItemQuantity, SelectedDeliveryType, props.realPrice);
        props.UpdateCart()
    }
    const DeleteFromCartOnClick = ()=>{
        DeleteItemFromCart(props.recordID);
        props.UpdateCart()
    }


    return(
        <div className="       ml-14">
            <h1 className="text-2xl font-bold">{props.name}</h1>
            <h1 style={{color : props.PriceTextColor}} className="text-2xl pt-4 font-semibold">{props.DisplayPrice}</h1>


            <DeliveryTypeContainer 
                SelectedDeliveryType={SelectedDeliveryType} 
                setSelectedDeliveryType={setSelectedDeliveryType} 
            />

            <ItemQuantitySelecter 
                QuantityInCart={QuantityInCart}
                DeleteItemFromCart={DeleteFromCartOnClick}
                CartLength={Cart.length}
                ItemIsInCart={ItemAlreadyInCart}
                AddToCartSubmit={AddToCartOnClick} 
                ChangeQuantityEventHadler={props.ChangeQuantityEventHadler}
            />
            

            
            <div style={{width:"650px"}} className="flex items-center mt-10">
                <img className="w-6 h-6 rounded-full" src={StripeLogo.src} alt="stripe logo image"></img>
                <div className="ml-4">
                    <h1 className="font-bold text-base">Powered by Stripe</h1>
                    <p className="text-gray-600 text-sm">All purchases handled by Stripe</p>
                </div>
                
                

                <div style={{marginLeft: "23.125rem"}}>
                    <a target="blank" href="https://stripe.com">
                        <img src={InfoImage.src} className="w-6 h-6 " alt="info image"></img>
                    </a>
                    
                </div>
            </div>
        
        </div>
    )
};
export default ItemInfoContainer;