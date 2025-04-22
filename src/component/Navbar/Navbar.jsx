import React, { useContext,  useRef } from 'react'
import { Link,  NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { userContext } from '../../Context/UserContext'
import { cartContext } from '../../Context/CartContext'
export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(userContext)
  let { cart } = useContext(cartContext)

  let bar = useRef(null)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('userToken')
    setUserLogin(null)
    navigate('/login')
  }
  function showMenuBar() {
    bar.current.classList.remove('hidden')
  }
  function removeMenuBar() {
    bar.current.classList.add('hidden')
  }


  return (
    <>
      <nav className="bg-[#F8F9FA] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 mx-auto container ">
        <div className=" flex flex-wrap items-center justify-between py-1 px-3 mx-6 container max-w-2xl sm:px-6  lg:max-w-7xl lg:px-8 sm:py-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="fresh cart logo" width={110} />

          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userLogin == null ? <>
              <NavLink to={'/register'} className=" hidden cursor-pointer text-[#000000cc]  text-base m-2  bg-[#F8F9FA] p-2 sm:block">Register</NavLink>
              <NavLink to={'/login'} className=" hidden  cursor-pointer text-[#000000cc]  text-base m-2  bg-[#F8F9FA] p-2 sm:block">Login</NavLink></>
              : <div className='flex'>
                <Link to={'/cart'} className='relative'>
                  <i className="fa-solid fa-cart-shopping hidden sm:block cursor-pointer text-[#000000cc] text-[20px]  m-2  bg-[#F8F9FA] md:p-0 "></i>
                  <div className="absolute  items-center justify-center py-[2px] px-[4px] text-xs font-bold text-white bg-[#4fa74f] border-2 border-white rounded-md  -top-2 -end-2 dark:border-gray-900 hidden sm:block">{cart?.numOfCartItems}</div>

                </Link>
                <span onClick={logout} className="hidden sm:block cursor-pointer text-[#000000cc]  text-base m-2  bg-[#F8F9FA] md:p-0 ">log out</span></div>}


            <button onClick={() => { showMenuBar() }} onDoubleClick={removeMenuBar} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className='w-full md:block md:w-auto'>

            <div className="  items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky" ref={bar}>

              <ul className="flex flex-col p-2 md:p-0 mt-4  bg-gray-50 md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#F8F9FA]">
                {userLogin !== null ? <>

                  <li className='block  hover:text-[#4FA74F]  text-base  bg-[#F8F9FA] p-2 md:p-0 '> <NavLink to={'/'} className={({ isActive }) =>
                    isActive ? "active" : "normal"} >Home</NavLink> </li>
                  <li className='block  hover:text-[#4FA74F]  text-base  bg-[#F8F9FA] p-2  md:p-0 ' > <NavLink to={'/cart'} className={({ isActive }) =>
                    isActive ? "active" : "normal"}>Cart</NavLink> </li>
                  <li className='block  hover:text-[#4FA74F]  text-base  bg-[#F8F9FA] p-2   md:p-0 ' > <NavLink to={'/wishlist'} className={({ isActive }) =>
                    isActive ? "active" : "normal"}>Wish list</NavLink> </li>
                  <li className='block  hover:text-[#4FA74F]  text-base  bg-[#F8F9FA] p-2   md:p-0 '> <NavLink to={'/products'} className={({ isActive }) =>
                    isActive ? "active" : "normal"}>Products</NavLink> </li>
                  <li className='block  hover:text-[#4FA74F]  text-base   bg-[#F8F9FA] p-2  md:p-0 '> <NavLink to={'/categories'} className={({ isActive }) =>
                    isActive ? "active" : "normal"}>Categories</NavLink> </li>
                  <li className='block  hover:text-[#4FA74F]  text-base   bg-[#F8F9FA] p-2   md:p-0 '> <NavLink to={'/brands'} className={({ isActive }) =>
                    isActive ? "active" : "normal"}>Brands</NavLink> </li></> : null}
                {userLogin == null ? <>
                  <NavLink to={'/register'} className="sm:hidden block cursor-pointer text-[#000000cc]  text-base m-2  bg-[#F8F9FA] p-2 normal active">Register</NavLink>
                  <NavLink to={'/login'} className="sm:hidden block cursor-pointer text-[#000000cc]  text-base m-2  bg-[#F8F9FA] p-2 normal active">Login</NavLink></>
                  : <div className=''>
                    <Link to={'/cart'} className='relative'>
                      <i className="sm:hidden fa-solid fa-cart-shopping block cursor-pointer text-[#000000cc]  text-base m-2  bg-[#F8F9FA] md:p-0 normal"></i>
                      <div className=" sm:hidden absolute inline-flex items-center justify-center py-[2px] px-[4px] text-xs font-bold text-white bg-[#4fa74f] border-2 border-white rounded-md  -top-2 start-5 dark:border-gray-900">{cart?.numOfCartItems}</div>

                    </Link>
                    <span onClick={logout} className=" sm:hidden  cursor-pointer text-[#000000cc]  text-base m-2  bg-[#F8F9FA] md:p-0 normal">log out</span></div>}
              </ul>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}
