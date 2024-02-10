'use client'
import { getFirestore, collection, getDocs } from "firebase/firestore"
import {app} from '@/app/firebase/config'
import { useEffect, useState, useCallback } from "react"
import ProductTemplate from "./ProductTemplate"
import { db } from "@/app/firebase/config"
import CartControls from "../hooks/AddRemoveCart"

interface ProductEntry{
    id: string
    data: ProductType
}
interface ProductType{
    Name: string,
    Price: number,
    Description: string,
    Category: string,
    Images: string[],
    Highlights: string[]
}


interface AllProductsProps{
    UpdateTopBarFunction:Function
}

export default function AllProducts(props:AllProductsProps){
    const [ArrayList, setArrayList] = useState<Array<ProductEntry>>([]);

    const fetchData = useCallback(async ()=>{
        try{
            const ProductList = await getDocs(collection(db, "products"));
            let ObjectList: ProductEntry[] = []
            ProductList.forEach((doc) => {
                const id = doc.id;
                const data = doc.data();
                
                const Product_body:ProductType = 
                {
                    Name: data['Name'],
                    Price: data['Price'],
                    Description: data["Description"],
                    Category: data["Category"],
                    Images: data["Images"],
                    Highlights: data["Highlights"]
                }

                const completed:ProductEntry = {id : id, data:Product_body}
                ObjectList.push(completed)
            });
            setArrayList(ObjectList)
        }catch(e){
            console.log("oopsie :/")
            console.log(e)
        }
    },[]);

    useEffect(()=>{
        fetchData()
    },[fetchData])
    

    const {
        AddToCart,
        DeleteItemFromCart,
        CheckIndividualItemInCart
        } = CartControls()
    


    return (
        <div className=" flex-1 flex-wrap justify-center gap-14 flex ">
            {ArrayList.map((data)=>{
                const Product = data.data
                const itemIsinCart =CheckIndividualItemInCart(data.id)

                return (
                    <ProductTemplate 
                        UpdateTopbarFunction={props.UpdateTopBarFunction}
                        DeleteFromCart={DeleteItemFromCart}
                        AddToCart={AddToCart}
                        ItemAlreadyInCart={itemIsinCart[0] == 1 ? true : false}
                        QuantityInCart={itemIsinCart[1]}
                        key={data.id}
                        ID={data.id}
                        Name={Product.Name} 
                        Price={Product.Price} 
                        Description={Product.Description}
                        Category={Product.Category}
                        Highlights={Product.Highlights}
                        Images={Product.Images}
                        >
                    </ProductTemplate>  
                )
            })}
        </div>
    )
}