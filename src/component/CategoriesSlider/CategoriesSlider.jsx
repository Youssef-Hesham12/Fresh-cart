import React, { useEffect } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import { useState } from 'react'
export default function CategoriesSlider() {
  const [categories, setcategories] = useState(null);
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setcategories(data.data)
      }
      )
      .catch(() => {
        console.log('error');
      })
  }
  useEffect(() => getCategories(), [])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  return (
    <>
      <Slider {...settings} className='mx-auto container  max-w-2xl  sm:px-6 sm:pt-12 lg:max-w-7xl lg:px-8'>
        {categories?.map((category) =>
          <div className=' min-h-[0.5px] mt-5 ' key={category._id}>
            <img src={category?.image} alt={category?.name} className=' w-full h-[250px]' />
            <h3 className='text-[26.944px] font-medium text-[#212529] text-center'>{category.name}</h3>
          </div>

        )}
      </Slider>
    </>
  )
}
