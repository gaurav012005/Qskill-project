import React from 'react';
import systemDesignImg from '../assets/events/system-design.png';
import fullstackImg from '../assets/events/fullstack.png';
import dsaImg from '../assets/events/dsa.png';

const EventsSection = () => {
    const events = [
        {
            title: "Mastering System Design",
            description: "Learn how to build scalable systems from industry experts.",
            image: systemDesignImg,
            type: "WORKSHOP",
            date: "Oct 24, 2025"
        },
        {
            title: "Full Stack Web Mastery",
            description: "Build production-ready applications from scratch to deployment.",
            image: fullstackImg,
            type: "WEBINAR",
            date: "Oct 28, 2025"
        },
        {
            title: "DSA & Problem Solving",
            description: "Cracker top tech interviews with advanced algorithmic thinking.",
            image: dsaImg,
            type: "BOOTCAMP",
            date: "Nov 02, 2025"
        }
    ];

    return (
        <section className="bg-[#1a1a1a] py-6 px-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
                        <p className="text-gray-400 mt-2">Participate and win amazing prizes</p>
                    </div>
                    <button className="text-ninja-orange font-semibold hover:underline">View All Events</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((event, i) => (
                        <div key={i} className="bg-ninja-dark border border-gray-800 rounded-xl overflow-hidden hover:border-ninja-orange transition-all group shadow-lg hover:shadow-ninja-orange/10">
                            <div className="h-48 bg-gray-900 flex items-center justify-center overflow-hidden">
                                <img
                                    src={event.image}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={event.title}
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${event.type === 'WORKSHOP' ? 'bg-ninja-orange/10 text-ninja-orange' :
                                        event.type === 'WEBINAR' ? 'bg-blue-500/10 text-blue-400' :
                                            'bg-ninja-green/10 text-ninja-green'
                                        }`}>
                                        {event.type}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500">{event.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{event.description}</p>
                                <button className="w-full py-2.5 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition active:scale-95 duration-200">
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
