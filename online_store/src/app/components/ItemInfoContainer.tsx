'use client'
import DeliveryTypeContainer from "./DeliveryTypeContainer";
import ItemQuantitySelecter from "./ItemQuantitySelecter";
import StripeLogo from '@/app/images/stripe_logo.png'
import InfoImage from '@/app/images/Info.svg'
import { useEffect, useState } from "react";
import UseCartInformation from "../hooks/UseCartInformation";

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
    const [Cart, setCart] = useState<CartStructure[]>([]);
    const [ItemAlreadyInCart, setItemAlreadyInCart] = useState(false);
    const [QuantityInCart, setQuantityInCart] = useState(0);
    
    
    useEffect(()=>{
        const CartSession = sessionStorage.getItem("Cart")
        if (CartSession !== null){
            const newCart:CartStructure[] = JSON.parse(CartSession)
            

            for (let i=0; i< newCart.length; i++){
                const item = newCart[i];
                if (item.recordID == props.recordID){
                    setItemAlreadyInCart(true);
                    setQuantityInCart(item.quantity)
                }
            }
            
            setCart(newCart)
        }
    },[])

    

    const AddToCart = ()=>{
        if (props.realPrice){

            const Item:CartStructure = 
            {
                deliveryType:SelectedDeliveryType,
                quantity:props.ItemQuantity,
                price:props.realPrice,
                recordID:props.recordID

            }
            const NewCart:CartStructure[] = Cart
            NewCart.push(Item)
            setCart(NewCart)
            sessionStorage.setItem("Cart", JSON.stringify(Cart))
            console.log("added to cart")
            setItemAlreadyInCart(true)

            setQuantityInCart(Item.quantity)

            props.UpdateCart()
        }
        
    }

    const DeleteItemFromCart = ()=>{
        const JSON_cart = sessionStorage.getItem("Cart")
        if (JSON_cart){
            let cart:CartStructure[] = JSON.parse(JSON_cart)

            for (let i=0; i<cart.length; i++){
                if (cart[i].recordID == props.recordID){
                    cart.splice(i,1)
                }
            }
            console.log(cart)
            sessionStorage.setItem('Cart', JSON.stringify(cart))
            setCart(cart)
            setItemAlreadyInCart(false)
            props.UpdateCart()

        }
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
                DeleteItemFromCart={DeleteItemFromCart}
                CartLength={Cart.length}
                ItemIsInCart={ItemAlreadyInCart}
                AddToCartSubmit={AddToCart} 
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