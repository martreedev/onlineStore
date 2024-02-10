'use client'

import PickupItemsImage from '@/app/images/DeliveryTypeImages/pickup.png'
import CartItemTemplate from './CartItemTemplate';
import { useEffect, useState } from "react";
import PickupContainer from './DeliveryContainerTypes/PickupContainer';
import DeliveryContainer from './DeliveryContainerTypes/DeliveryContainer';
import ShippingContainer from './DeliveryContainerTypes/ShippingContainer';
import CartControls from '@/app/hooks/AddRemoveCart';


interface CartStructure
{
    image:string
    deliveryType:number
    quantity:number
    price:number
    recordID:string
    name:string
}

interface DeliveryItemContainerProps
{
    UpdateCartLengthFunction:Function
}

function DeliveryItemContainer(props:DeliveryItemContainerProps){
    const [PickupItemsJSON, setPickupItemsJSON] = useState<string>("");
    const [DeliveryItemsJSON, setDeliveryItemsJSON] = useState<string>("");
    const [ShippingItemsJSON, setShippingItemsJSON] = useState<string>("");
    
    const [PickupItems, setPickupItems] = useState<CartStructure[]>([]);
    const [DeliveryItems, setDeliveryItems] = useState<CartStructure[]>([]);
    const [ShippingItems, setShippingItems] = useState<CartStructure[]>([]);
    

    const PickupSpanText= "Ready within 2 hours"
    const DeliverySpanText= "Same day delivery"
    const ShippingSpanText= ""

    const { DeleteItemFromCart, refetchCartFromStorage, Cart, setCart } = CartControls();


    const DeleteItem = (recordID:string)=>{
        DeleteItemFromCart(recordID)
        const refetchedCart:CartStructure[] = refetchCartFromStorage();
        setCart(refetchedCart)
        props.UpdateCartLengthFunction()
    }

    let PickupItemsArr:CartStructure[] = [];
    let DeliveryItemsArr:CartStructure[] = [];
    let ShippingItemsArr:CartStructure[] = [];

    useEffect(()=>{
        const SeperateDeliveryTypes = ()=>{
    
            for (let i=0; i< Cart.length; i++){
                const item = Cart[i];
                const deliveryType = item.deliveryType;

                switch(deliveryType){
                    case 1:
                        PickupItemsArr.push(item)
                        break;
                    case 2:
                        DeliveryItemsArr.push(item);
                        break;
                    case 3:
                        ShippingItemsArr.push(item);
                        break;
                }
            }

            setPickupItemsJSON(JSON.stringify(PickupItemsArr));
            setPickupItems(PickupItemsArr)

            setDeliveryItemsJSON(JSON.stringify(DeliveryItemsArr));
            setDeliveryItems(DeliveryItemsArr)

            setShippingItemsJSON(JSON.stringify(ShippingItemsArr))
            setShippingItems(ShippingItemsArr)
        }
        SeperateDeliveryTypes();
    },[Cart])

    
    
    return (
        <div className='w-3/4 h-1/2'>
            {PickupItems.length >0 ? <PickupContainer DeleteItemFunction={DeleteItem} PickupItems={PickupItemsJSON}/>: null}
            {DeliveryItems.length >0? <DeliveryContainer DeleteItemFunction={DeleteItem} DeliveryItems={DeliveryItemsJSON}/>: null}
            {ShippingItems.length >0?<ShippingContainer DeleteItemFunction={DeleteItem} ShippingItems={ShippingItemsJSON}/>: null}
        </div>
        
    )
};
export default DeliveryItemContainer