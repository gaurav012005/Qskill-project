import React, { useEffect, useRef } from 'react';

const ImpactStats = () => {
    const useIntersectionObserver = (options) => {
        const elementsRef = useRef([]);

        useEffect(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-bright-big');
                        entry.target.classList.remove('opacity-40', 'scale-90', 'blur-[1px]');
                    } else {
                        // Optional: Reset animation when scrolling out
                        // entry.target.classList.remove('animate-bright-big');
                        // entry.target.classList.add('opacity-40', 'scale-90', 'blur-[1px]');
                    }
                });
            }, options);

            elementsRef.current.forEach((el) => {
                if (el) observer.observe(el);
            });

            return () => {
                if (elementsRef.current) {
                    elementsRef.current.forEach((el) => {
                        if (el) observer.unobserve(el);
                    });
                }
            };
        }, [options]);

        return (el) => {
            if (el && !elementsRef.current.includes(el)) {
                elementsRef.current.push(el);
            }
        };
    };

    const addToRefs = useIntersectionObserver({ threshold: 0.5, rootMargin: "-50px" });

    return (
        <section className="bg-black py-20 px-4 md:px-8 border-t-0">
            <div className="container mx-auto">
                <style>{`
                    .items-center-custom {
                        min-height: 400px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .animate-bright-big {
                        animation: brightenAndScale 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                    }
                    @keyframes brightenAndScale {
                        0% {
                            opacity: 0.3;
                            transform: scale(0.9);
                            filter: blur(2px);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1.1);
                            filter: blur(0px);
                            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
                        }
                    }
                `}</style>

                {/* Stat 1: Learners */}
                <div className="items-center-custom relative py-12 border-b border-white/10 last:border-0 pointer-events-none select-none">
                    <div ref={addToRefs} className="text-center opacity-40 scale-90 blur-[1px] transition-all duration-700">
                        <div className="w-20 h-20 bg-[#6366f1] rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
                            1.5 Lac+ learners
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 font-medium">
                            cracked dream roles at top tech companies
                        </p>
                    </div>
                </div>

                {/* Stat 2: Alumni */}
                <div className="items-center-custom relative py-12 border-b border-white/10">
                    <div ref={addToRefs} className="text-center opacity-40 scale-90 blur-[1px] transition-all duration-700">
                        <div className="w-20 h-20 bg-[#22c55e] rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-green-500/30">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                            1,400 Alumni in MAANG
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 font-medium">
                            & more in 103/111 Unicorns
                        </p>
                    </div>
                </div>

                {/* Stat 3: Years of Impact - Text Only based on image */}
                <div className="items-center-custom relative py-12 border-b border-white/10">
                    <div ref={addToRefs} className="text-center opacity-40 scale-90 blur-[1px] transition-all duration-700">
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-0 leading-tight tracking-tight">
                            10 years of
                        </h2>
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-4 leading-tight tracking-tight">
                            transforming <br /> tech careers
                        </h2>
                    </div>
                </div>

                {/* Stat 4: Highest CTC */}
                <div className="items-center-custom relative py-12">
                    <div ref={addToRefs} className="text-center opacity-40 scale-90 blur-[1px] transition-all duration-700">
                        <div className="w-20 h-20 bg-[#ec4899] rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-pink-500/30">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
                            1 Cr+ highest CTC
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 font-medium">
                            after completing the course
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ImpactStats;
