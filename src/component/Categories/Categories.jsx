import React, {  useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
export default function Categories() {
  const [categories, setcategories] = useState(null);
  const [subCategories, setSubcategories] = useState(null);
  let [title, setTitle] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  function showCategories() {
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setIsLoading(false)

        setcategories(data.data)
      }
      )
      .catch(() => {
        setIsLoading(false)

        console.log('error');
      })
  }
  function showSubCategories(id) {
    setIsLoading(true)

    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      .then(({ data }) => {
        setIsLoading(false)

        setSubcategories(data.data)
        console.log(data.data);

      }
      )
      .catch(() => {
        setIsLoading(false)

        console.log('error');
      })
  }
  useEffect(() => { showCategories() }, [])
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4 mx-auto max-w-2xl px-4 pb-8 sm:px-6  lg:max-w-7xl lg:px-8 ">
        {categories?.map((category) =>
          <div className="container" key={category._id}>
            <div className=" bg-white text-center ">
              <div className=" card border border-gray-300 rounded-lg   hover:border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-500">
                <img src={category.image} alt={category.name} className='h-[300px] w-full' />
                <p className='text-[26.944px] text-[#198754] font-medium mb-2 p-4 cursor-pointer' onClick={(e) => { showSubCategories(category._id), setTitle(e.nativeEvent.target.innerText) }
                }>{category.name}</p>

              </div>
            </div>
          </div>

        )}
      </div>
      <h2 className='text-[30.416px] text-[#4FA74F] font-medium text-center my-6'>{title  ? `${title} subcategories`:null} </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4'>
        {subCategories?.map((category) =>

          <div key={category._id} className='mx-auto max-w-2xl px-4 pb-8 sm:px-6  lg:max-w-7xl lg:px-8 container'>

            <div className="card border rounded-md p-4 mb-2 transition-all duration-500 text-[#212529] border-gray-200 text-center ">
              <p className='text-[26.944px]  font-medium'> {category.name}</p>
            </div>
          </div>
        )}
      </div>
      {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}

    </>
  )
}
