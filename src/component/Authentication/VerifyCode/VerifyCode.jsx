import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
export default function VerifyCode() {
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  function verifyCode(resetCode) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, resetCode)
      .then(() => {
        setIsLoading(false)
        navigate('/updatePassword')

      }
      )
      .catch(() => {
        setIsLoading(false)
      })

  }
  let Formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: verifyCode
  })
  return (
    <>
      <div className=" mx-auto border max-w-sm mt-20 rounded">
        <form className="shadow-md px-4 py-6" onSubmit={Formik.handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            <div>
              <label htmlFor="num" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Enter Code</label>
              <div className="relative">
                <input type="text" id="num" autoComplete='off' name='resetCode' value={Formik.values.resetCode} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#4FA74F] focus:ring-[#4FA74F] shadow-sm" required aria-describedby="email-error" />
              </div>
              <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-[#4FA74F] hover:bg-[#4FA74F] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Verify
            </button>

          </div>
        </form>
        {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}

      </div>


    </>
  )
}
