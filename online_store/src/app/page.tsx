import Topbar from './components/topbar'
import MainContent from './components/mainContent'
import Footer from './components/footer'

export default function Home() {
  return (
    <div className='flex flex-col h-full'>
      <Topbar/>
      
      <MainContent/>

      <Footer/>
    </div>
  )
}
