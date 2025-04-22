import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { cartContext } from '../../Context/CartContext'
export default function CheckOut() {
  let [isLoading, setIsLoading] = useState(false)
  let [item, setItem] = useState('')
  let { checkOut, getCartItems } = useContext(cartContext)
  let validate = Yup.object().shape({
    details: Yup.string().required('detailes is Required').min(3, 'details min length is 3.'),
    phone: Yup.string().required('phone is Required').matches(/^01[0125][0-9]{8}$/, 'invalid phone'),
    city: Yup.string().required('city is Required'),
  })
  let Formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: validate,
    onSubmit: () => handleCheckOut(item, 'http://localhost:5173')

  })
  async function handleCheckOut(id, url) {
    setIsLoading(true)
    let { data } = await checkOut(id, url, Formik.values)
    if (data.status === 'success') {
      window.location.href = data.session.url
    }
  }
  async function orders() {
    let response = await getCartItems()
      .then((response) => {
        setItem(response.data.cartId)
      }
      )
      .catch((error) => {
        setIsLoading(false)
      })
  }
  useEffect(() => { orders() }, [])

  return (

    <>
      <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Billing Details</h1>
            </div>

            <div className="mt-5">
              <form onSubmit={Formik.handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="text" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Details</label>
                    <div className="relative">
                      <input type="text" id="text" autoComplete='off' onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="details" value={Formik.values.details} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#4FA74F] focus:ring-[#4FA74F] shadow-sm" required aria-describedby="email-error" />
                    </div>
                  </div>
                  {Formik.errors.details && Formik.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {Formik.errors.details}
                  </div> : null}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Phone Number</label>
                    <div className="relative">
                      <input type="tel" id="phone" onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="phone" value={Formik.values.phone} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#4FA74F] focus:ring-[#4FA74F] shadow-sm" required aria-describedby="email-error" />
                    </div>
                  </div>
                  {Formik.errors.phone && Formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {Formik.errors.phone}

                  </div> : null}
                  <div>
                    <label htmlFor="city" className="block text-sm font-bold ml-1 mb-2 dark:text-white">City</label>
                    <div className="relative">
                      <input type="text" id="city" onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="city" value={Formik.values.city} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#4FA74F] focus:ring-[#4FA74F] shadow-sm" required aria-describedby="email-error" />
                    </div>
                  </div>
                  {Formik.errors.city && Formik.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {Formik.errors.city}

                  </div> : null}
                  <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#4FA74F] text-white hover:bg-[#4FA74F] focus:outline-none focus:ring-2 focus:ring-[#4FA74F] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Pay Now</button>
                </div>
              </form>
              {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}

            </div>
          </div>
        </div>

      </main>


    </>
  )
}
