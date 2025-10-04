import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from 'react-router-dom';

const HeaderMain = () => (
  <header className="shadow-lg">
    <div className="bg-white bg-opacity-95 ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Government Seal"
                className="w-20 h-20"
<<<<<<< HEAD
=======
                loading="lazy"
>>>>>>> d781c17 (Some technical Issue Fixed)
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Mid Day Meal Scheme
              </h1>
              <p className="text-orange-600 text-lg font-semibold">
                प्रधानमंत्री पोषण शक्ति निर्माण
              </p>
              <p className="text-green-700 text-sm">
                Ministry of Education, Government of India
              </p>
            </div>
          </div>
          <nav className="bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-center space-x-4 py-4">
                <a
                  href="/"
                  className="px-6 py-2 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Home
                </a>
                <a
                  href="/public"
                  className="px-6 py-2 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Public
                </a>
                <a
                  href="/about"
                  className="px-6 py-2 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  About Us
                </a>
                <Menu as="div" className="relative inline-block">
                  <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-lg px-6 py-2 text-gray-800 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 outline-none ring-0 focus:ring-0 focus:outline-none active:ring-0 active:outline-none">
                    Login
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-50 mt-4 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <Link
                          to="/payment"
                          className="block px-4 py-2 text-sm font-semibold"
                        >
                          Government Official
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/login/school"
                          className="block px-4 py-2 text-sm font-semibold transition-colors"
                        >
                          School
                        </Link>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
);

export default HeaderMain;
