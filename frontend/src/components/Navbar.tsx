import { useEffect } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  useEffect(() => {
    const elem = document.getElementById("mobile-nav")
    if (elem) {
      elem.style.transform = "translateX(-100%)"
    }
  })
  return (
    <div className="w-full bg-[#00AA88] px-3 py-2 rounded-b-md shadow-[1px_1px_35px_1px] shadow-slate-500 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const elem = document.getElementById("mobile-nav")
            if (elem) {
              elem.style.transform = "translateX(0%)"
            }
          }}
          className="md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16669 5.83337H15.8334"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4.16669 10H15.8334"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4.16669 14.1666H15.8334"
              stroke="#33363F"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div
          id="mobile-nav"
          className="fixed transition-all flex flex-col justify-between duration-200 translate-x-[-100%] bg-gradient-to-b from-[#2AA88F] to-[#104238] px-3 py-3 left-0 top-0 h-screen w-[70%] z-[999]"
        >
          <div>
            <h1
              onClick={() => {
                const elem = document.getElementById("mobile-nav")
                if (elem) {
                  elem.style.transform = "translateX(-100%)"
                }
              }}
              className="font-bold md:text-[26px] bg-[#104238] text-white px-5 py-2 rounded-3xl flex items-center gap-7"
            >
              <span>
                <svg
                  width="11"
                  height="18"
                  viewBox="0 0 11 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.7566L3.07454 8.99998L11 2.24333L9.46327 0.933319L0 8.99998L9.46327 17.0667L11 15.7566Z"
                    fill="white"
                  />
                </svg>
              </span>{" "}
              DIGISEVAHELPER
            </h1>
            <div className="text-[14px] mt-5 text-white flex flex-col items-start gap-5 font-semibold ">
              <Link
                to={"/doc"}
                className="uppercase  transition-all duration-150"
                id="doc"
              >
                Documents Required
              </Link>
              <Link to={"/charges"} className="uppercase ">
                SERVICE CHARGE
              </Link>
              <Link to={"/forms"} className="uppercase ">
                FORMS
              </Link>
              <Link to={"/editing-tools"} className="uppercase ">
                EDITING TOOLS
              </Link>
              <Link to={"/posts"} className="uppercase ">
                POSTERS
              </Link>
            </div>
          </div>
          <div>
            <p className="text-center text-white">
              Mavin Thai CSC Center <br />
              Ekarool - Calicut <br />
              80755565598
            </p>
            <p className="flex items-center justify-center text-white gap-1 text-center">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="17" height="17" rx="8.5" fill="#D9D9D9" />
                <path
                  d="M12.7344 6.10938L12.75 6.14062L11.4531 6.92969L11.4375 6.88281C11.1667 6.35156 10.7865 5.9349 10.2969 5.63281C9.80729 5.32552 9.26562 5.17188 8.67188 5.17188C8.24479 5.17188 7.84375 5.2526 7.46875 5.41406C7.09896 5.57552 6.77604 5.79688 6.5 6.07812C6.21875 6.35938 5.9974 6.6901 5.83594 7.07031C5.67448 7.44531 5.59375 7.84635 5.59375 8.27344C5.59375 8.69531 5.67448 9.09375 5.83594 9.46875C5.9974 9.84375 6.21875 10.1719 6.5 10.4531C6.77604 10.7344 7.09896 10.9557 7.46875 11.1172C7.84375 11.2786 8.24479 11.3594 8.67188 11.3594C9.21354 11.3594 9.72656 11.2188 10.2109 10.9375C10.6953 10.6562 11.0729 10.2839 11.3438 9.82031L11.375 9.77344L12.7344 10.5469L12.7188 10.5938C12.5156 10.9323 12.2682 11.237 11.9766 11.5078C11.6901 11.7786 11.3698 12.013 11.0156 12.2109C10.2917 12.612 9.51042 12.8125 8.67188 12.8125C8.08333 12.8125 7.51562 12.6979 6.96875 12.4688C6.42188 12.2396 5.93229 11.9219 5.5 11.5156C5.07292 11.1094 4.72917 10.6302 4.46875 10.0781C4.20833 9.52604 4.07812 8.92448 4.07812 8.27344C4.07812 7.88281 4.13281 7.4974 4.24219 7.11719C4.46094 6.34635 4.84896 5.67708 5.40625 5.10938C5.54167 4.96354 5.6875 4.83073 5.84375 4.71094C6 4.58594 6.16146 4.47135 6.32812 4.36719C6.66667 4.16406 7.03385 4.00521 7.42969 3.89062C7.82552 3.77083 8.23958 3.71094 8.67188 3.71094C9.56771 3.71094 10.3776 3.92188 11.1016 4.34375C11.8151 4.76562 12.3594 5.35417 12.7344 6.10938Z"
                  fill="black"
                />
              </svg>
              Chooscod
            </p>
          </div>
        </div>
        <h1 className="font-bold md:text-[26px] ">DIGISEVAHELPER</h1>
      </div>
      <div className="text-[14px] flex items-center gap-5 font-semibold ">
        <Link
          to={"/doc"}
          className="uppercase hidden md:block transition-all duration-150"
          id="doc"
        >
          Documents Required
        </Link>
        <Link to={"/charges"} className="uppercase hidden md:block">
          SERVICE CHARGE
        </Link>
        <Link to={"/forms"} className="uppercase hidden md:block">
          FORMS
        </Link>
        <Link to={"/editing-tools"} className="uppercase hidden md:block">
          EDITING TOOLS
        </Link>
        <Link to={"/posts"} className="uppercase hidden md:block">
          POSTERS
        </Link>
        <Link to={"/"} className="uppercase">
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2531 3.06095C15.2405 2.20665 13.7595 2.20665 12.747 3.06095L4.59065 9.94185C3.97833 10.4584 3.625 11.2188 3.625 12.0199V23.2636C3.625 24.4314 4.57173 25.3782 5.73958 25.3782H9.36458C10.5324 25.3782 11.4792 24.4314 11.4792 23.2636V18.4271C11.4792 17.6063 12.1338 16.9384 12.9496 16.9172H16.0504C16.8662 16.9384 17.5208 17.6063 17.5208 18.4271V23.2636C17.5208 24.4314 18.4676 25.3782 19.6354 25.3782H23.2604C24.4283 25.3782 25.375 24.4314 25.375 23.2636V12.0199C25.375 11.2188 25.0217 10.4584 24.4093 9.94185L16.2531 3.06095Z"
              fill="#212121"
            />
          </svg>
        </Link>
        <Link to={"/register"}>Register</Link>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  )
}

export default Navbar
