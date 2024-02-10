
import { FormatPrice } from "@/app/functions/FormatProductPrice";
import { useState } from "react";

const UseChangeQuantity = (event:any)=>{
    const [PriceTextColor, setPriceTextColor] = useState('#000000');
    const [ItemQuantity, setItemQuantity] = useState<number>(1);
    const [DisplayPrice, setDisplayPrice] = useState('');
    const [BasePrice, setBasePrice] = useState(0);
    
    const ChangeQuantityEventHadler = (event:any)=>{
        
        const Quantity:number = Number(event.target.value)
        if (Quantity != 1){
            setPriceTextColor('#B91C1C')//red
        }else{
            setPriceTextColor('#000000')//black
        }
        setDisplayPrice(FormatPrice((BasePrice * Quantity)))
        setItemQuantity(Quantity);
    }

    return {PriceTextColor, ItemQuantity, setDisplayPrice, DisplayPrice,  setBasePrice, ChangeQuantityEventHadler}
};
export default UseChangeQuantity