import React, { useContext,  useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
export default function RecentProducts() {
  let { addToCart, myWishList, setCart, removeWishListItems, getWisListItems, IsInWishList, setWishItem } = useContext(cartContext)
  let btn = useRef(null)
  const [searchItem, setSearchItem] = useState('')
  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let { isError, isFetching, isLoading, error, data } = useQuery({ queryKey: ['recentProducts'], queryFn: getProducts, staleTime: 5000, refetchInterval: 3000 })
  if (isLoading) {
    return <div className='over-lay'> <i className='fas fa-spinner fa-spin text-white text-5xl absolute top-[50%] left-[50%] spin'></i></div>
  }
  if (isError) {
    return <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{error}</span>
    </div>
  }
  console.log(data);
  async function addProduct(id) {
    let response = await addToCart(id)
      .then((response) => {
        setCart(response.data)
        toast.success(' it has been Successfully Added!'), {
          position: 'top-right'
        }
      }
      )
      .catch((error) => toast.error('This is an error!')
      );
  }
  async function addWishList(id) {
    let response = await myWishList(id)
      .then((response) => {
        getmyWishListItems()
        toast.success(' it has been Successfully Added!')
        console.log(response);
      }
      )
      .catch((error) => toast.error('This is an error!')
      )
  }



  async function getmyWishListItems() {
    let response = await getWisListItems()
      .then((response) => {
        setWishItem(response.data.data)
      }
      )
      .catch((error) => {
      }

      );
  }
  async function removeWishList(id) {
    let response = await removeWishListItems(id)
      .then((response) => {
        getmyWishListItems()
      }
      )
      .catch((error) => {
console.log(error)
;
      }

      );

  }
  function isFavourate(id) {
    console.log("ok")
    if (IsInWishList(id)) {
      console.log("in wishist")
      removeWishList(id)
      getProducts()
    }
    else {
      console.log("not in wishlist")
      addWishList(id)

    }
  }

  return (
    <>
    
     
        <input type="search" id="search" onChange={(e) => setSearchItem(e.target.value)} name="search" className="mt-14 mb-5 bg-white border border-gray-300 focus:ring-[#4FA74F] focus:border-[#4FA74F] text-gray-900 text-sm rounded-md block w-3/4 p-2.5 my-12 mx-auto dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-gray-600 " placeholder='search....' />
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-4 gap-y-5 mx-auto max-w-2xl px-4 pb-8 sm:px-6  lg:max-w-7xl lg:px-8">
        {data?.data?.data.filter((product) => {
          if (searchItem == '') {
            return product
          }
          else if (product.title.toLowerCase().includes(searchItem.toLowerCase())) {
            return product
          }
          else if (product.category.name.toLowerCase().includes(searchItem.toLowerCase())) {
            return product
          }
          else if (product.category.name.toLowerCase().includes(searchItem.toLowerCase())) {
            return product
          }
        }).map((product) =>
          <div className='container mx-auto' key={product.id}>
            <div className="products rounded-md py-6 px-2 transition-all duration-500 card group ">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt={product.title} className='w-full rounded-md' />
                <p className='text-[#4FA74F] mt-0 mb-3 sm:ms-2 ms-5'>{product.category.name}</p>
                <h6 className='mt-0 mb-3 font-medium sm:ms-2 ms-5'>{product.title.split(' ').slice(0, 2).join(' ')}</h6>
                <div className="flex justify-between items-center sm:ms-2 ms-5">
                  <span className='text-[#212529]'>{product.price} EGP</span>
                  <span>
                    <i className='fas fa-star text-[#DAA520] font-black me-1'></i>
                    <span className='text-[#212529]'>{product.ratingsAverage}  </span>
                  </span>
                </div>
              </Link>
              <div className="flex justify-between items-center ">
                <button onClick={() => addProduct(product.id)} type="button" className=" group-hover:translate-y-0 group-hover:opacity-100 transition-all  translate-y-80 duration-500 opacity-0 mt-6 py-[6px] px-7  text-white bg-[#4FA74F] hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center inline-flex items-center ">
                  + Add
                </button>
                <span onClick={() => isFavourate(product.id)}>
                  {IsInWishList(product.id) ? <i className="fa-solid fa-heart text-[26.944px] text-red-500 mt-5  cursor-pointer" ref={btn} ></i> : <i className="fa-solid fa-heart text-[26.944px] font-black text-[#212529] mt-5  cursor-pointer" ref={btn} ></i>}


                </span>
              </div>
            </div>
          </div>

        )}

      </div>
    </>
  )
}


