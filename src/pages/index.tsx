import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import styles from "@/pages/styles/index.module.css";
import { SwapIcon } from "@/icons";
import { Radio, DatePicker, DialogBox, LocationInput } from "@/components";
import { Button } from "@/components/ui/button";
import { LocationSuggestion } from "@/components/LocationInput";
import { searchFlight } from "@/services/searchFlight";
import { FlightList } from "@/components/FlightList";
import { AppContext } from "@/context/AppContext";

export const getServerSideProps: GetServerSideProps = async () => {
    return { props: {} };
};

type TripType = "oneWay" | "roundTrip";
type FareType = "regular" | "seniorCitizen" | "student" | "armedForces";
export type ClassType =
    | "economy"
    | "premium economy"
    | "business class"
    | "first class";
export type TravelingType = {
    adults: number;
    children: number;
    infants: number;
    class: ClassType;
};

const dateFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
};
const FlightPage: React.FC = () => {
    const {
        flightResults,
        setFlightResults,
        error,
        setError,
        isLoading,
        setIsLoading
    } = useContext(AppContext);

    const [tripType, setTripType] = useState<TripType>("oneWay");
    const [fareType, setFareType] = useState<FareType>("regular");
    const [oneWayDate, setOneWayDate] = useState<Date | null>(new Date());
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [traveling, setTraveling] = useState<TravelingType>({
        adults: 1,
        children: 0,
        infants: 0,
        class: "economy",
    });
    const [fromLocation, setFromLocation] = useState<LocationSuggestion | null>(null);
    const [toLocation, setToLocation] = useState<LocationSuggestion | null>(null);

    const handleLocationInput = async (
        name: string,
        location: LocationSuggestion
    ) => {
        if (name === "from") {
            setFromLocation(location);
        } else if (name === "to") {
            setToLocation(location);
        }
    };
    
    const handleSearch = async () => {
        setError("");
        setIsLoading(true);

        try {
            let response = await searchFlight();
            if (response?.itineraries?.results.length > 0) {
                setFlightResults(response?.itineraries?.results);
            }
        } catch (error) {
            setError("Failed to fetch flight results. Please try again.");
            console.error("Error fetching flights:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setReturnDate(null);
    }, [tripType]);


    return (
        <div>
            <div
                className={styles.search_card}
                style={{ paddingTop: error ? "10px" : "44px" }}
            >
                {error && (
                    <p className="mb-[10px] text-red-500 text-sm mt-1">
                        {error}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <Radio<TripType>
                        getValue={tripType}
                        setValue={setTripType}
                        data={[
                            { value: "oneWay", label: "One Way" },
                            { value: "roundTrip", label: "Round Trip" },
                        ]}
                    />
                    <DialogBox
                        dialogValue={traveling}
                        setDialogValue={setTraveling}
                    />
                </div>
                <div className={styles.input_group}>
                    <LocationInput
                        placeholder="Country, city or airport"
                        name="from"
                        iconAction="takeoff"
                        onChange={handleLocationInput}
                        value={fromLocation?.location || ""}
                    />
                    <span>
                        <SwapIcon />
                    </span>
                    <LocationInput
                        placeholder="Country, city or airport"
                        name="to"
                        iconAction="landing"
                        onChange={handleLocationInput}
                        value={toLocation?.location || ""}
                    />
                </div>

                <div className="flex justify-between my-7">
                    <DatePicker
                        type={"Oneway"}
                        date={oneWayDate}
                        setDate={setOneWayDate}
                        isDisable={false}
                        otherDate={null}
                    />
                    <DatePicker
                        type={"Return"}
                        date={returnDate}
                        setDate={setReturnDate}
                        isDisable={tripType === "oneWay" ? true : false}
                        otherDate={oneWayDate}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Radio<FareType>
                        getValue={fareType}
                        setValue={setFareType}
                        data={[
                            { value: "regular", label: "Regular" },
                            { value: "seniorCitizen", label: "Senior Citizen" },
                            { value: "student", label: "Student" },
                            { value: "armedForces", label: "Armed Forces" },
                        ]}
                    />
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                        onClick={handleSearch}
                    >
                        Search Flights
                    </Button>
                </div>
            </div>
            <div className="flight-results-container">
                {isLoading ? (
                    <div className="flex justify-center items-center py-8 m-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : flightResults && flightResults.length > 0 ? (
                    <FlightList results={flightResults} />
                ) : (
                    <div className="text-center py-8 text-gray-600">
                        {error || "Search for flights to see results"}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightPage;
