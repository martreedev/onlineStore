'use client'
import { useEffect, useState } from "react";

interface ExpectedProps
{
    buttonNumber:number,
    source:string,
    updaterFunction:Function,
    selected:number,
    deliveryType:string,
    spanText:string,
}

function DeliveryTypeTemplate(props:ExpectedProps){
    const normalStyle={borderWidth : "2px", borderColor : "#888888"}
    const selectedStyle={borderWidth : "2px", borderColor : "#008300"}
    const [CurrentStyle, setCurrentStyle] = useState(props.buttonNumber ==1?selectedStyle : normalStyle);
    
    const updaterFunction = props.updaterFunction;
    
    useEffect(()=>{
        if(props.selected != props.buttonNumber){
        setCurrentStyle(normalStyle)
    }
    },[props.selected])

    const onPress= ()=>{
        if (props.selected != props.buttonNumber){
            updaterFunction(props.buttonNumber)
            setCurrentStyle(selectedStyle)
        }
    }

    return(
        <div onClick={onPress} style={CurrentStyle} className="w-38 h-24 p-3 rounded-lg hover:bg-gray-50  hover:cursor-pointer   mr-2">
            <img className="w-6 h-6" src={props.source}></img>
            <p className="text-base font-bold">{props.deliveryType}</p>
            <span className="text-xs">{props.spanText}</span>
        </div>
    )

}export default DeliveryTypeTemplate;