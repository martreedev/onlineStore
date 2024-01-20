

interface ItemQuantitySelecterProps
{
   ChangeQuantityEventHadler:Function; 
}
function ItemQuantitySelecter(props:ItemQuantitySelecterProps){
    return(
        <div className="flex items-center       mt-20">
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

            <button style={{width: "21rem"}} className="bg-red-600 text-white h-11 rounded-md hover:bg-red-700">Add to cart</button>
        </div>
        
    )
};
export default ItemQuantitySelecter