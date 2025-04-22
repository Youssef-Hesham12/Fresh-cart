import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
export default function Cart() {
  let [cartItmes, setCartItems] = useState(null)
  let { getCartItems, removeItems, updateCart, removeCart, setCart } = useContext(cartContext)
  let [isLoading, setIsLoading] = useState(false)
  let [totalPrice, setTotalPrice] = useState(0)
  let [totalCount, setTotalCount] = useState(0)
  async function getItems() {
    setIsLoading(true)
    let response = await getCartItems()
      .then((response) => {
        setIsLoading(false)
        setCartItems(response.data)
        setTotalPrice(totalPrice + response.data.data.totalCartPrice)
        setTotalCount(totalCount + response.data.numOfCartItems)
        console.log(response.data.cartId);
      }
      )
      .catch((error) => {
        setIsLoading(false)
      })
  }
  async function removeCartItems(id) {
    setIsLoading(true)
    let response = await removeItems(id)
      .then((response) => {
        setIsLoading(false)
        setCartItems(response.data)
        setTotalPrice(response.data.data.totalCartPrice)
        setTotalCount(response.data.numOfCartItems)
        setCart(response.data)
      }
      )
      .catch((error) => {
        setIsLoading(false)
      })
  }
  async function updateCartItems(id, count) {
    setIsLoading(true)
    let response = await updateCart(id, count)
      .then((response) => {
        setIsLoading(false)
        setCartItems(response.data)
        setTotalPrice( response.data.data.totalCartPrice)
        setCart(response.data)
      }
      )
      .catch((error) => {
        setIsLoading(false)
      })
  }
  async function clearCart() {
    setIsLoading(true)
    let response = await removeCart()
      .then((response) => {
        setIsLoading(false)
        setCartItems(response.data)
        setTotalPrice(0)
        setTotalCount(0)
        setCart(response.data)
      }
      )
      .catch((error) => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getItems()
  }, [])
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-8 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="container my-12 p-12 rounded-md ">
          <div className="flex justify-between ">
            <h2 className='text-[30.416px] mb-2 font-medium text-[#212529]'>Cart Shop</h2>
            <Link to={'/checkout'}>
              <button type="button" className="text-white bg-[#4FA74F] hover:bg-[#4FA74F] focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-4 py-2  dark:bg-[#4FA74F] dark:hover:bg-[#4FA74F] focus:outline-none dark:focus:ring-[#4FA74F]">Check out</button>
            </Link>
          </div>
          <div className="flex justify-between mb-6">
            <h5 className='text-[20px] mb-2 font-medium text-[#212529]'>total price: <span className='text-[20px] mb-2 font-medium text-[#4FA74F]'>{totalPrice} EGP</span></h5>
            <h5 className='text-[20px] mb-2 font-medium text-[#212529]'>total number of items: <span className='text-[20px] mb-2 font-medium text-[#4FA74F]'>{totalCount}</span></h5>
          </div>
          {cartItmes?.data?.products?.map((product) =>
            <div key={product.product._id}>

              <div className="row border-b border-solid border-[#dee2e6] my-4 p-2" >

                <div className='md:w-1/6 w-full'>
                  <img src={product.product.imageCover} className='w-full px-3' />
                </div>


                <div className='md:w-5/6 w-full '>
                  <div className='flex justify-between'>
                    <div>

                      <h5 className='text-xl text-[#212529] mb-2 font-medium'> {product.product.title}</h5>
                      <h6 className='text-[#4FA74F] font-medium mb-2' >{product.price} EGP</h6>
                      <button className='text-[#DC3545]' onClick={() => removeCartItems(product.product._id)}>
                        <i className="fa-solid fa-trash mr-1" ></i>
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => updateCartItems(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white   border  border-[#4FA74F] rounded-md focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>

                      <div>
                        <input type="number" id="first_product" className="w-14 text-center border-0 bg-[#F8F9FA]" placeholder={product.count} required />
                      </div>
                      <button onClick={() => updateCartItems(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white  border  border-[#4FA74F] rounded-md focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button onClick={() => clearCart()} className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-[20px] font-normal text-[#212529] rounded-lg ">
            <span className="relative px-5 py-2.5 bg-transparent  rounded-md border  border-[#4FA74F]">
              Clear Your Cart
            </span>
          </button>
        </div>
      </div>
      {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}

    </>
  )
}
