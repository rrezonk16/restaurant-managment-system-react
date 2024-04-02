import React from 'react'
import Error404 from './Error404'
import Navbar from '../Navigation/Navbar'

const Error = () => {
  return (
    <div className="bg-blue-900 h-screen flex justify-between flex-col text-white">
        <Navbar/>
        <Error404/>
        <div>
          
        </div>
    </div>
  )
}

export default Error