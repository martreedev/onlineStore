import { FormatPrice } from "../functions/FormatProductPrice"
import { formatName } from "../functions/FormatProductName"
import { useRouter } from 'next/navigation'

interface ExpectedProps{
    Name: string,
    Price: number,
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

    return (
       
        <div style={{height:"22rem"}} className="w-56 text-center  bg-gray-50 shadow-2xl mb-3 rounded-lg flex  items-center flex-col">
            
            
            <div onClick={redirectToProductPage} className=" h-5/6">
                <button className="flex items-center flex-col">
                    <img className="w-44 rounded-lg mt-3" src={FirstImage} alt="Product cover image"></img>
                    <h1 className="font-bold text-xl pt-5 ">{price}</h1>
                    <h1 className="hover:underline">{ProductName}</h1>
                </button>
            </div>

            <button className="bg-red-600 text-white rounded-lg w-52 h-10">Add to cart</button>
    
            
        </div>
        
    )
}