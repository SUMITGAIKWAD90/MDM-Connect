import { BookOpen, Clock, Heart, Users } from 'lucide-react';

const Footer = () => (

    <div>
      <div className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-blue-300 mb-2" />
              <div className="text-2xl font-bold">12.04 Cr</div>
              <div className="text-blue-200 text-sm">Children Covered</div>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="w-8 h-8 text-green-300 mb-2" />
              <div className="text-2xl font-bold">11.20 Lakh</div>
              <div className="text-blue-200 text-sm">Schools Enrolled</div>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 text-red-300 mb-2" />
              <div className="text-2xl font-bold">2.65 Lakh</div>
              <div className="text-blue-200 text-sm">Cook-cum-Helpers</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-yellow-300 mb-2" />
              <div className="text-2xl font-bold">Daily</div>
              <div className="text-blue-200 text-sm">Fresh Meals</div>
            </div>
          </div>
        </div>
      </div>



      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="font-semibold">Ministry of Education, Government of India</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">
              Mid Day Meal Scheme | Digital India Initiative | National Education Policy 2020
            </p>
            <p className="text-gray-400 text-xs">
              © 2025 Government of India. All rights reserved. | Helpline: 1800-11-3434 | Email: mdm@education.gov.in
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Blockchain Network: Polygon Amoy Testnet | Portal Version: v2.1 | Last Updated: September 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
);

export default Footer;