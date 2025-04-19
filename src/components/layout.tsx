import { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

const ParentLayout = ({children}:PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
   <Header/>
      <main className='min-h-screen container mx-auto justify-center'>
        {children}
      </main>
      <Footer />
      </div>
  )
}

export default ParentLayout
