import React, { useContext, useEffect } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { cartContext } from '../../Context/CartContext'

export default function Home() {
let { getWisListItems,setWishItem,wishItem} = useContext(cartContext)
  
  async function getmyWishListItems() {
    let response = await getWisListItems()
      .then((response) => {
        setWishItem(response.data.data)
        console.log(response.data.data)
        console.log(wishItem)
      }
      )
      .catch((error) => {
        console.log(error);
        
      }

      );
  }

  useEffect(function(){
    getmyWishListItems()
  },[])
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />

    </>
  )
}
