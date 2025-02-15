import React, { useEffect } from "react";

const Navbar = () => {

  return (
    <nav className="bg-white shadow-md top-0 w-full z-50" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <img
              src="https://static.wixstatic.com/media/6e4188_575a494f14e64fc5a1db5a3f928c4aec~mv2.png/v1/fill/w_284,h_92,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Layer_1%20(2).png"
              alt="Logo"
              className="h-12"
            />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-500 text-sm font-medium scroll-animate">
              Home
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-500 text-sm font-medium scroll-animate">
              Contact
            </a>
            <a href="#reports" className="text-gray-700 hover:text-blue-500 text-sm font-medium scroll-animate">
             Reports
            </a>
          </div>
          <div className="flex items-center">
            <a href="#form">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                Check Eligibility
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;