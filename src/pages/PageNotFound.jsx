import React from 'react'

const PageNotFound = () => {
  return (
    <div className='flex justify-center items-center bg-background-primary h-screen w-full'>
        <div className='text-primary text-sm font-semibold mb-64'>Page Not Found &nbsp;</div>
        <a href='https://teamformation.netlify.app/'  className='text-white text-lg hover:border-b border-white font-semibold mb-64 cursor-pointer'> Goto Home Page</a>
    </div>
  )
}
export default PageNotFound