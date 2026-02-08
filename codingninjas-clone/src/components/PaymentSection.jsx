import React from 'react';

const PaymentSection = () => {
    return (
        <section className="bg-ninja-dark py-20 px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Invest in your Career</h2>
                <p className="text-gray-400 mb-12">Flexible payment plans and scholarships available.</p>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#1a1a1a] p-10 rounded-3xl border border-gray-800 hover:border-ninja-orange transition relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-ninja-orange px-4 py-1 text-white text-xs font-bold rounded-bl-xl">POPULAR</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                        <div className="text-4xl font-bold text-white my-6">₹14,999<span className="text-lg text-gray-500 font-normal"> / course</span></div>
                        <p className="text-gray-400 mb-8">Best for individuals looking for quick upskilling.</p>
                        <button className="w-full py-4 bg-ninja-orange text-white rounded-xl font-bold hover:bg-orange-600 transition">Get Started</button>
                    </div>
                    <div className="bg-[#1a1a1a] p-10 rounded-3xl border border-gray-800 hover:border-ninja-orange transition group">
                        <h3 className="text-2xl font-bold text-white mb-2">EMI Plan</h3>
                        <div className="text-4xl font-bold text-white my-6">₹2,500<span className="text-lg text-gray-500 font-normal"> / month</span></div>
                        <p className="text-gray-400 mb-8">No-cost EMI available on major credit cards.</p>
                        <button className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition">View EMI Options</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentSection;
