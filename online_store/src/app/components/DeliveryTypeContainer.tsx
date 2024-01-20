'use client'
import DeliveryTypeTemplate from "./DeliveryTypeTemplate"
import pickupImg from '@/app/images/DeliveryTypeImages/pickup.png'
import deliveryImg from '@/app/images/DeliveryTypeImages/delivery.png'
import shippingImg from '@/app/images/DeliveryTypeImages/shipping.png'
import { useState, useEffect } from "react";


interface DeliveryTypeContainerProps
{
    SelectedDeliveryType:number;
    setSelectedDeliveryType:Function;
}

export default function DeliveryTypeContainer(props:DeliveryTypeContainerProps){
    //const [SelectedDeliveryType, setSelectedDeliveryType] = useState<number>(1);
    
    const SelectedDeliveryType = props.SelectedDeliveryType;
    const setSelectedDeliveryType = props.setSelectedDeliveryType;

    function getDateFiveDaysFromNow() {
        // Create a new Date object for the current date
        var date = new Date();

        // Add five days to the current date
        date.setDate(date.getDate() + 5);

        // Get the day and month names in English
        var dayName = date.toLocaleString('en-US', { weekday: 'short' });
        var monthName = date.toLocaleString('en-US', { month: 'short' });

        // Return the date as a string in the format "Sun, Jan 14"
        return dayName + ', ' + monthName + ' ' + date.getDate();
    }
    const deliverySpan = `Get it by ${getDateFiveDaysFromNow()}`

    return(
        <div className="flex">

            <DeliveryTypeTemplate spanText="Ready within 2 hours" deliveryType="Pickup" selected={SelectedDeliveryType} buttonNumber={1} updaterFunction={setSelectedDeliveryType} source={pickupImg.src}/>
            <DeliveryTypeTemplate spanText="As soon as 9am today" deliveryType="Delivery" selected={SelectedDeliveryType} buttonNumber={2} updaterFunction={setSelectedDeliveryType} source={deliveryImg.src}/>
            <DeliveryTypeTemplate spanText={deliverySpan} deliveryType="Shipping" selected={SelectedDeliveryType} buttonNumber={3} updaterFunction={setSelectedDeliveryType} source={shippingImg.src}/>

        </div>

    )
}