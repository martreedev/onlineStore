import { useEffect, useState } from "react";

interface CartStructure
{
    deliveryType:number
    quantity:number
    price:number
    recordID:string
}



function CartControls(){

    const [Cart, setCart] = useState<CartStructure[]>([]);
    const [ItemAlreadyInCart, setItemAlreadyInCart] = useState(false);
    const [QuantityInCart, setQuantityInCart] = useState(0);

    useEffect(()=>{
        const PulledCart = sessionStorage.getItem("Cart")
        if (PulledCart){
            const cart:CartStructure[] = JSON.parse(PulledCart)
            setCart(cart) 
        }
    },[])


    const UpdateCartData = ()=>{
        const cart = JSON.stringify(Cart)
        sessionStorage.setItem('Cart', cart)
    }

    const RefetchCart=()=>{
        const CartSession = sessionStorage.getItem("Cart")
        if (CartSession){
            const newCart:CartStructure[] = JSON.parse(CartSession)
            setCart(newCart)
        }
    }

    const CheckIfItemInCart = (recordID:string)=>{
        const CartSession = sessionStorage.getItem("Cart")
        if (CartSession !== null){
            const newCart:CartStructure[] = JSON.parse(CartSession)
            for (let i=0; i< newCart.length; i++){
                const item = newCart[i];
                if (item.recordID == recordID){
                    setItemAlreadyInCart(true);
                    setQuantityInCart(item.quantity)
                }
            }
        }
    }
    
    const CheckIndividualItemInCart = (recordID:string)=>{
        const CartSession = sessionStorage.getItem("Cart")
        if (CartSession !== null){
            const newCart:CartStructure[] = JSON.parse(CartSession)
            for (let i=0; i< newCart.length; i++){
                const item = newCart[i];
                if (item.recordID == recordID){
                    return [1, item.quantity]
                }
            }
            return [0,0]
        }
        return [0,0]
    }


    const AddToCart = (recordID:string, ItemQuantity:number, SelectedDeliveryType:number, realPrice:number|undefined)=>{
        if (realPrice){
            const Item:CartStructure = 
            {
                deliveryType:SelectedDeliveryType,
                quantity:ItemQuantity,
                price:realPrice,
                recordID:recordID
            }
            
            const NewCart:CartStructure[] = Cart
            NewCart.push(Item)
            console.log(Cart)
            
            sessionStorage.setItem("Cart", JSON.stringify(Cart))
            setCart(NewCart)
            setItemAlreadyInCart(true)
            setQuantityInCart(Item.quantity)
        }
        
    }

    const DeleteItemFromCart = (recordID:string)=>{
        const JSON_cart = sessionStorage.getItem("Cart")
        if (JSON_cart){
            let cart:CartStructure[] = JSON.parse(JSON_cart)

            for (let i=0; i<cart.length; i++){
                if (cart[i].recordID == recordID){
                    cart.splice(i,1)
                }
            }
            sessionStorage.setItem('Cart', JSON.stringify(cart))
            setCart(cart)
            setItemAlreadyInCart(false)
            console.log("deleted ",recordID)
        }
    }
    return {
        Cart, 
        setCart, 
        ItemAlreadyInCart,
        setItemAlreadyInCart,
        setQuantityInCart,
        QuantityInCart,
        AddToCart,
        DeleteItemFromCart,
        CheckIfItemInCart,
        RefetchCart,
        UpdateCartData,
        CheckIndividualItemInCart
        }

};
export default CartControls;