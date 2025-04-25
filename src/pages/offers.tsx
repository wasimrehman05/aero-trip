import React from 'react';
import Head from 'next/head';

const Offers = () => {
    const offers = [
        {
            id: 1,
            title: 'Summer Getaway Special',
            description: 'Get up to 20% off on all domestic flights',
            code: 'SUMMER20',
            validUntil: '2024-08-31',
            image: '/images/summer-offer.jpg'
        },
        {
            id: 2,
            title: 'Early Bird Discount',
            description: 'Book 60 days in advance and save 15%',
            code: 'EARLY15',
            validUntil: '2024-12-31',
            image: '/images/early-bird.jpg'
        },
        {
            id: 3,
            title: 'Weekend Special',
            description: 'Weekend flights starting at just ₹2999',
            code: 'WEEKEND',
            validUntil: '2024-07-31',
            image: '/images/weekend-offer.jpg'
        }
    ];

    return (
        <>
            <Head>
                <title>Special Offers | AeroTrip</title>
                <meta name="description" content="Find the best flight deals and special offers" />
            </Head>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Special Offers</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-48 bg-gray-200">
                                {/* Add actual image here */}
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
                                <p className="text-gray-600 mb-4">{offer.description}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm text-gray-500">Use code:</span>
                                        <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                                            {offer.code}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Offers;