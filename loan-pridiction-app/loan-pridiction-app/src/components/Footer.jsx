import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: praptigoel2002@gmail.com</li>
              <li className="text-gray-300">Phone: +91 9084305503</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/praptigoel/" className="text-gray-300 hover:text-white">
          
                    <i className="fa-brands fa-linkedin-in"></i>
        
              </a>
              <a href="https://github.com/Prapti14Goel" className="text-gray-300 hover:text-white">
              <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Prapti Goel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;