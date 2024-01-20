

interface ItemQuantitySelecterProps
{
    QuantityInCart:number;
    DeleteItemFromCart:Function;
    CartLength:number;
    ItemIsInCart:boolean;
    ChangeQuantityEventHadler:Function; 
    AddToCartSubmit:Function;
}



function ItemQuantitySelecter(props:ItemQuantitySelecterProps){
    
    const DefaultButtonStyle = "bg-red-600 text-white h-11 rounded-md hover:bg-red-700 hover:bg-red-700"
    const ItemInCartButtonStyle = "bg-white text-green-600 h-11 border-2 border-green-600 rounded-md hover:text-green-800 hover:border-green-800"

    return(
        <div className="flex items-center       mt-20">
            
            {props.ItemIsInCart && props.CartLength > 0?
            null:
            <div className="flex items-center">
                <p className="text-xl" >Qty</p>
                <select className="ml-1 w-16 h-11 rounded-md border border-gray-700 hover:cursor-pointer hover:bg-gray-50 text-center mr-4" id="quantity" name="quantity" onChange={props.ChangeQuantityEventHadler}>   
                    <option value="1">1</option>
                    <option value="2">2</option>  
                    <option value="3">3</option>   
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>  
                    <option value="7">7</option>   
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>}

            <button style={{width: "21rem"}} className={props.ItemIsInCart && props.CartLength> 0 ? ItemInCartButtonStyle : DefaultButtonStyle}
            
            onClick={()=>{
                if (!props.ItemIsInCart){
                    props.AddToCartSubmit()
                }else{
                    props.DeleteItemFromCart()
                }
                
            }
            }>{props.ItemIsInCart  && props.CartLength>0? `${props.QuantityInCart} in cart`: "Add to cart"}</button>

        </div>
        
    )
};
export default ItemQuantitySelecter