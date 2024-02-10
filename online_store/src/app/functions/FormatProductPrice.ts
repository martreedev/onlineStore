function FormatPrice(price:number){
    let newPrice= `${price.toFixed(2)}`;
    if (price % 1 == 0){
        newPrice = `${price}.00`
    }
    return `$${newPrice}`
}
export {FormatPrice}