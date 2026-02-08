import React from 'react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Tushar Gupta",
            company: "Google",
            text: "The doubt support is amazing. I never had to wait more than 15 minutes for a solution. The curriculum covers everything from basics to advanced competitive programming.",
            img: "https://i.pravatar.cc/150?u=tushar"
        },
        {
            name: "Ananya Sharma",
            company: "Morgan Stanley",
            text: "Coming from a non-CS background, I was worried. But the structured way of teaching and the focus on core concepts helped me land a job at Morgan Stanley.",
            img: "https://i.pravatar.cc/150?u=ananya"
        },
        {
            name: "Rishi Singh",
            company: "Amazon",
            text: "The mock interview sessions and industry mentor calls really prepared me for the actual interview pressure. Coding Ninjas is the place to be.",
            img: "https://i.pravatar.cc/150?u=rishi"
        }
    ];

    return (
        <section className="bg-ninja-light py-12 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <span className="text-ninja-orange font-black uppercase tracking-[0.3em] text-xs">Testimonials</span>
                    <h2 className="text-3xl md:text-5xl font-black text-ninja-dark mt-4">Trusted by over 1 Lakh Students</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {reviews.map((rev, i) => (
                        <div key={i} className="bg-white p-5 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-ninja-border hover:-translate-y-2 transition-transform duration-500">
                            <div className="flex items-center space-x-4 mb-4">
                                <img src={rev.img} alt={rev.name} className="w-14 h-14 rounded-full border-4 border-orange-50" />
                                <div>
                                    <h4 className="text-ninja-dark font-black">{rev.name}</h4>
                                    <p className="text-ninja-orange text-xs font-bold uppercase tracking-wider">{rev.company}</p>
                                </div>
                            </div>
                            <p className="text-ninja-gray leading-relaxed italic">"{rev.text}"</p>
                            <div className="mt-3 flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
