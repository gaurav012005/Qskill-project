import React from 'react';

const Stats = () => {
    const stats = [
        { label: "Students Trained", value: "1,00,000+" },
        { label: "Hiring Partners", value: "100+" },
        { label: "Agerage CTC Hike", value: "128%" },
        { label: "Successful Placements", value: "50,000+" }
    ];

    return (
        <section className="bg-white py-1 border-b border-ninja-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center p-1 rounded-3xl group hover:bg-orange-50 transition-colors duration-500">
                            <h3 className="text-4xl md:text-5xl font-black text-ninja-orange mb-0.5 group-hover:scale-110 transition-transform">
                                {s.value}
                            </h3>
                            <p className="text-sm font-bold text-ninja-dark uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
