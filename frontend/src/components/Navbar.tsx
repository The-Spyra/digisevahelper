import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-screen bg-[#00AA88] px-3 py-2 rounded-b-md shadow-[1px_1px_35px_1px] shadow-slate-500 flex justify-between items-center">
      <h1 className="font-bold text-[26px]">DIGISEVAHELPER</h1>
      <div className="text-[14px] flex items-center gap-5 font-medium ">
        <Link to={"/"} className="uppercase">
          Documents Required
        </Link>
        <Link to={"/"} className="uppercase">
          SERVICE CHARGE
        </Link>
        <Link to={"/"} className="uppercase">
          FORMS
        </Link>
        <Link to={"/"} className="uppercase">
          EDITING TOOLS
        </Link>
        <Link to={"/"} className="uppercase">
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
        <Link to={"/"}>Register</Link>
        <Link to={"/"}>Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
