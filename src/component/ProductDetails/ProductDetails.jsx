import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import Slider from "react-slick";
import { cartContext } from '../../Context/CartContext';
export default function ProductDetails() {
  let [isLoading, setIsLoading] = useState(false)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let { addToCart, myWishList } = useContext(cartContext)
  const [productsDetailes, setProductsDetailes] = useState(null);
  let { id, category } = useParams()
  function getProductsDetails(path) {
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${path}`)
      .then(({ data }) => {
        setIsLoading(false)
        setProductsDetailes(data.data)
      }
      )
      .catch(() => {
        setIsLoading(false)
        console.log('error');
      })
  }

  async function addProduct(id) {
    let response = await addToCart(id)
      .then((response) =>
        toast.success('Successfully Added To Cart!')
      )
      .catch((error) => toast.error('This is an error!')
      );
  }
  async function addWishList(id) {
    let response = await myWishList(id)
      .then((response) =>
        // console.log(response)
        toast.success(' it has been Successfully Added!')

      )
      .catch((error) => toast.error('This is an error!')
      );

  }
  useEffect(() => {
    getProductsDetails(id)

  },
    [id])
  return (
    <>

      <div className="mx-auto container  max-w-2xl  sm:px-6 sm:pt-12 lg:max-w-7xl lg:px-8">
        <div className="row items-center">

          <div className=" w-full md:w-1/4">
            <Slider {...settings}>
              {productsDetailes?.images.map((img) => <img src={img} alt={productsDetailes?.title} className='w-full block' key={productsDetailes.id} />)}
            </Slider>

          </div>
          <div className="md:w-3/4 w-full p-6">
            <h2 className='font-medium text-[#212529] text-[30.416px] my-3 text-start'>{productsDetailes?.title}</h2>
            <p className='text-[#212529] mb-4 font-normal'>{productsDetailes?.description}</p>
            <div className="flex justify-between items-center">
              <span className='text-[#212529]'>{productsDetailes?.price}EGP</span>
              <span>
                <i className='fas fa-star text-[#DAA520] font-black'></i>
                <span className='text-[#212529]'>{productsDetailes?.ratingsAverage}  </span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => addProduct(productsDetailes?.id)} type="button" className="  mt-6 py-[6px] px-7  text-white bg-[#4FA74F] hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center inline-flex items-center ">
                + Add
              </button>
              <i className="fa-solid fa-heart text-[26.944px] font-black text-[#212529] mt-5 focus:text-[red] cursor-pointer " onClick={() => addWishList(productsDetailes?.id)}></i>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}

    </>
  )
}

