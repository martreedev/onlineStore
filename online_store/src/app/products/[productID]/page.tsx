'use client'
import { useEffect, useState, useCallback } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Topbar from "@/app/components/topbar";
import { FormatPrice } from "@/app/functions/FormatProductPrice";
import Footer from "@/app/components/footer";
import UseChangeQuantity from "@/app/hooks/ChangeQuantityEventHandler";
import AboutThisItem from "@/app/components/AboutThisItem";
import ProductImageContainer from "@/app/components/ProductImageContainer";
import ItemInfoContainer from "@/app/components/ItemInfoContainer";
import ShowMoreImages from "@/app/components/ShowMoreImages";
import ProductTemplate from "@/app/components/ProductTemplate";
import UseCartInformation from "@/app/hooks/UseCartInformation";


interface ProductTemplate{
    Name:string,
    Price:number,
    Description:string,
    Images:string[],
    Highlights: string[],
}

export default function ProductPage(props:any){
    const [RecordData, setRecordData] = useState<ProductTemplate>();
    const {PriceTextColor, ItemQuantity, setDisplayPrice, DisplayPrice,  setBasePrice, ChangeQuantityEventHadler} = UseChangeQuantity(event);
    const [ShowMoreImagesCarousel , setShowMoreImagesCarousel ] = useState<boolean>(false);
    


    const ProductID = props.params.productID;
    const getRecord = async()=>{
        const docRef=  doc(db, 'products', ProductID);
            const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data){
        const record:ProductTemplate=
        {
            Name:           data['Name'],
            Price:          data['Price'],
            Description:    data['Description'],
            Images:         data['Images'],
            Highlights:     data['Highlights']
        }
        return record;
        }
    }
    const fetchData = useCallback(async()=>{
        try{
            const result = await getRecord()
            if (result){
                setRecordData(result)
                let price:any = result.Price
                if (price){
                    setBasePrice(price)
                    price = FormatPrice(price);
                    setDisplayPrice(price)
                }
            }
        }catch(e){
            console.log(e)
        }
    },[])

   

    useEffect(()=>{
        fetchData()
    },[])


    const images = RecordData?.Images;
    const description = RecordData?.Description;
    const highlights = RecordData?.Highlights;
    const name = RecordData?.Name;

    const ToggleShowAllImages = ()=>{
        setShowMoreImagesCarousel(!ShowMoreImagesCarousel)
    }

    const { CartLength, updateCart }= UseCartInformation();
    return (
        <div>
            
            {ShowMoreImagesCarousel ? <ShowMoreImages Images={images} ToggleShowAllImages={ToggleShowAllImages}></ShowMoreImages> :null}

            <Topbar CartLength={CartLength}></Topbar>

            <div className="pt-28 flex">
                <ProductImageContainer ShowImagesOnClick={ToggleShowAllImages} images={images}></ProductImageContainer>
                {/*The functionality for saving items to the cart is located in ItemInfoContainer*/}
                <ItemInfoContainer 
                    UpdateCart={updateCart}
                    ItemQuantity={ItemQuantity}
                    realPrice={RecordData?.Price}
                    recordID={ProductID}
                    name={name} 
                    PriceTextColor={PriceTextColor} 
                    DisplayPrice={DisplayPrice}
                    ChangeQuantityEventHadler={ChangeQuantityEventHadler}
                />
            </div>

            <AboutThisItem description={description} highlights={highlights}></AboutThisItem>

            <Footer/>
        </div>
    )

}