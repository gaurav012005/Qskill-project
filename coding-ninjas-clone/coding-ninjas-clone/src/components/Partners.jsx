import React from 'react';

const Partners = () => {
    const partners = [
        { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
        { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
        { name: 'Adobe', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg' },
        { name: 'Walmart', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg' },
        { name: 'Intuit', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Intuit_logo.svg' }
    ];

    return (
        <div className="bg-[#f8fafc] py-3 border-y border-ninja-border">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-bold text-ninja-gray uppercase tracking-[0.2em] mb-5">Our alumni work at</p>
                <div className="flex flex-wrap justify-center items-center gap-5 md:gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                    {partners.map((p) => (
                        <img key={p.name} src={p.url} alt={p.name} className="h-6 md:h-8 hover:scale-110 transition-transform cursor-pointer" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
