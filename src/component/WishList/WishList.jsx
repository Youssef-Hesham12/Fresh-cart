import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
export default function WishList() {
  let { getWisListItems, addToCart, removeWishListItems,wishItem,setWishItem } = useContext(cartContext)
  let [isLoading, setIsLoading] = useState(false)

  async function getmyWishListItems() {
    setIsLoading(true)
    let response = await getWisListItems()
      .then((response) => {
        setIsLoading(false)
        setWishItem(response.data.data)
      }
      )
      .catch((error) => {
        setIsLoading(false)
      }

      );
  }
  async function addProduct(id) {
    setIsLoading(true)
    let response = await addToCart(id)
      .then((response) => {
        toast.success('Successfully Added To Cart!')
        setIsLoading(false)
      }
      )
      .catch((error) => {
        toast.error('This is an error!')
        setIsLoading(false)
      }

      );
  }
  async function removeWishList(id) {
    setIsLoading(true)
    let response = await removeWishListItems(id)
      .then((response) => {
        getmyWishListItems()
        // setWishList(response.data)
        setIsLoading(false)
      }
      )
      .catch((error) => {
        setIsLoading(false)
      }

      );

  }

  useEffect(() => {
    getmyWishListItems()

  }, [])
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-8 sm:px-6  lg:max-w-7xl lg:px-8">

        <div className="container my-12 p-12 rounded-md bg-[#F8F9FA]">
          <div className="flex justify-between mb-6">
            <h2 className='text-[30.416px] mb-2 font-medium text-[#212529]'>My wish list</h2>

          </div>
          {wishItem?.map((list) =>
            <div className="row border-b border-solid border-[#dee2e6] my-4 p-2" key={list._id}>

              <div className='md:w-1/6 w-full'>
                <img src={list.imageCover} alt={list.title} className='w-full px-3' />
              </div>


              <div className='md:w-5/6 w-full '>
                <div className='flex justify-between'>
                  <div>

                    <h5 className='text-xl text-[#212529] mb-2 font-medium'>{list.title}</h5>
                    <h6 className='text-[#4FA74F] font-medium mb-2' >{list.price} EGP</h6>
                    <button className='text-[#DC3545]' onClick={() => removeWishList(list.id)}>
                      <i className="fa-solid fa-trash mr-1" ></i>

                      Remove
                    </button>
                  </div>
                  <button onClick={() => addProduct(list.id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-[20px] font-normal text-[#212529]rounded-lg ">
                    <span className="relative px-5 py-2.5 bg-transparent  rounded-md border border-[#4FA74F]  focus:ring-[#4FA74F] focus:border-[#4FA74F]">
                      Add To Cart
                    </span>
                  </button>

                </div>

              </div>


            </div>
          )}
        </div>
      </div>
      {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}

    </>
  )
}
