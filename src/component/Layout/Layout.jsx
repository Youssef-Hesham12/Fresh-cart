import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="my-[48px] py-[48px]  ">
        <Outlet >

        </Outlet>
      </div>
      <Footer />
    </>
  )
}
