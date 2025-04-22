import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
export default function ForgetPassword() {
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  function forgetPassword(email) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, email)
      .then(() => {
        setIsLoading(false)
        navigate('/verifyCode')
      }
      )
      .catch(() => {
        setIsLoading(false)
      })
  }
  let Formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: forgetPassword

  })

  return (
    <>
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <a className="text-[#4FA74F] decoration-2 hover:underline font-medium" >
            <Link to={'/login'} >    Login here </Link>
            </a>
          </p>
        </div>

        <div className="mt-5">
          <form  onSubmit={Formik.handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div className="relative">
                  <input type="email" id="email"name='email' autoComplete='email' value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur}  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#4FA74F] focus:ring-[#4FA74F] shadow-sm" required aria-describedby="email-error"/>
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#4FA74F] text-white hover:bg-[#4FA74F] focus:outline-none focus:ring-2 focus:ring-[#4FA74F] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Send Code</button>
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
