import { FormatPrice } from "../functions/FormatProductPrice"
import { formatName } from "../functions/FormatProductName"
import { useRouter } from 'next/navigation'
import CartControls from "../hooks/AddRemoveCart"
import { useEffect, useState } from "react";
import UseCartInformation from "../hooks/UseCartInformation";

interface ExpectedProps{
    UpdateTopbarFunction:Function
    DeleteFromCart:Function,
    AddToCart:Function,
    ItemAlreadyInCart:boolean,
    QuantityInCart:number
    Name: string,
    Price: number ,
    Description: string,
    Category: string,
    Images: string[],
    Highlights: string[],
    ID:string;
}

export default function ProductTemplate(props:ExpectedProps){
    const FirstImage = props.Images[0]
    const price = FormatPrice(props.Price)
    const ProductName = formatName(props.Name)
    const ID = props.ID;

    const router = useRouter();
    const redirectToProductPage = ()=>{
        router.push(`/products/${ID}`)
    }
    
    const {CartLength, updateCartLength} = UseCartInformation()
    
    /*
    useEffect(()=>{
        CheckIfItemInCart();
    },[])
    */

    const DefaultButtonStyle ="bg-red-600 text-white rounded-lg w-52 h-10"
    const ItemInCartButtonStyle ="bg-white text-green-600 border-2 border-green-600 hover:text-green-800 hover:border-green-800 rounded-lg w-52 h-10"

    const AddToCartOnClick = ()=>{
        props.AddToCart(props.ID, 1, 1, props.Price)
        updateCartLength();
    }
    const DeleteItemOnClick = ()=>{
        props.DeleteFromCart(props.ID)
        updateCartLength()
    }

    const [IsItemInCart, setIsItemInCart] = useState<boolean>(props.ItemAlreadyInCart);
    const [AmountInCart, setAmountInCart] = useState(props.QuantityInCart);
    
    return (
       
        <div style={{height:"22rem"}} className="w-56 text-center  bg-gray-50 shadow-2xl mb-3 rounded-lg flex  items-center flex-col">
            
            
            <div onClick={redirectToProductPage} className=" h-5/6">
                <button className="flex items-center flex-col">
                    <img className="w-44 rounded-lg mt-3" src={FirstImage} alt="Product cover image"></img>
                    <h1 className="font-bold text-xl pt-5 ">{price}</h1>
                    <h1 className="hover:underline">{ProductName}</h1>
                </button>
            </div>

            
            <button onClick={()=>{
                if(!IsItemInCart){
                    AddToCartOnClick()
                    setIsItemInCart(true)
                    setAmountInCart(1)
                    props.UpdateTopbarFunction()
                }else{
                    DeleteItemOnClick()
                    setIsItemInCart(false)
                    setAmountInCart(0)
                    props.UpdateTopbarFunction()
                }
            }} className={IsItemInCart && CartLength> 0 ? ItemInCartButtonStyle : DefaultButtonStyle}>{IsItemInCart && CartLength >0 ? `${AmountInCart} in cart` :"Add to cart"}</button>
    
        
            
            
        </div>
        
    )
}