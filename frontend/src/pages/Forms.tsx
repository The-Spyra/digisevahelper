import React from 'react'
import Navbar from '../components/Navbar'

function Forms() {
  return (
    <div className="bg-[#DDE2E1] min-h-screen flex flex-col">
    <Navbar />
      <h1 className="font-extrabold md:text-[64px] text-[26px] text-center mt-20">
        Forms
      </h1>
      <label className="relative self-center flex gap-4 items-center justify-between md:w-[70%] w-[90%] px-3 py-2 bg-[#05846A8C] rounded-[100px] h-[30px] md:h-[50px] ">
        <svg
          width="25"
          height="25"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.88889 13.6111C3.88889 8.24169 8.24169 3.88889 13.6111 3.88889C18.9805 3.88889 23.3334 8.24169 23.3334 13.6111C23.3334 18.9805 18.9805 23.3334 13.6111 23.3334C8.24169 23.3334 3.88889 18.9805 3.88889 13.6111ZM13.6111 0C6.09392 0 0 6.09392 0 13.6111C0 21.1284 6.09392 27.2223 13.6111 27.2223C16.6684 27.2223 19.4904 26.2143 21.7626 24.5125L31.6807 34.4305C32.44 35.1898 33.6712 35.1898 34.4305 34.4305C35.1898 33.6712 35.1898 32.44 34.4305 31.6807L24.5125 21.7626C26.2143 19.4904 27.2223 16.6684 27.2223 13.6111C27.2223 6.09392 21.1284 0 13.6111 0Z"
            fill="#212121"
          />
        </svg>
        <input
          type="text"
          placeholder="Search For Forms"
          className="w-full placeholder:text-[#00000054] placeholder:text-center font-semibold border-none outline-none px-2 bg-transparent"
        />
      </label>
      <div className="px-[6px] md:px-8 flex flex-col">
        <div className='w-full rounded-[100px] mt-10 flex justify-between px-5 bg-[#1A8F78] h-[30px] md:h-[50px] items-center'>
            <h1 className='text-[13px] md:text-[30px] font-semibold text-black'>FORM NAME</h1>
            <h1 className='text-[13px] md:text-[30px] font-semibold text-black'>DOWNLOAD LINK</h1>
        </div>
        {[1,2,3,4,5,6,7].map((x)=>(
            <div className='w-full rounded-[100px] mt-2 md:mt-3 flex justify-between px-5 py-2 border border-black h-[40px] md:h-[50px] items-center'>
            <h1 className='text-[13px] md:text-[30px] font-semibold text-black'>Test</h1>
            <button className='px-3 md:px-10 py-1 bg-[#207C6A] text-white text-[13px] font-semibold rounded-[100px]'>DOWNLOAD</button>
        </div>
        ))}
    </div>
  </div>
  )
}

export default Forms