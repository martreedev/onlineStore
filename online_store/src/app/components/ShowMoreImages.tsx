'use client'
import XMarkImage from '@/app/images/XMark.svg'
import { useEffect, useState } from 'react';
import placeholderImage from '@/app/images/ImageLoading.png'
import RightArrowImage from '@/app/images/RightArrow.svg'
import LeftArrowImage from '@/app/images/LeftArrow.svg'

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

    const IncrementSelectedPircture = (direction:string)=>{
        if (direction == "right"){
            SelectImageOnClick(SelectedButton +1)
        }else if (direction == "left"){
            SelectImageOnClick(SelectedButton -1)
        }
    }

    return (
        <div>
            <div style={{height:"100%", width:"100%"}} className=" bg-white z-50 fixed">
                <ExitButton/>


            


                <div className='flex justify-center pt-10 '>
                    <img style={{width:"44.813rem"}} className='shadow-lg rounded-lg' src={Images? SelectedImage : placeholderImage.src}></img>
                </div>

                <div className=' flex justify-center items-center gap-8 mt-8'>
                    
                    <button disabled={SelectedButton == 0? true: false} onClick={()=>{IncrementSelectedPircture("left")}} className='p-6'>
                        <div className='bg-gray-100 w-11 h-11 rounded-full flex justify-center hover:bg-gray-300'>
                            <img className='w-8' alt='exit window' src={LeftArrowImage.src}></img>
                        </div>
                    </button>
                    

                    {Images?.map((image,key)=>{
                        let style = "#D1D5DB"
                        if (SelectedButton == key){
                            style = "#DC2626"
                        }
                        return(
                        <button style={{borderColor: style}} onClick={()=>{SelectImageOnClick(key)}} key={key} className='w-20 h-20 border-2 shadow-xl'>
                            <img src={image}></img>
                        </button>

                        )
                    })}
                    
                    <button disabled={Images && SelectedButton ==Images.length-1? true: false} onClick={()=>{IncrementSelectedPircture("right")}} className='p-6'>
                        <div className='bg-gray-100 w-11 h-11 rounded-full flex justify-center hover:bg-gray-300'>
                            <img className='w-8' alt='exit window' src={RightArrowImage.src}></img>
                        </div>
                    </button>
                    
                </div>
            </div>
        </div>
    )
};
export default ShowMoreImages;