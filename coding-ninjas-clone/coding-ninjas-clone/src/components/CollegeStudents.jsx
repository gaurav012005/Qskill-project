import React from 'react';

const CollegeStudents = () => {
    return (
        <section className="bg-[#1a1a1a] py-2.5 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-1.5">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-0.5">Built for College Students</h2>
                        <div className="space-y-1.5">
                            <div className="flex items-start">
                                <div className="bg-ninja-orange/10 p-3 rounded-lg mr-4 text-ninja-orange font-bold">01</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">Curriculum designed by experts</h4>
                                    <p className="text-gray-400 mt-1">Our curriculum is designed by alumni from IITs, Stanford, and experts from top tech companies.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-ninja-orange/10 p-3 rounded-lg mr-4 text-ninja-orange font-bold">02</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">24x7 Doubt Support</h4>
                                    <p className="text-gray-400 mt-1">Get your doubts resolved instantly by our team of expert teaching assistants.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-ninja-orange/10 p-3 rounded-lg mr-4 text-ninja-orange font-bold">03</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">Placement Cell</h4>
                                    <p className="text-gray-400 mt-1">Get access to 100+ hiring partners and exclusive job opportunities.</p>
                                </div>
                            </div>
                        </div>
                        <button className="mt-2.5 bg-ninja-orange text-white px-4 py-1.5 rounded-lg font-bold hover:bg-orange-600 transition">View All Courses</button>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://via.placeholder.com/500x500/121212/FF6A1F?text=Student+Focus" alt="Students" className="rounded-3xl shadow-2xl border border-gray-800" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollegeStudents;
