import React from 'react'
import Slider from "react-slick";
import bags from '../../assets/img1.jpg'
import music from '../../assets/img2.jpg'
import slider1 from '../../assets/banner1.jpg'
import slider2 from '../../assets/banner2.jpg'
import slider3 from '../../assets/banner3.jpg'
export default function MainSlider() {
  var settings = {
    arrows:false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <>
    <div className="container  md:justify-center md:flex  ">
      <div className="w-full md:w-1/2 mb-4 ">
      <Slider {...settings}>
      <img src={slider1} alt="slider" className='w-full max-h-[360px]'/>
      <img src={slider2} alt="slider" className='w-full max-h-[360px]'/>
      <img src={slider3} alt="slider" className='w-full max-h-[360px]'/>
      </Slider>
      </div>
      <div className="w-full md:w-1/4 mb-4 ">
      <img src={bags} alt="cart image" className='w-full max-h-[180px]'/>
      <img src={music} alt="cart image"className='w-full max-h-[180px] ' />
      </div>
    </div>
    </>
  )
}
