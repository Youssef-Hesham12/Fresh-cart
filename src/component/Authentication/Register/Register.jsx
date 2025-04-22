import React, { useContext } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { userContext } from '../../../Context/UserContext'
export default function Register() {
  let { setUserLogin } = useContext(userContext)
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let [apiError, setApiError] = useState("")

  function handleRegister(formValues) {
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
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
    name: Yup.string().min(3, 'Please enter at least 3 characters.').max(20, 'Name must be no longer than 20 characters.').required('Name is Required'),
    email: Yup.string().email('Email is invalid').required('Email is Required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Must be egyptian phone number.').required('Phone number is Required'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password is invalid').required('Password is Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'It is not match').required('re-Passwprd is Required'),
  })

  let Formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validationSchema: validate,
    onSubmit: handleRegister

  })
  return (

    <>
      <div className="min-h-screen  flex flex-col justify-center pb-20 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-center">
          <h2 className=" text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <img className="h-8 ms-5 " src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={Formik.handleSubmit} action="#">
              {apiError ? <div className="p-4 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

                {apiError}
              </div> : null}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input id="name"  type="text" onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="name" value={Formik.values.name}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-[#4FA74F] focus:ring-[#4FA74F] focus:border-[#4FA74F]  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd">
                      </path>
                    </svg>
                  </div>
                </div>
              </div>
              {Formik.errors.name && Formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {Formik.errors.name}

              </div> : null}

              <div className="mt-6">
                <label htmlFor="tel" className="block text-sm font-medium leading-5 text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input id="tel" type="tel"
                    onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="phone" value={Formik.values.phone}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-[#4FA74F] focus:ring-[#4FA74F] focus:border-[#4FA74F]  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              {Formik.errors.phone && Formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {Formik.errors.phone}

              </div> : null}
              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input id="email" autoComplete='off' onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="email" value={Formik.values.email} placeholder="user@example.com" type="email"

                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-[#4FA74F] focus:ring-[#4FA74F] focus:border-[#4FA74F]  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input id="password" type="password" autoComplete='off' onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="password" value={Formik.values.password}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-[#4FA74F] focus:ring-[#4FA74F] focus:border-[#4FA74F]  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
              {Formik.errors.password && Formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {Formik.errors.password}

              </div> : null}
              <div className="mt-6">
                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input id="password_confirmation" onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="rePassword" value={Formik.values.rePassword} type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-[#4FA74F] focus:ring-[#4FA74F] focus:border-[#4FA74F]  transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
              {Formik.errors.rePassword && Formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {Formik.errors.rePassword}

              </div> : null}
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button type="submit" disabled={!Formik.isValid || !Formik.dirty}
                    className="disabled:bg-transparent disabled:text-gray-400 disabled:border disabled:border-gray-500  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4FA74F] hover:bg-[#4FA74F] focus:outline-none transition duration-150 ease-in-out">
                    Create account
                  </button>
                </span>
                <p className='mt-5 text-center '>Already have an account? <Link to={'/login'} className='text-[#4FA74F] font-semibold hover:underline'> Login</Link></p>
              </div>
              {isLoading ? <div className='over-lay grid'> <i className='fas fa-spinner fa-spin text-white text-5xl justify-self-center self-center '></i></div> : null}
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
