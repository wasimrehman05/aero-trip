import React from 'react';
import Head from 'next/head';

const Support = () => {
    const faqs = [
        {
            question: 'How do I change or cancel my booking?',
            answer: 'You can modify or cancel your booking through the "Manage Booking" section on our website or mobile app. Please note that cancellation policies vary by airline and fare type.'
        },
        {
            question: 'What is the baggage allowance?',
            answer: 'Baggage allowance depends on the airline and fare type. You can find specific details in your booking confirmation email or by checking the airline\'s website.'
        },
        {
            question: 'How do I get a refund?',
            answer: 'Refunds are processed according to the airline\'s policy. For eligible refunds, the amount will be credited back to your original payment method within 7-10 business days.'
        },
        {
            question: 'Can I book a flight for someone else?',
            answer: 'Yes, you can book flights for others. Just make sure to enter their correct details during the booking process.'
        }
    ];

    return (
        <>
            <Head>
                <title>Customer Support | AeroTrip</title>
                <meta name="description" content="Get help with your bookings and travel queries" />
            </Head>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Customer Support</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Customer Care</h3>
                                <p className="text-gray-600">+91 1234567890</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Email Support</h3>
                                <p className="text-gray-600">support@aerotrip.com</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Business Hours</h3>
                                <p className="text-gray-600">Monday - Sunday: 8:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b pb-4">
                                    <h3 className="font-medium mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Support Options */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Additional Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <h3 className="font-medium mb-2">Live Chat</h3>
                            <p className="text-gray-600">Chat with our support team 24/7</p>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Start Chat
                            </button>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium mb-2">Email Us</h3>
                            <p className="text-gray-600">Get a response within 24 hours</p>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Send Email
                            </button>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium mb-2">Visit Us</h3>
                            <p className="text-gray-600">Find our nearest office</p>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Find Location
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Support;
