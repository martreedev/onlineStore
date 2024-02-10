import { FormatPrice } from "@/app/functions/FormatProductPrice"
import { useRouter } from "next/navigation";
import XImage from '@/app/images/XMark.svg'
import { useState } from "react";
import { formatName } from "@/app/functions/FormatProductName";
import Select from "react-select";


interface CartItemTemplateProps{
    name:string;
    thumbnail:string,
    recordID:string,
    quantity:number,
    price:number,
    deliveryType:number
    DeleteItemFunction:Function
}
function CartItemTemplate(props:CartItemTemplateProps){
    const DisplayPrice = FormatPrice(props.price)
    const DisplayName = formatName(props.name)

    const router = useRouter();
    const redirectToProductPage = ()=>{
        router.push(`/products/${props.recordID}`)
    }

    //components
    const DeleteButton = ()=>{
        
        const deleteItem = ()=>{
            props.DeleteItemFunction(props.recordID)
        }

        return (
            <button onClick={deleteItem} className='h-9 w-9 ml-96'>
                <div className='bg-gray-100 w-9 h-9 rounded-full flex justify-center hover:bg-gray-300'>
                    <img className='w-6' alt='exit window' src={XImage.src}></img>
                </div>
            </button>
        )
    }

    // cart delivery container
    const [SelectedDeliveryMethod, setSelectedDeliveryMethod] = useState(props.deliveryType);
    const CartDeliveryContainer = ()=>{
        return (
            <div className=" ml-20">
                <div className="flex pb-6">
                    <input className="w-6 hover:cursor-pointer " type="radio"name="Radio1"></input>
                    <div className="pl-2">
                        <h3>2-day shipping</h3>
                        <h3 className=" text-green-700">Get it by Sun, Feb 11</h3>
                    </div>
                </div>


                <div className="flex pb-6">
                    <input className="w-6 hover:cursor-pointer" type="radio"name="Radio1"></input>
                    <div className="pl-2">
                        <h3>Same day delivery</h3>
                        <h3 className=" text-green-700">Get it as soon as 9am today</h3>
                    </div>
                </div>


                <div className="flex pb-6">
                    <input className="w-6 hover:cursor-pointer" type="radio"name="Radio1"></input>
                    <div className="pl-2">
                        <h3>Order Pickup</h3>
                        <h3 className=" text-green-700">Ready within 2 hours</h3>
                    </div>
                </div>
            </div>

        )
    };



    
    const QuantitySelector = ()=>{        
       const options = [
            { value: 1, label: "Qty 1" },
            { value: 2, label: "Qty 2" },
            { value: 3, label: "Qty 3" },
            { value: 4, label: "Qty 4" },
        ];
        
        const customStyles = {
            option: (provided:any) => ({
                ...provided,
                cursor: 'pointer',
                '&:hover': {
                cursor: 'pointer',
                },
            }),
        };

        return (    
            <div className="flex mt-2 ">
                <div className="flex items-center">    
                    <Select 
                        styles={customStyles}
                        options={options}
                        defaultValue={options[props.quantity-1]}
                        isSearchable={false}
                        >
                    </Select>

                </div>

                <button className="ml-1 px-4 pt-2 pb-2 rounded-md border border-gray-300 hover:cursor-pointer hover:bg-gray-50 text-center mr-4">
                    Save for later
                </button>

            </div>
        )
    }

    return(

        <div className="flex border-t-2 mx-8 pt-8 pb-8 ">
            <div className=" flex">
                <img className="w-20 h-20" src={props.thumbnail} alt="item image cover"></img>
                <div className="flex flex-col ml-6 ">

                    <p onClick={redirectToProductPage} className="text-lg hover:underline hover:cursor-pointer">
                        {DisplayName}
                    </p>
                    <h3 className="text-red-600 text-lg font-semibold">{DisplayPrice}</h3>

                    <QuantitySelector/>
                </div>
            </div>



            
            <CartDeliveryContainer/>

            <DeleteButton/>
        </div>
        
    )
};
export default CartItemTemplate