import { Bell, ChevronRight, FileText, Info } from 'lucide-react';
import { useState } from 'react';

export default function NewsUpdatesSection() {
  const [activeTab, setActiveTab] = useState('news');
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      id: 1,
      date: 'Oct 1, 2025',
      title: 'New Nutrition Guidelines Released for Mid Day Meal Program',
      description: 'Ministry of Education announces updated nutritional standards to ensure balanced meals for students.',
      category: 'Policy Update'
    },
    {
      id: 2,
      date: 'Sep 28, 2025',
      title: 'Digital Payment System Upgrade Completed Successfully',
      description: 'Enhanced security features and faster processing times now available for all registered schools.',
      category: 'Technology'
    },
    {
      id: 3,
      date: 'Sep 25, 2025',
      title: 'State-Level Training Program for Cook-cum-Helpers Announced',
      description: 'Comprehensive training on hygiene and food safety practices scheduled for November 2025.',
      category: 'Training'
    }
  ];

  const grItems = [
    {
      id: 1,
      date: 'Sep 20, 2025',
      title: 'GR/2025/MDM/087 - Revised Fund Allocation Guidelines',
      size: '2.4 MB',
      type: 'PDF'
    },
    {
      id: 2,
      date: 'Sep 15, 2025',
      title: 'GR/2025/MDM/086 - Updated School Registration Process',
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      id: 3,
      date: 'Sep 10, 2025',
      title: 'GR/2025/MDM/085 - Menu Planning and Implementation',
      size: '3.2 MB',
      type: 'PDF'
    }
  ];

  const infoItems = [
    {
      id: 1,
      title: 'How to Register Your School',
      description: 'Step-by-step guide for new school registration in the MDM portal'
    },
    {
      id: 2,
      title: 'Payment Processing Timeline',
      description: 'Understanding the weekly payment cycle and fund disbursement process'
    },
    {
      id: 3,
      title: 'Quality Standards & Monitoring',
      description: 'Learn about food quality checks and compliance requirements'
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Latest Updates & Information
          </h2>
          <p className="text-gray-600">
            Stay informed with the latest news, government resolutions, and important announcements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-8 py-3 font-semibold transition-all duration-200 border-b-2 ${
              activeTab === 'news'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <Bell className="inline-block w-5 h-5 mr-2" />
            Latest News
          </button>
          <button
            onClick={() => setActiveTab('gr')}
            className={`px-8 py-3 font-semibold transition-all duration-200 border-b-2 ${
              activeTab === 'gr'
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <FileText className="inline-block w-5 h-5 mr-2" />
            Government Resolutions
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-8 py-3 font-semibold transition-all duration-200 border-b-2 ${
              activeTab === 'info'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <Info className="inline-block w-5 h-5 mr-2" />
            Information
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md">
          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="relative">
              <div className="p-8">
                <div className="mb-6">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {newsItems[currentSlide].category}
                  </span>
                  <p className="text-sm text-gray-500 mb-2">
                    {newsItems[currentSlide].date}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {newsItems[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {newsItems[currentSlide].description}
                  </p>
                </div>
                <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                  Read More →
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 pb-6">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? 'bg-orange-500 w-6'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* GR Tab */}
          {activeTab === 'gr' && (
            <div className="p-8">
              <div className="space-y-4">
                {grItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.date} • {item.size} • {item.type}
                        </p>
                      </div>
                    </div>
                    <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  View All GRs →
                </button>
              </div>
            </div>
          )}

          {/* Information Tab */}
          {activeTab === 'info' && (
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {infoItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Info className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {item.description}
                    </p>
                    <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                      Learn More →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}