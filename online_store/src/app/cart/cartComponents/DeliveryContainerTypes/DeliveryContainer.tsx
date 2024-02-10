import CartItemTemplate from "../CartItemTemplate"
import DeliveryItemsImage from '@/app/images/DeliveryTypeImages/delivery.png'

interface CartStructure
{
    name:string;
    deliveryType:number
    quantity:number
    price:number
    recordID:string
    image:string
}

interface DeliveryContainerProps{
    DeliveryItems: string
    DeleteItemFunction:Function
}

function DeliveryContainer(props:DeliveryContainerProps){
    let DeliveryItems:CartStructure[]=[];
    if (props.DeliveryItems.length >0){
        DeliveryItems= JSON.parse(props.DeliveryItems)
    }
    return(
        <div className=" shadow-lg   flex flex-col mt-4">

            <div className='flex ml-6 mt-4'>
                <img className='w-6 h-8' src={DeliveryItemsImage.src}></img>
                <h1 className="text-xl ml-4 font-bold mb-12">Delivery</h1>
            </div>
            {DeliveryItems.map((item, index)=>{// propblem: nothing inside of this map is printing
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
};
export default DeliveryContainer