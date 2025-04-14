import React from 'react';
import { Apple, ChevronDown } from 'lucide-react'; // For icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-300 text-gray-600 p-4 text-center">
      <div className="flex justify-center space-x-6">
        <a href="#" className="hover:underline">About Us</a>
        <a href="#" className="hover:underline">Select Shaadi</a>
        <a href="#" className="hover:underline">Shaadi Blog</a>
        <a href="#" className="hover:underline">Success Stories</a>
        <a href="#" className="hover:underline">Shaadi Centres</a>
        <a href="#" className="hover:underline">Contact Us</a>
        <a href="#" className="hover:underline">Shaadi Live</a>
        <a href="#" className="hover:underline">Work with us</a>
        <a href="#" className="hover:underline flex items-center">
          Download the App <Apple className="ml-2 h-4 w-4" /> <ChevronDown className="ml-1 h-4 w-4" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;