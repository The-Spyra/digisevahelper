import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Posts() {
  const token = false;
  const navigate = useNavigate()
  return (
    <div className="bg-[#DDE2E1] min-h-screen flex flex-col">
      <Navbar />
      <h1 className="font-extrabold text-[64px] text-center mt-20">POSTS</h1>
      <label className="relative self-center flex gap-4 items-center justify-between w-[70%] px-3 py-2 bg-[#05846A8C] rounded-[100px] h-[50px]">
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
          placeholder="Search For Posts"
          className="w-full placeholder:text-[#00000054] placeholder:text-center font-semibold border-none outline-none px-2 bg-transparent"
        />
      </label>
      {token ? (
        <>
          <div className="w-[70%] self-center h-[150px] mt-10 flex gap-5">
            <div className="w-[60%] flex flex-col justify-center items-center gap-5 h-full bg-gradient-to-br from-[#096C59] to-[#12D2AC] shadow-lg rounded-3xl">
              <div className="flex gap-10 ">
                <div className="flex flex-col gap-2 justify-start">
                  <label className="font-semibold">Shop Name</label>
                  <input type="text" className="rounded-md" />
                </div>
                <div className="flex flex-col gap-2 justify-start">
                  <label className="font-semibold">Contact Number</label>
                  <input type="text" className="rounded-md" />
                </div>
              </div>
              <button className="px-8 py-3 bg-[#11534F] rounded-3xl text-white font-semibold">
                SUBMIT
              </button>
            </div>
            <div className="w-[40%] h-full flex flex-col justify-center items-center gap-5 bg-gradient-to-br from-[#096C59] to-[#12D2AC] shadow-lg rounded-3xl">
              <div className="flex gap-10 ">
                <div className="flex flex-col gap-2 justify-start">
                  <label className="font-semibold">Upload Banner</label>
                  <input type="file" className="rounded-md hidden" id="file" />
                  <label
                    className="w-[200px] h-[30px] px-2 rounded-md bg-white"
                    htmlFor="file"
                  >
                    Upload Images
                  </label>
                </div>
                <div className="flex  gap-2 justify-center items-end">
                  <a
                    type="text"
                    className="w-[100px] px-2 h-[30px] rounded-md bg-white"
                  >
                    Preview
                  </a>
                </div>
              </div>
              <button className="px-8 py-3 bg-[#11534F] rounded-3xl text-white font-semibold">
                SUBMIT
              </button>
            </div>
          </div>
          <div className="px-8 flex flex-col">
            <div className="w-full rounded-[100px] mt-10 flex justify-between px-5 bg-[#1A8F78] h-[50px]">
              <h1 className="text-[30px] font-semibold text-black">
                POSTER NAME
              </h1>
              <h1 className="text-[30px] font-semibold text-black">
                DOWNLOAD LINK
              </h1>
            </div>
            {[1, 2, 3, 4, 5, 6, 7].map((x) => (
              <div className="w-full rounded-[100px] mt-3 py-1 flex justify-between px-5 border border-black h-[50px]">
                <h1 className="text-[30px] font-semibold text-black">
                  POSTER NAME
                </h1>
                <button className="px-10 flex justify-center items-center bg-[#207C6A] text-white font-semibold rounded-[100px]">
                  DOWNLOAD
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p className="text-center mt-10 text-[28px]">
            This page is available for members only.haven't register?{" "}
            <a href="" className="text-[#2AA88F]">
              Click here
            </a>
          </p>
          <div className="flex justify-center items-center py-3">
            <button onClick={()=>navigate(-1)} className="text-white px-9 py-1 text-[28px] bg-[#67AEA0] rounded-3xl">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
