import React, { useState } from 'react';
import { PlaneIcon } from '@/icons';
import { AirlineLogo } from './AirlineLogo';


// interface FlightSegment {
//     departureAirport: {
//         code: string;
//         name: string;
//     };
//     arrivalAirport: {
//         code: string;
//         name: string;
//     };
//     departureTime: string;
//     arrivalTime: string;
//     duration: string;
//     airline: {
//         code: string;
//         name: string;
//     };
// }

// interface FlightItinerary {
//     id: string;
//     price: {
//         amount: number;
//         currency: string;
//     };
//     segments: FlightSegment[];
//     stops: number;
// }

// interface FlightListProps {
//     itineraries: FlightItinerary[];
// }

export const FlightList: React.FC<any> = ({ results }) => {
    const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'best' | 'price' | 'duration'>('best');

    const sortedResults = () =>{
        if (sortBy === 'best') {
            return [...results];
        } else {
            return [...results].sort((a, b) => {
                if (sortBy === 'price') {
                    return a.price.raw - b.price.raw;
                } else {
                    return a.legs[0].durationInMinutes - b.legs[0].durationInMinutes;
                }
            });
        }
    }

    const formatTime = (time: string) => {
        return new Date(time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDuration = (duration: string) => {
        const hours = Math.floor(parseInt(duration) / 60);
        const minutes = parseInt(duration) % 60;
        return `${hours}h ${minutes}m`;
    };

    const handleSelectFlight = (flightId: string) => {
        setSelectedFlight(flightId);
        // Here you can add additional logic for what happens when a flight is selected
        // For example, redirecting to a booking page or showing more details
    };


    return (
        <>
            <div className="sticky top-[75px] bg-white z-10 m-4 rounded-lg  shadow-sm">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="text-lg font-semibold">Sort by:</div>
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-2 rounded-lg ${
                                sortBy === 'best' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                            onClick={() => setSortBy('best')}
                        >
                            Best
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${
                                sortBy === 'price' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                            onClick={() => setSortBy('price')}
                        >
                            Price
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${
                                sortBy === 'duration' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                            onClick={() => setSortBy('duration')}
                        >
                            Travel Time
                        </button>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {sortedResults().map((flight: any) => (
                    <div key={flight.id} className="bg-white rounded-lg shadow p-4 m-4">
                        {/* Header with flight summary */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12">
                                    <AirlineLogo airlineCode={flight.legs[0].segments[0].marketingCarrier.displayCode} width={48} height={48} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">{flight.legs[0].segments[0].operatingCarrier.name}</div>
                                    <div className="text-sm text-gray-500">{flight.legs[0].segments[0].flightNumber}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-2xl font-semibold">{flight.legs[0].departure.substring(11, 16)}</div>
                                <div className="flex flex-col items-center">
                                    <div className="text-sm text-gray-500">{flight.legs[0].durationInMinutes}m</div>
                                    <div className="text-sm text-gray-500">{flight.legs[0].stopCount === 0 ? 'non-stop' : `${flight.legs[0].stopCount} stop`}</div>
                                </div>
                                <div className="text-2xl font-semibold">{flight.legs[0].arrival.substring(11, 16)}</div>
                                <div className="ml-8">
                                    <div className="text-2xl font-semibold">{flight.price.formatted}</div>
                                    {flight.discountCode && (
                                        <div className="text-sm text-green-600">Get ₹{flight.discountAmount} off with {flight.discountCode}</div>
                                    )}
                                </div>
                                <button className="bg-orange-500 text-white px-8 py-2 rounded-lg hover:bg-orange-600">
                                    Book
                                </button>
                            </div>
                        </div>

                        {/* Flight Details */}
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-lg font-medium">{flight.legs[0].origin.city} → {flight.legs[0].destination.city}</div>
                                    <div className="text-sm text-gray-500">{new Date(flight.legs[0].departure).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">PARTIALLY REFUNDABLE</span>
                                    <a href="#" className="text-blue-600 text-sm">Know more</a>
                                </div>
                            </div>

                            {flight.legs[0].segments.map((segment: any, index: number) => (
                                <React.Fragment key={index}>
                                    <div className="mt-4 grid grid-cols-12 gap-4">
                                        <div className="col-span-1">
                                            <AirlineLogo airlineCode={segment.marketingCarrier.displayCode} width={40} height={40} />
                                        </div>
                                        <div className="col-span-11 grid grid-cols-3 gap-4">
                                            <div>
                                                <div className="text-xl font-semibold">{segment.departure.substring(11, 16)}</div>
                                                <div className="text-sm text-gray-600">{new Date(segment.departure).toLocaleDateString()}</div>
                                                <div className="text-sm text-gray-500">{segment.origin.name}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-500">{Math.floor(segment.durationInMinutes / 60)}h {segment.durationInMinutes % 60}m</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-semibold">{segment.arrival.substring(11, 16)}</div>
                                                <div className="text-sm text-gray-600">{new Date(segment.arrival).toLocaleDateString()}</div>
                                                <div className="text-sm text-gray-500">{segment.destination.name}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {index < flight.legs[0].segments.length - 1 && (
                                        <div className="my-4 pl-16 text-sm text-gray-500">
                                            Short layover {Math.floor(flight.legs[0].segments[index + 1].layoverDurationInMinutes / 60)}h {flight.legs[0].segments[index + 1].layoverDurationInMinutes % 60}m
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}

                            <div className="mt-4 grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-sm text-gray-600">Check-in baggage</div>
                                    <div className="text-sm font-medium">15kg / adult</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Cabin baggage</div>
                                    <div className="text-sm font-medium">7kg / adult</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}; 