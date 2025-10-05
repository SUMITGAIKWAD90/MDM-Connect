import { Bell, ChevronLeft, ChevronRight, ClipboardCheck, FileText, HelpCircle, Info, Phone, Target, Users, Utensils } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function NewsUpdatesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [grScrollPosition, setGrScrollPosition] = useState(0);
  const [isGrPaused, setIsGrPaused] = useState(false);
  const grContainerRef = useRef(null);

  const newsItems = [
    {
      id: 1,
      date: 'May 1, 2025',
      title: 'Government Approves 9.5% Hike in Material Cost Under PM-POSHAN Scheme',
      description: 'The Government of India has approved a significant increase in material cost, resulting in an additional central expenditure of ₹954 crore for FY 2025-26, ensuring better quality meals for students.',
      category: 'Budget Update',
      link: 'https://vajiramandravi.com/current-affairs/pm-poshan-scheme/'
    },
    {
      id: 2,
      date: 'September 2025',
      title: '8th Rashtriya Poshan Maah Launched Nationwide',
      description: 'Prime Minister launches comprehensive nutrition awareness campaign focusing on maternal and child health, strengthening the PM POSHAN initiative across the country.',
      category: 'National Campaign',
      link: 'https://pmposhan.education.gov.in/'
    },
    {
      id: 3,
      date: 'FY 2024-25',
      title: 'PM POSHAN Scheme Budget Stands at ₹12,467.39 Crore',
      description: 'The scheme continues to provide hot cooked meals to 11.80 crore children across 11.20 lakh schools nationwide, covering primary to upper primary classes.',
      category: 'Financial Allocation',
      link: 'https://en.wikipedia.org/wiki/Midday_Meal_Scheme'
    },
    {
      id: 4,
      date: 'February 2025',
      title: 'Comprehensive Nutritional Assessment Study Released',
      description: 'World Food Programme publishes landscape analysis of PM POSHAN scheme, mapping school meal menus and assessing nutritional standards across India.',
      category: 'Research Report',
      link: 'https://www.wfp.org/publications/november-2024-landscape-analysis-pradhan-mantri-poshan-shakti-nirman-pm-poshan-scheme'
    }
  ];

  const grItems = [
    {
      id: 1,
      date: 'Sep 20, 2025',
      title: 'GR/2025/MDM/087 - Revised Fund Allocation Guidelines',
      image: '/images/gr/gr-087.jpg',
      link: '/documents/gr-087.pdf'
    },
    {
      id: 2,
      date: 'Sep 15, 2025',
      title: 'GR/2025/MDM/086 - Updated School Registration Process',
      image: '/images/gr/gr-086.jpg',
      link: '/documents/gr-086.pdf'
    },
    {
      id: 3,
      date: 'Sep 10, 2025',
      title: 'GR/2025/MDM/085 - Menu Planning and Implementation',
      image: '/images/gr/gr-085.jpg',
      link: '/documents/gr-085.pdf'
    },
    {
      id: 4,
      date: 'Aug 28, 2025',
      title: 'GR/2025/MDM/084 - Quality Control Standards',
      image: '/images/gr/gr-084.jpg',
      link: '/documents/gr-084.pdf'
    },
    {
      id: 5,
      date: 'Aug 15, 2025',
      title: 'GR/2025/MDM/083 - Digital Payment Guidelines',
      image: '/images/gr/gr-083.jpg',
      link: '/documents/gr-083.pdf'
    },
    {
      id: 6,
      date: 'Aug 05, 2025',
      title: 'GR/2025/MDM/082 - Cook Training Standards',
      image: '/images/gr/gr-082.jpg',
      link: '/documents/gr-082.pdf'
    }
  ];

  const infoSections = [
    {
      id: 'objectives',
      icon: Target,
      title: 'Scheme Objectives and Benefits',
      content: [
        'Address classroom hunger and improve nutritional levels of school children',
        'Encourage poor children, especially from disadvantaged sections, to attend school regularly',
        'Provide nutritional support to children in drought-affected areas during summer vacations',
        'Improve enrollment, attendance, and retention rates in schools',
        'Promote gender equality by encouraging girl child education'
      ]
    },
    {
      id: 'eligibility',
      icon: Users,
      title: 'Eligibility Criteria',
      content: [
        'All children studying in Classes I to VIII in Government and Government-aided schools',
        'Children in pre-schools or Bal Vatika (before Class I) in primary schools',
        'Covers approximately 11.80 crore children across 11.20 lakh schools',
        'Special provisions for children in educationally backward blocks',
        'No discrimination based on caste, creed, or economic status'
      ]
    },
    {
      id: 'nutrition',
      icon: Utensils,
      title: 'Nutritional Standards',
      content: [
        'Primary Level: ₹4.13 per child per day cooking cost',
        'Upper Primary Level: ₹6.18 per child per day cooking cost',
        'Minimum 450 calories and 12 grams of protein for primary students',
        'Minimum 700 calories and 20 grams of protein for upper primary students',
        'Meals must include cereals, pulses, vegetables, and micronutrients'
      ]
    },
    {
      id: 'implementation',
      icon: ClipboardCheck,
      title: 'Implementation Guidelines',
      content: [
        'Hot cooked meals to be served during school hours',
        'Weekly menu to be displayed in schools with local food preferences',
        'Involvement of Gram Panchayats, School Management Committees, and Parent-Teacher Associations',
        'Regular monitoring through surprise inspections and quality checks',
        'Digital attendance and meal tracking through PM POSHAN portal'
      ]
    },
    {
      id: 'contact',
      icon: Phone,
      title: 'Contact Information',
      content: [
        'Ministry of Education, Government of India',
        'Department of School Education & Literacy',
        'Email: midday-meal@gov.in',
        'Helpline: 1800-11-8004 (Toll-Free)',
        'Website: https://pmposhan.education.gov.in'
      ]
    },
    {
      id: 'faq',
      icon: HelpCircle,
      title: 'Frequently Asked Questions',
      content: [
        'Q: When are funds released to schools? A: Funds are released weekly based on verified attendance',
        'Q: What is the scheme duration? A: Currently approved from 2021-22 to 2025-26',
        'Q: Can private schools participate? A: No, only government and government-aided schools are eligible',
        'Q: How is quality monitored? A: Through regular inspections, parent feedback, and digital tracking',
        'Q: What if a child has dietary restrictions? A: Alternative arrangements can be made with prior intimation'
      ]
    }
  ];

  // Auto-scroll for news
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, newsItems.length]);

  // Auto-scroll for GR carousel
  useEffect(() => {
    if (!isGrPaused && grContainerRef.current) {
      const interval = setInterval(() => {
        setGrScrollPosition((prev) => {
          const container = grContainerRef.current;
          if (!container) return prev;
          
          const maxScroll = container.scrollWidth - container.clientWidth;
          const newPosition = prev + 1;
          
          if (newPosition >= maxScroll) {
            return 0;
          }
          return newPosition;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [isGrPaused]);

  // Apply scroll position
  useEffect(() => {
    if (grContainerRef.current) {
      grContainerRef.current.scrollLeft = grScrollPosition;
    }
  }, [grScrollPosition]);

  const handleGrScroll = (direction) => {
    if (grContainerRef.current) {
      const scrollAmount = 350;
      const newPosition = direction === 'left' 
        ? Math.max(0, grScrollPosition - scrollAmount)
        : grScrollPosition + scrollAmount;
      setGrScrollPosition(newPosition);
    }
  };

  return (
    <div className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION 1: INFORMATION */}
        <section>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-3">
              <Info className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">
                About PM POSHAN Scheme
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Pradhan Mantri Poshan Shakti Nirman - Comprehensive Information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-blue-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.content.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: LATEST NEWS */}
        <section>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-3">
              <Bell className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">
                Latest News & Updates
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Stay informed with recent developments in PM POSHAN Scheme
            </p>
          </div>

          <div 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative h-80">
              {newsItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="p-10 h-full flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-3">
                        {item.category}
                      </span>
                      <p className="text-sm text-gray-500 mb-3">
                        {item.date}
                      </p>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                    >
                      Read Full Article →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-200 h-1">
              <div 
                className="bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / newsItems.length) * 100}%` }}
              />
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 py-6 bg-gray-50">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all ${
                    currentSlide === index
                      ? 'bg-orange-500 w-8 h-3'
                      : 'bg-gray-300 w-3 h-3'
                  } rounded-full hover:bg-orange-400`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: GOVERNMENT RESOLUTIONS - CAROUSEL */}
        <section>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-3">
              <FileText className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">
                Government Resolutions
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Official documents and policy guidelines for PM POSHAN implementation
            </p>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsGrPaused(true)}
            onMouseLeave={() => setIsGrPaused(false)}
          >
            {/* Left Arrow */}
            <button
              onClick={() => handleGrScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-green-50"
            >
              <ChevronLeft className="w-6 h-6 text-green-600" />
            </button>

            {/* Carousel Container */}
            <div 
              ref={grContainerRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth py-4 px-12"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Duplicate items for infinite scroll effect */}
              {[...grItems, ...grItems].map((item, index) => (
                <a
                  key={`${item.id}-${index}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 w-80 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-green-500"
                >
                  <div className="relative h-64 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2316a34a" width="400" height="300"/%3E%3Ctext fill="white" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EGR Document%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to View
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 mb-2">{item.date}</p>
                    <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => handleGrScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-green-50"
            >
              <ChevronRight className="w-6 h-6 text-green-600" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
