import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { userContext } from '../../Context/UserContext'
export default function AllOrders() {
  let [allorders, setAllOrders] = useState(null)
  let [userId, setUserId] = useState('')
  let headers = { token: localStorage.getItem('userToken') }
  function verifyUserToken() {
    axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', { headers: headers })
      .then((response) => {
        setUserId(response.data.decoded.id)
        console.log(response.data.decoded.id);
        usersOrders(response.data.decoded.id)
      })
  }
  function usersOrders(id) {
    let response = axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((response) => {
        setAllOrders(response.data)
        console.log(allorders);

      })
  }
  useEffect(() => { verifyUserToken() }, [])
  return (
    <>
    </>
  )
}
