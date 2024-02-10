import PictureLoadingImage from '@/app/images/ImageLoading.png'

interface ProductImageContainerProps
{
    images:string[] | undefined;
    ShowImagesOnClick:Function;
}

function ProductImageContainer(props:ProductImageContainerProps){
    const images = props.images;
    const ToggleShowImages = props.ShowImagesOnClick
    return(
        <div className="w-2/4">
            <div className='flex flex-col items-end'>
                <img style={{width: "41.25rem"}} className="shadow-lg rounded-xl" src={images ? images[0]:PictureLoadingImage.src} alt="product image 1"></img>
                <div className='flex flex-col items-center'>
                    <div className='flex pb-7'>
                        <img style={{width:"20rem"}} className="shadow-lg mt-5 mr-5 rounded-xl" src={images?images[1]:PictureLoadingImage.src} alt="product image 2"></img>
                        <img style={{width:"20rem"}} className="shadow-lg rounded-xl mt-5 " src={images?images[2]:PictureLoadingImage.src} alt="product image 2"></img>
                    </div>
                    {images&& images?.length > 3? <button onClick={()=>{ToggleShowImages()}} className='border border-gray-400 h-11 bg-white text-lg rounded-md px-3 hover:bg-gray-50'>Show more images</button> : null}   
                </div>
                
                   
            </div>
        </div>
    )
};
export default ProductImageContainer;