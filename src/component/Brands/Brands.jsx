import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
export default function Brands() {
  let [isLoading, setIsLoading] = useState(false)
  const [brands, setBrands] = useState(null);
  const [specificBrand, setSpecificBrands] = useState(null);
  let modal = useRef(null)
  function showBrands() {
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setIsLoading(false)
        setBrands(data.data)
      }
      )
      .catch(() => {
        setIsLoading(false)
        console.log('error');
      })
  }
  function showSpecificBrands(id) {
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(({ data }) => {
        setIsLoading(false)
        setSpecificBrands(data.data)
        console.log(data.data);
      }
      )
      .catch(() => {
        setIsLoading(false)
        console.log('error');
      })
  }
  function showModal() {
    modal.current.classList.remove('hidden')
  }
  function hideModal() {
    modal.current.classList.add('hidden')
  }
  useEffect(() => { showBrands() }, [])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-4 gap-y-5 ">
        {brands?.map((brand) =>
          <div className="container mx-auto" key={brand._id}>
            <div className=" bg-white text-center ">
              <div className=" card border border-gray-300 rounded-lg   hover:border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-500">
                <img src={brand.image} alt={brand.name} className=' w-full' />
                <button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button" onClick={showModal}>

                  <p className=' mb-4 p-2 cursor-pointer' onClick={() => showSpecificBrands(brand._id)} >{brand.name}</p>
                </button>

              </div>
            </div>
          </div>


        )}
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className=" bg-[#00000080] hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full " ref={modal}>
          <div className="relative p-4 w-full max-w-2xl max-h-full mx-auto flex items-center justify-center">

            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                <span className="text-xl font-semibold text-gray-900 dark:text-white"> </span>
                <button onClick={hideModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
          
                <div className="flex justify-center items-center py-8 px-16">
                    <img src={specificBrand?.image} alt={specificBrand?.name} className=' w-full ' />
                </div>
            

              <div className="flex items-end justify-end p-4 md:p-5 border-t border-gray-200 rounded-b 0">
                <button data-modal-hide="default-modal" type="button" className="py-[6px] px-3 m-1 text-lg  text-white focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-[#5C636A]   " onClick={hideModal}>close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}


    </>
  )
}

