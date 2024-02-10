import CartItemTemplate from "../CartItemTemplate"
import PickupItemsImage from '@/app/images/DeliveryTypeImages/pickup.png'

interface CartStructure
{
    name:string
    deliveryType:number
    quantity:number
    price:number
    recordID:string
    image:string
}

interface PickupContainerProps{
    PickupItems: string
    DeleteItemFunction:Function
}

function PickupContainer(props:PickupContainerProps){
    let PickupItems:CartStructure[]=[];
    if (props.PickupItems.length >0){
        PickupItems= JSON.parse(props.PickupItems)
    }
    return(
        <div className=" shadow-lg   flex flex-col ">

            <div className='flex ml-6 mt-4'>
                <img className='w-6 h-8' src={PickupItemsImage.src}></img>
                <h1 className="text-xl ml-4 font-bold mb-12">Order Pickup</h1>
            </div>

            {PickupItems.map((item)=>{// propblem: nothing inside of this map is printing
                return(
                    
                    <CartItemTemplate 
                        name={item.name}
                        key={item.recordID}
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
};
export default PickupContainer