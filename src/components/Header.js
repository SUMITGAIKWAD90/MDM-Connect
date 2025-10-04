import { CheckCircle, Heart } from 'lucide-react';

const Header = () => (
      <header className="shadow-lg"  >
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
                  <h1 className="text-3xl font-bold text-gray-800">Mid Day Meal Scheme</h1>
                  <p className="text-orange-600 text-lg font-semibold">प्रधानमंत्री पोषण शक्ति निर्माण</p>
                  <p className="text-green-700 text-sm">Ministry of Education, Government of India</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-2">
                  <Heart className="w-6 h-6 text-red-500 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">Feeding Our Future</span>
                </div>
                <div className="flex items-center justify-end">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-gray-600">Secure Digital Payment Portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

);

export default Header;