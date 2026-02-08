import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] py-2 px-4 border-t border-gray-900">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <img
                                src={logo}
                                alt="Coding Ninjas Logo"
                                className="w-[200px] h-auto object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-gray-500 max-w-sm mb-1.5">
                            Copyright © Sunrise Mentors Pvt. Ltd.
                        </p>
                        <div className="flex space-x-4">
                            {['FB', 'TW', 'IG', 'LI'].map(social => (
                                <div key={social} className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-ninja-orange hover:border-ninja-orange transition cursor-pointer font-bold text-xs">
                                    {social}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1.5">Courses</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Data Structures</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Algorithms</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Web Development</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Data Science</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1.5">Community</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">CodeStudio</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Blog</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Events</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Campus Ninjas</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1.5">Company</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">About Us</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Contact Us</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Terms & Conditions</a></li>
                            <li className="hover:text-ninja-orange transition-colors"><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
