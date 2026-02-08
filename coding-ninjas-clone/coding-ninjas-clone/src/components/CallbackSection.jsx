import React from 'react';

const CallbackSection = () => {
    return (
        <section className="bg-ninja-dark py-10 px-4 md:px-6 relative overflow-hidden">
            {/* Background Texture/Gradient (Simplified) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-transparent to-transparent"></div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">

                {/* Left Content */}
                <div className="flex flex-col justify-center">
                    <p className="text-ninja-orange font-bold text-lg mb-2 tracking-wide">Restricted by opportunities?</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.1]">
                        Get the tech career <br /> you deserve. Faster.
                    </h2>

                    <div className="space-y-5">
                        {[
                            "128% average hike via our placement cell",
                            "1.5 Lac+ learners cracked top tech companies",
                            "1,400+ alumni in MAANG & 103 unicorn startups"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4 bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 text-ninja-dark">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </div>
                                <span className="text-gray-300 font-bold text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Form */}
                <div className="bg-white rounded-[2rem] p-4 md:p-5 shadow-2xl relative">
                    <div className="absolute -top-10 left-10 md:-left-10 bg-white p-4 rounded-xl shadow-lg transform -rotate-6 hidden md:block">
                        <span className="font-bold text-ninja-dark">🚀 Upskill Now</span>
                    </div>

                    <h3 className="text-2xl font-black text-ninja-dark mb-4">Let's find the right course for you</h3>

                    <form className="space-y-3">
                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-3">Experience</label>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="radio" name="experience" className="w-5 h-5 text-ninja-orange focus:ring-ninja-orange" />
                                    <span className="text-gray-700 font-medium group-hover:text-ninja-orange transition">Working Professional - Technical Roles</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="radio" name="experience" className="w-5 h-5 text-ninja-orange focus:ring-ninja-orange" />
                                    <span className="text-gray-700 font-medium group-hover:text-ninja-orange transition">Working Professional - Non Technical</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="radio" name="experience" className="w-5 h-5 text-ninja-orange focus:ring-ninja-orange" />
                                    <span className="text-gray-700 font-medium group-hover:text-ninja-orange transition">College Student - Final Year</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="radio" name="experience" className="w-5 h-5 text-ninja-orange focus:ring-ninja-orange" />
                                    <span className="text-gray-700 font-medium group-hover:text-ninja-orange transition">College Student - 1st to Pre-final Year</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="radio" name="experience" className="w-5 h-5 text-ninja-orange focus:ring-ninja-orange" />
                                    <span className="text-gray-700 font-medium group-hover:text-ninja-orange transition">Others</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-2">Select topic of interest</label>
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-ninja-orange bg-white">
                                <option>Select your options/choices</option>
                                <option>Data Analytics</option>
                                <option>Web Development</option>
                                <option>Data Science</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-2">Name</label>
                            <input type="text" placeholder="Enter name" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-ninja-orange transition" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Phone Number</label>
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                    <span className="bg-gray-100 px-3 py-3 border-r border-gray-300 text-gray-600 font-bold">+91</span>
                                    <input type="tel" placeholder="Enter phone number" className="w-full px-4 py-3 focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Email</label>
                                <input type="email" placeholder="Enter email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-ninja-orange transition" />
                            </div>
                        </div>

                        <button type="button" className="w-full bg-ninja-orange text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-orange-600 transition flex items-center justify-center space-x-2">
                            <span>Talk to our experts</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CallbackSection;
