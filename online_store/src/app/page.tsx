'use client'
import Topbar from './components/topbar'
import MainContent from './components/mainContent'
import Footer from './components/footer'
import UseCartInformation from './hooks/UseCartInformation'

export default function Home() {
  const {CartLength}=UseCartInformation()

  return (
    <div className='flex flex-col h-full'>
      <Topbar CartLength={CartLength}/>
      
      <MainContent/>

      <Footer/>
    </div>
  )
}
