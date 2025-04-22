import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
export let cartContext = createContext()
export default function CartContextProvider(props) {
    let headers = { token: localStorage.getItem('userToken') }
    let [cart, setCart] = useState(null)
    let [wishItem, setWishItem] = useState([])
    function addToCart(id) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: id
        }, { headers: headers })
    }
    function getCartItems() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: headers })
    }
    function removeItems(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: headers })
    }
    function updateCart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count }, { headers: headers })
    }
    function myWishList(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: id }, { headers: headers })
    }
    function getWisListItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: headers }
        )
    }
    function removeWishListItems(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: headers })
    }
    function IsInWishList(id) {
        return wishItem?.some((item) => item.id == id)
    }

    function removeCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
    }
    function checkOut(id, url, formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`, { shippingAddress: formValues }, { headers: headers })
    }
    async function getCart() {
        let response = await getCartItems()
        setCart(response.data)
    }

    useEffect(() => { getCart() }, [])
    return <cartContext.Provider value={{ addToCart, getCartItems,wishItem,setWishItem, removeItems, updateCart, myWishList, getWisListItems, removeWishListItems,IsInWishList, removeCart, checkOut, cart, setCart }}>
        {props.children}
    </cartContext.Provider>

}