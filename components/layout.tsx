import { ReactNode } from 'react'
import Navbar from './nav'
export default function Layout({ children }:{children:ReactNode}){
    return(
        <div>
       < Navbar/>
       <main>{children}</main>
       </div>
    )
}