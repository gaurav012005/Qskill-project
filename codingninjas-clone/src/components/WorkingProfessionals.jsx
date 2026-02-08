import React, { useState } from 'react';
import aiCourseImg from '../assets/courses/ai-course.png';
import campusCourseImg from '../assets/courses/campus-course.png';
import dataScienceImg from '../assets/courses/data-science-course.png';

const WorkingProfessionals = () => {
    const [activeDomain, setActiveDomain] = useState('All');

    const domains = [
        'All',
        'Data Analytics',
        'Generative AI',
        'Software Development',
        'Data Science',
        'Machine Learning'
    ];

    const courses = [
        {
            image: aiCourseImg,
            title: 'Advanced Certification in GenAI & Multi Agent...',
            institution: 'Coding Ninjas',
            type: 'Certification',
            partners: ['openai', 'meta', 'sql'],
            duration: '6 months',
            status: 'Ongoing',
            domain: 'Generative AI'
        },
        {
            image: aiCourseImg,
            title: 'PG Certification in GenAI and Multi-Agent Systems',
            institution: 'IIT Mandi - TIH (Technology & Innovation Hub)',
            type: 'Certification with IIT\'s',
            partners: ['openai', 'meta', 'sql'],
            duration: '6 months',
            status: 'Ongoing',
            domain: 'Generative AI'
        },
        {
            image: campusCourseImg,
            title: 'Professional Certification in Data Analytics with GenAI',
            institution: 'IITM Pravartak, TIH IIT Madras',
            type: 'Certification with IIT',
            partners: ['meta', 'sql'],
            duration: '6 months',
            status: 'Ongoing',
            domain: 'Data Analytics'
        },
        {
            image: aiCourseImg,
            title: 'Professional Certification in Data Analytics with GenAI',
            institution: 'Vishlesan i-hub, IIT Patna',
            type: 'Certification with IIT',
            status: 'Enrolment closed',
            partners: ['sql', 'meta'],
            duration: '6 months',
            domain: 'Data Analytics'
        },
        {
            image: campusCourseImg,
            title: 'PG Certification in Data Analytics with GenAI',
            institution: 'E&ICT Academy, IIT Guwahati',
            type: 'Certification with IIT',
            status: 'Enrolment closed',
            partners: ['meta', 'sql'],
            duration: '6 months',
            domain: 'Data Analytics'
        },
        {
            image: campusCourseImg,
            title: 'Advanced Certification in Generative AI for Tech Professionals',
            institution: 'Coding Ninjas Cloud',
            type: 'Certification',
            partners: ['meta', 'sql'],
            duration: '6 months',
            status: 'Ongoing',
            domain: 'Generative AI'
        },
        {
            image: aiCourseImg,
            title: 'AI & Data Science Executive Program',
            institution: 'IIT Roorkee, E&ICT Academy',
            type: 'Certification with IIT\'s',
            partners: ['sql', 'openai'],
            duration: '9 months',
            status: 'Ongoing',
            domain: 'Data Science'
        }
    ];

    const filteredCourses = activeDomain === 'All'
        ? courses
        : courses.filter(course => course.domain === activeDomain);

    const scrollRef = React.useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 400;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const PartnerIcon = ({ partner }) => {
        // Simple SVG-like icons for partners
        if (partner === 'openai') return <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9108 6.0462 6.0462 0 0 0-4.7471-3.124 5.9867 5.9867 0 0 0-7.6927 1.0545 5.9847 5.9847 0 0 0-4.9108.5153 6.0462 6.0462 0 0 0-3.124 4.7471 5.9867 5.9867 0 0 0 1.0545 7.6927 5.9847 5.9847 0 0 0 .5153 4.9108 6.0462 6.0462 0 0 0 4.7471 3.124 5.9867 5.9867 0 0 0 7.6927-1.0545 5.9847 5.9847 0 0 0 4.9108-.5153 6.0462 6.0462 0 0 0 3.124-4.7471 5.9867 5.9867 0 0 0-1.0545-7.6927zm-9.0019 9.4979a4.4227 4.4227 0 0 1-2.1804-.5725l.135-.0782 4.4255-2.555a.4346.4346 0 0 0 .2173-.3763v-6.2302l1.785.1h.0019a.4326.4326 0 0 0 .4326-.4326v-1.4251a3.4816 3.4816 0 0 1 1.7779 4.3831 3.5113 3.5113 0 0 1-4.148 2.5135zm-5.02-1.7428l-.135.0782a4.4227 4.4227 0 0 1-4.1711-2.3106l.135-.0782 4.4255-2.555a.4346.4346 0 0 0 .2173-.3763v-3.1151l-1.5458-2.6775a.4321.4321 0 0 0-.5896-.1578l-1.2335.7118a3.4816 3.4816 0 0 1 4.3831-1.7779 3.5113 3.5113 0 0 1 2.5135 4.148zm-1.1275-8.1039l-4.4255 2.555a.4346.4346 0 0 0-.2173.3763v6.2302l-1.785-.1a.4326.4326 0 0 0-.4326.4326v1.4251a3.4816 3.4816 0 0 1-1.7779-4.3831 3.5113 3.5113 0 0 1 4.148-2.5135zm11.3323 4.2212l.135-.0782a4.4227 4.4227 0 0 1 4.1711 2.3106l-.135.0782-4.4255 2.555a.4346.4346 0 0 0-.2173.3763v3.1151l1.5458 2.6775a.4321.4321 0 0 0 .5896.1578l1.2335-.7118a3.4816 3.4816 0 0 1-4.3831 1.7779 3.5113 3.5113 0 0 1-2.5135-4.148z" /></svg>;
        if (partner === 'meta') return <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99,2C6.47,2,2,6.48,2,12s4.47,10,10,10,10-4.48,10-10S17.52,2,11.99,2Zm.11,15.6c-1.3,0-2.4-.33-3.23-1.01-.76-.64-1.17-1.54-1.17-2.7h.03c0-1.04-.04-2.07-.04-3.11,0-.65,.03-1.32,.13-1.92,.1-.7,.3-1.3,.64-1.8,.53-.74,1.33-1.2,2.33-1.4,1-.2,2.13-.23,3.33-.03,1.3,.2,2.3,.6,3.03,1.2,.76,.63,1.13,1.53,1.13,2.7s-.37,2.07-1.13,2.7c-.73,.6-1.73,1-3.03,1.2-1.2,.2-2.33,.17-3.33-.03-.23-.03-.43-.07-.63-.1-.3-.07-.57-.17-.83-.27v-.03c0,.7,.4,1.2,.9,1.5,.5,.3,1.1,.4,1.8,.4,1.1,0,2.1-.2,3.1-.6v1.9c-1,.3-2,.5-3.1,.5Zm-1.63-8c-.3,0-.6,.1-.83,.3s-.33,.5-.33,.9v3c0,.4,0,.7,.24,.9,.23,.2,.53,.3,.83,.3,1,0,1.93-.33,2.7-.9,.47-.36,.7-.86,.7-1.47v-.07c0-.6-.23-1.1-.7-1.43-.77-.57-1.7-1.03-2.7-1.03l.03,.5Zm2.73,5c0,.4,0,.7,.24,.9,.23,.2,.53,.3,.83,.3,1,0,1.93-.33,2.7-.9,.47-.36,.7-.86,.7-1.47v-.07c0-.6-.23-1.1-.7-1.43-.77-.57-1.7-1.03-2.7-1.03l.03,.5c-.3,0-.6,.1-.83,.3s-.33,.5-.33,.9v3Z" /></svg>;
        if (partner === 'sql') return <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2,12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" /></svg>;
        return null;
    };

    return (
        <section className="bg-white py-40 px-4 md:px-8 relative overflow-hidden">
            {/* Background Text "OUR COURSES" */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none w-full text-center">
                <span className="text-[60px] md:text-[90px] font-black text-gray-100 leading-none">
                    OUR COURSES
                </span>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-8">
                        Explore Our Courses
                    </h2>

                    {/* Filter Tabs matching Screenshot 2 */}
                    <div className="flex flex-wrap gap-3 mb-10 justify-center">
                        {domains.map((domain) => (
                            <button
                                key={domain}
                                onClick={() => setActiveDomain(domain)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${activeDomain === domain
                                    ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                                    : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                                    }`}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Carousel */}
                <div className="relative group/carousel">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-12 scrollbar-none snap-x snap-mandatory no-scrollbar"
                    >
                        {filteredCourses.map((course, index) => (
                            <div key={index} className="flex-none w-[320px] md:w-[350px] snap-start">
                                <div className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-[480px] text-left">
                                    {/* Course Image */}
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Logo badge */}
                                        <div className="absolute bottom-4 left-4 bg-white p-1 rounded-lg shadow-md">
                                            <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
                                                <img src={course.image} className="w-full h-full object-cover opacity-50" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h4 className="text-[17px] font-black text-[#1a1a1a] mb-2 leading-tight">
                                            {course.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-medium mb-4">
                                            {course.institution}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <span className="bg-[#fff8f0] text-[#ff8c00] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#ffeecc]">
                                                {course.type}
                                            </span>
                                            {course.status === 'Enrolment closed' && (
                                                <span className="bg-[#fff1f1] text-[#ff4d4d] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                                    Enrolment closed
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {course.partners?.map(p => (
                                                    <PartnerIcon key={p} partner={p} />
                                                ))}
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-400">
                                                {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex justify-end gap-3 mt-4 pr-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-ninja-dark transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-ninja-dark transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkingProfessionals;
