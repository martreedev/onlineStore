import AllProducts from "./allProducts"

interface MainContentProps{
    UpdateTopBarFunction:Function;
}

export default function MainContent(props:MainContentProps){
    return(
        <main  className="pt-32 flex flex-1 flex-col items-center">
            <h1 className="text-4xl pb-10 ">Welcome to Online Store!</h1>
            <AllProducts UpdateTopBarFunction={props.UpdateTopBarFunction}></AllProducts>
        </main>
    )
}