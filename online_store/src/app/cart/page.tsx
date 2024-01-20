import Topbar from "../components/topbar";
import UseCartInformation from "../hooks/UseCartInformation";

function CartPage(){
    const {CartLength}=UseCartInformation()
    return(
        <div>
            <Topbar CartLength={CartLength}/>
            cart
        </div>
    )
};
export default CartPage;