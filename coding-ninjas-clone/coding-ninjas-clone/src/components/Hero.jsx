import React, { useState } from 'react';
import { leadsAPI } from '../services/api';

const Hero = () => {
    const [isTopicOpen, setIsTopicOpen] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        interest: ''
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.phone) return;

        setSubmitLoading(true);
        try {
            await leadsAPI.submit(formData);
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                setFormData({ name: '', email: '', phone: '', experience: '', interest: '' });
            }, 2000);
        } catch (error) {
            console.error('Failed to submit lead:', error);
        } finally {
            setSubmitLoading(false);
        }
    };

    const stats = [
        {
            value: "128% average hike",
            label: "via our placement cell",
            highlight: "text-[#A3E635]"
        },
        {
            value: "1.5 Lac+ learners",
            label: "cracked top tech companies",
            highlight: "text-white"
        },
        {
            value: "1,400+ alumni in MAANG",
            label: "& 103 unicorn startups",
            highlight: "text-white"
        },
    ];

    return (
        <section className="bg-black min-h-[600px] flex items-center relative overflow-hidden py-12 px-4 md:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Side Content */}
                <div className="text-left max-w-2xl">
                    <p className="text-ninja-green font-bold text-lg mb-4">
                        Restricted by opportunities?
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
                        Get the tech career <br /> you deserve. Faster.
                    </h1>

                    <div className="space-y-0 border-t border-white/10 max-w-xl">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex items-center space-x-6 py-4 border-b border-white/10 group transition-all">
                                <div className="w-6 h-6 rounded-full bg-ninja-green/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3.5 h-3.5 text-ninja-green" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-baseline md:space-x-2">
                                    <span className={`${stat.highlight} font-bold text-xl`}>{stat.value}</span>
                                    <span className="text-gray-400 text-base">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Phone Mockup Form */}
                <div className="flex justify-center lg:justify-end">
                    <div className="relative group">
                        {/* Outer container with shine - acts as the border area */}
                        <div className="relative golden-shine p-3 rounded-[3.5rem] bg-ninja-orange/10 shadow-2xl overflow-hidden">
                            {/* Inner container with solid background - covers the shine in the middle */}
                            <div className="relative bg-[#F8FAFC] rounded-[2.5rem] p-6 w-full max-w-[420px] z-10">
                                {/* Inner Form content */}
                                <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Let's find the right course for you</h2>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Experience</p>
                                        <div className="space-y-2.5">
                                            {['Working Professional - Technical Roles', 'Working Professional - Non Technical', 'College Student - Final Year', 'College Student - 1st to Pre-final Year', 'Others'].map((label) => (
                                                <label key={label} className="flex items-center space-x-3 cursor-pointer group/label">
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 group-hover/label:border-ninja-orange flex items-center justify-center p-0.5 transition-all">
                                                        <div className="w-full h-full rounded-full bg-ninja-orange opacity-0 group-hover/label:opacity-100 transition-opacity"></div>
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-600 group-hover/label:text-[#1a1a1a] transition-colors">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Select topic of interest */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select topic of interest</p>
                                            <div className="relative">
                                                <div
                                                    onClick={() => setIsTopicOpen(!isTopicOpen)}
                                                    className={`w-full bg-white border ${isTopicOpen ? 'border-gray-200' : 'border-gray-200'} rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 flex items-center justify-between shadow-sm cursor-pointer transition-all`}
                                                >
                                                    <span>Select your options/choices</span>
                                                    <svg
                                                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isTopicOpen ? 'rotate-180' : 'rotate-0'}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>

                                                {/* Custom Dropdown List - shown as in screenshot */}
                                                {isTopicOpen && (
                                                    <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden divide-y divide-gray-50 z-20">
                                                        {['Software Development', 'Data Analytics', 'Gen AI'].map((topic) => (
                                                            <div
                                                                key={topic}
                                                                onClick={() => setIsTopicOpen(false)}
                                                                className="px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
                                                            >
                                                                {topic}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Name Field */}
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</p>
                                            <input
                                                type="text"
                                                placeholder="Sunny Satpute"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:border-ninja-orange transition-all shadow-sm"
                                            />
                                        </div>

                                        {/* Phone Number Field */}
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                                            <input
                                                type="tel"
                                                placeholder="Enter phone number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:border-ninja-orange transition-all shadow-sm"
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                                            <input
                                                type="email"
                                                placeholder="sunnysatpute676@gmail.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:border-ninja-orange transition-all shadow-sm"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={submitLoading || !formData.name || !formData.email || !formData.phone}
                                            className={`w-full bg-ninja-orange text-white py-3.5 rounded-xl font-black text-base hover:bg-orange-600 transition shadow-xl shadow-ninja-orange/20 mt-2 flex items-center justify-center space-x-2 ${(submitLoading || !formData.name || !formData.email || !formData.phone) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <span>{submitLoading ? 'Submitting...' : submitSuccess ? '✓ Submitted!' : 'Find your course'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Mascot Button matching the screenshot */}
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-black z-20 overflow-hidden">
                            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                                <span className="text-white text-[10px] font-black">N</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
