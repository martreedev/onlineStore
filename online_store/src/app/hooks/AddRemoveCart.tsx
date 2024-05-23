import { useEffect, useState } from "react";

interface CartStructure
{
    image:string
    deliveryType:number
    quantity:number
    price:number
    recordID:string
    name:string
}

function CartControls(){

    const [Cart, setCart] = useState<CartStructure[]>([]);
    const [CartLength, setCartLength] = useState<number>(0);
    const [SubTotal, setSubTotal] = useState(0);
    

    const [ItemAlreadyInCart, setItemAlreadyInCart] = useState(false);
    const [QuantityInCart, setQuantityInCart] = useState(0);

    useEffect(()=>{
        refetchCartFromStorage()
        refetchCartLength()
        refetchCartSubtotal()
    },[])

    const refetchCartFromStorage = ()=>{
        const LocalStorageCart = sessionStorage.getItem("Cart")
        if (LocalStorageCart){
            const parsedCart:CartStructure[] = JSON.parse(LocalStorageCart)
            setCart(parsedCart)
            return parsedCart
        }else{
            const empty:CartStructure[] = [] 
            return empty;
        }
    }

    const refetchCartSubtotal = ()=>{
        const LocalStorageCart = sessionStorage.getItem("Cart");
        if (LocalStorageCart){
            const parsedCart:CartStructure[] = JSON.parse(LocalStorageCart)
            let subtotal = 0

            for (let i=0; i<LocalStorageCart.length; i++){
                if (parsedCart[i]){
                    const price:number = parsedCart[i].price * parsedCart[i].quantity
                    subtotal += price
                }
                
            }
            setSubTotal(subtotal)
        }else{
            return 0
        }
    }

    const refetchCartLength = ()=>{
        const LocalStorageCart = sessionStorage.getItem("Cart");
        if (LocalStorageCart){
            const parsedCart:CartStructure[] = JSON.parse(LocalStorageCart)
            let length:number = 0;
            for (let i=0; i<LocalStorageCart.length; i++){
                if (parsedCart[i]){
                    const quant:number = parsedCart[i].quantity
                    length = length + quant
                }
                
            }
            setCartLength(length)
        }else{
            return 0
        }
        refetchCartSubtotal()
    }

    const getItemCountInCart = ()=>{
        const LocalStorageCart = sessionStorage.getItem("Cart");
        if (LocalStorageCart){
            const parsedCart:CartStructure[] = JSON.parse(LocalStorageCart)
            let itemCount =  0;
            for (let i=0; i< parsedCart.length; i++){
                const item = parsedCart[i]
                if (item.quantity > 0){
                    console.log(itemCount)
                    itemCount ++;
                }
            }
            return itemCount

        }else{
            return "empty cart"
        }
    }

    const UpdateItemQuantityWithRecordID = (recordID:string, newQuantity:number)=>{
        //
        //const array = [2, 5, 9];
        let array:CartStructure[] = Cart;
        let Record= null;

        let index:number = -1;
        //find the index of the record that contains the recordID

        for (let i =0; i<array.length; i++){
            const record = array[i];
            if (record.recordID == recordID){
                Record = record
                index = i
            }
        }

        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }else{
            console.log(`Record: ${recordID} does not exist in cart`)
            return
        }
        //item is removed from array
        if (Record){//change the item quantity
            Record.quantity = newQuantity
            array.push(Record)// add updated record to cart array
            setCart(array)// update cart state with new array
        }
    }

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
        if (CartSession){
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
        if (CartSession){
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


    const AddToCart = (imageSrc:string, recordID:string, ItemQuantity:number, SelectedDeliveryType:number, realPrice:number|undefined, name:string)=>{
        if (realPrice){
            const Item:CartStructure = 
            {
                name:name,
                image:imageSrc,
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
        CheckIndividualItemInCart,
        refetchCartFromStorage,
        getItemCountInCart,
        refetchCartLength,
        CartLength,
        refetchCartSubtotal,
        SubTotal,
        UpdateItemQuantityWithRecordID
        }

};
export default CartControls;