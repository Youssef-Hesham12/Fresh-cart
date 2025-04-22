import React, { useContext } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { userContext } from '../../../Context/UserContext'
export default function Login() {
  let { setUserLogin } = useContext(userContext)
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let [apiError, setApiError] = useState("")
  let [btnDisable, setBtnDisable] = useState(false)

  function handleLogin(formValues) {
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === 'success') {
          localStorage.setItem('userToken', apiResponse.data.token)
          setUserLogin(apiResponse.data.token)
          setIsLoading(false)
          navigate('/')

        }
      })
      .catch((apiResponse) => {
        setIsLoading(false)
        setApiError(apiResponse?.response?.data?.message)
      })
    console.log(formValues);// feh el initial values kolha

  }
  let validate = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is Required'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password is invalid').required('Password is Required'),
  })
  console.log(validate);

  let Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validate,
    onSubmit: handleLogin

  })

  return (

    <>

      <div className="grid ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-center my-6">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Login Now
          </h2>
          <img className="h-8 ms-5 mt-5" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
        </div>
        <div className="max-w-2xl mx-auto self-center justify-self-center">
          <div className="  bg-white shadow-md   border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 ">
            <form className="space-y-6 " onSubmit={Formik.handleSubmit}>
              {apiError ? <div className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {apiError}
              </div> : null}
              <div >
                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Email</label>
                <input type="email" id="email" autoComplete='email' onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="email" value={Formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#4FA74F] focus:border-[#4FA74F] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
              </div>
              {Formik.errors.email && Formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {Formik.errors.email}
              </div> : null}
              <div >
                <label htmlFor="password" className="block text-sm font-medium leading-5  text-gray-700">Password</label>
                <input type="password" autoComplete='current-password' id="password" onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="password" value={Formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#4FA74F] focus:border-[#4FA74F] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder='••••••••' />
              </div>
              {Formik.errors.password && Formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {Formik.errors.password}

              </div> : null}
              <p > <Link to={'/forgetpassword'} className='text-sm flex justify-center text-[#4FA74F] hover:underline ml-auto dark:text-[#4FA74F]'>forget your password? </Link></p>

              <div className="flex align-middle items-center justify-center flex-wrap flex-col">
                <button type="submit" disabled={!Formik.isValid || !Formik.dirty} className="disabled:bg-transparent disabled:text-gray-400 disabled:border disabled:border-gray-500 w-full text-white bg-[#4FA74F] hover:bg-[#4FA74F] focus:ring-4 focus:ring-[#4FA74F] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#4FA74F] dark:hover:bg-[#4FA74F] dark:focus:ring-[#4FA74F]">
                  Login now
                </button>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-300 mt-4'>Don't have an account? <Link to={'/register'} className='text-[#4FA74F] hover:underline dark:text-[#4FA74F]'>Register now</Link></p>
              </div>
            </form>
            {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}
          </div>
        </div>
      </div>



    </>
  )
}
