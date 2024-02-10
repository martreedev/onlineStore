'use client'
import Topbar from './components/topbar'
import MainContent from './components/mainContent'
import Footer from './components/footer'
import CartControls from './hooks/AddRemoveCart'

export default function Home() {
  const {CartLength, refetchCartLength} = CartControls()
  
  return (
    <div className='flex flex-col h-full'>
      <Topbar CartLength={CartLength}/>
      
      <MainContent UpdateTopBarFunction={refetchCartLength}/>

      <Footer/>
    </div>
  )
}
