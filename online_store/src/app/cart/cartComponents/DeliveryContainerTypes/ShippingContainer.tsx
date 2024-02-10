import ShippingItemsImage from '@/app/images/DeliveryTypeImages/shipping.png'
import CartItemTemplate from '../CartItemTemplate';

interface CartStructure
{
    name:string;
    deliveryType:number
    quantity:number
    price:number
    recordID:string
    image:string
}

interface ShippingContainerProps{
    ShippingItems: string
    DeleteItemFunction:Function
}

function ShippingContainer(props:ShippingContainerProps){
    let ShippingItems:CartStructure[]=[];
    if (props.ShippingItems.length >0){
        ShippingItems= JSON.parse(props.ShippingItems)
    }

    return(
        <div className=" shadow-lg   flex flex-col mt-4">

            <div className='flex ml-6 mt-4'>
                <img className='w-6 h-8' src={ShippingItemsImage.src}></img>
                <h1 className="text-xl ml-4 font-bold mb-12">Shipping</h1>
            </div>
            {ShippingItems.map((item, index)=>{// propblem: nothing inside of this map is printing
                return(
                    
                    <CartItemTemplate
                        name={item.name}
                        key={index}
                        recordID={item.recordID} 
                        quantity={item.quantity} 
                        price={item.price} 
                        deliveryType={item.deliveryType}
                        thumbnail={item.image}
                        DeleteItemFunction={props.DeleteItemFunction}
                    />
                )
            })}

        </div>
    )

}
export default ShippingContainer;