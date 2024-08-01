import { FormatPrice } from "@/app/functions/FormatProductPrice";

interface CartInformationContainerProps {
    ItemCount: number
    SubTotal: number
}

const CartInformationContainer = (props: CartInformationContainerProps) => {

    const displayPrice = FormatPrice(props.SubTotal)
    let h2DisplayString = `${displayPrice} subtotal - ${props.ItemCount} `

    if (props.ItemCount > 1) {
        h2DisplayString += 'items'
    } else {
        h2DisplayString += 'item'
    }

    return (
        <div className="">

        </div>
    )
};
export default CartInformationContainer