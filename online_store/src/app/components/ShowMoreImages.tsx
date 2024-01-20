'use client'
import XMarkImage from '@/app/images/XMark.svg'
import { useEffect, useState } from 'react';
import placeholderImage from '@/app/images/ImageLoading.png'

interface ShowMoreImagesProps
{
    ToggleShowAllImages:Function;
    Images:string[] | undefined;
}



function ShowMoreImages(props:ShowMoreImagesProps){
    const Images = props.Images
    const [SelectedImage, setSelectedImage] = useState<string>(Images? Images[0]: placeholderImage.src);
    const [SelectedButton, setSelectedButton] = useState<number>(0);
    

    useEffect(()=>{
        if (Images){
            setSelectedImage(Images[0])
        }
    },[Images])


    const ExitButton = ()=>{
        return(
            <button className='p-6 fixed right-0' onClick={()=>{props.ToggleShowAllImages()}}>
                <div className='bg-gray-100 w-9 h-9 rounded-full flex justify-center hover:bg-gray-300'>
                    <img className='w-6' alt='exit window' src={XMarkImage.src}></img>
                </div>
            </button>
        )
    }
    

    const SelectImageOnClick = (key:number)=>{
        if (Images){
            setSelectedImage(Images[key])
            setSelectedButton(key)
        }
    }

    

    return (
        <div>
            <div style={{height:"100%", width:"100%"}} className=" bg-white z-50 fixed">
                <ExitButton/>

                <div className='flex justify-center pt-10 '>
                    <img style={{width:"44.813rem"}} className='shadow-lg rounded-lg' src={Images? SelectedImage : ""}></img>
                </div>

                <div className=' flex justify-center gap-8 mt-8'>
                    {Images?.map((image,key)=>{
                        let style = "#D1D5DB"
                        if (SelectedButton == key){
                            style = "#DC2626"
                        }
                        return(
                        <button style={{borderColor: style}} onClick={()=>{SelectImageOnClick(key)}} key={key} className='w-20 border-2 shadow-xl'>
                            <img src={image}></img>
                        </button>

                        )
                    })}
                </div>
            </div>
        </div>
    )
};
export default ShowMoreImages;