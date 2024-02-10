import { FormatPrice } from "@/app/functions/FormatProductPrice";

interface CartInformationContainerProps{
    ItemCount:number
    SubTotal:number
}

const CartInformationContainer = (props:CartInformationContainerProps)=>{
    
    const displayPrice = FormatPrice(props.SubTotal)
    let h2DisplayString = `${displayPrice} subtotal - ${props.ItemCount} `   

    if (props.ItemCount >1){
        h2DisplayString += 'items'
    }else{
        h2DisplayString += 'item'
    }

    return (
        <div className="">
            <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
            <h2 className="text-gray-600 font-bold text-xl mt-4">{h2DisplayString}</h2>
        </div>
    )
};
export default CartInformationContainer