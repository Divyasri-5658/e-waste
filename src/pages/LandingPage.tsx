import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Recycle, ArrowRight, CheckCircle, Truck, Award, Calendar, 
  Laptop, Smartphone, Monitor, Cpu 
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Recycle Your E-Waste <span className="text-green-600">Responsibly</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Schedule easy pickups for your electronic waste. Protect the environment and earn rewards for your contributions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 text-center"
                >
                  Get Started
                </Link>
                <Link 
                  to="/about" 
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-green-100 rounded-full z-0"></div>
                <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-green-50 rounded-full z-0"></div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="E-waste recycling" 
                    className="rounded-lg w-full max-w-lg object-cover h-80 lg:h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our process makes recycling e-waste simple, convenient, and rewarding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Schedule a Pickup</h3>
              <p className="text-gray-600">
                Select a convenient date and time for our team to collect your e-waste from your location.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">We Collect Your Items</h3>
              <p className="text-gray-600">
                Our team arrives at your doorstep to collect the e-waste items for responsible recycling.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Earn Rewards</h3>
              <p className="text-gray-600">
                Get EcoPoints for each pickup that can be redeemed for exclusive rewards and discounts.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/register" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Accepted Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Accept</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We accept a wide range of electronic waste items for responsible recycling and disposal.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Computers & Laptops</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Mobile Devices</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Monitors & TVs</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Computer Peripherals</h3>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/services" 
              className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors duration-300"
            >
              View all accepted items
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to making e-waste recycling convenient while protecting the environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Convenient Pickup Service</h3>
                <p className="text-gray-600">
                  We come to your location to collect e-waste, saving you time and effort. No need to find disposal centers or transport heavy items.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Environmentally Responsible</h3>
                <p className="text-gray-600">
                  We ensure all e-waste is properly recycled or disposed of according to environmental regulations to minimize ecological impact.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Rewards Program</h3>
                <p className="text-gray-600">
                  Earn EcoPoints for every pickup that can be redeemed for various rewards, making recycling beneficial for you too.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Data Destruction</h3>
                <p className="text-gray-600">
                  We offer secure data wiping services to ensure your personal information doesn't fall into the wrong hands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Recycle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Recycle Your E-Waste?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of environmentally conscious individuals making a difference. Start your recycling journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-white text-green-700 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/schedule" 
              className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Schedule Pickup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;