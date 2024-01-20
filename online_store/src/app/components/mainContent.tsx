import AllProducts from "./allProducts"

interface MainContentProps{
    UpdateTopBarFunction:Function;
}

export default function MainContent(props:MainContentProps){
    return(
        <main  className="pt-36  ">
            <h1 className="text-4xl">Welcome to Online Store!</h1>
            <AllProducts UpdateTopBarFunction={props.UpdateTopBarFunction}></AllProducts>
        </main>
    )
}