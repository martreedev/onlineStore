

interface AboutThisItemProps
{
    description:string | undefined;
    highlights:string[]| undefined;
}

function AboutThisItem(props:AboutThisItemProps){
    return(
        <div style={{width:"77%", backgroundColor:"#F7F7F7"}} className="  m-auto flex-col flex items-center mt-6">
            <h1 className="text-2xl font-semibold text-center pb-3 pt-8">About this item</h1>

            <div style={{width: "95%"}} className=" flex flex-col items-center rounded-lg bg-white" >
                
                
                <div className="flex gap-2.5 ">

                    {props.highlights && props.highlights.length >0? <div className=" flex-1 p-14">
                        <h2 className="text-lg font-semibold pb-3" >Highlights</h2>
                        {
                            props.highlights?.map((highlight)=>{
                                return(     <li key={highlight} className="text-base pb-3">{highlight}</li>    )
                            })
                        }
                    </div>: null}



                    <div className="flex-1 p-14">
                        <h2 className="text-lg font-semibold pb-3">Description</h2>
                        <p className="text-base">{props.description}</p>
                    </div>

                </div>
            </div>


        </div>
    )
};
export default AboutThisItem