import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import styles from "@/pages/styles/index.module.css";
import { SwapIcon } from "@/icons";
import { Radio, DatePicker, DialogBox, LocationInput } from "@/components";

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
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");

    const handleLocationInput = async (name: string, value: string) => {
        if (name === "from") {
            setFromLocation(value);
        } else if (name === "to") {
            setToLocation(value);
        }
    };

    useEffect(() => {
        setReturnDate(null);
    }, [tripType]);

    return (
        <div>
            <div className={styles.search_card}>
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
                        value={fromLocation}
                    />
                    <span>
                        <SwapIcon />
                    </span>
                    <LocationInput
                        placeholder="Country, city or airport"
                        name="to"
                        iconAction="landing"
                        onChange={handleLocationInput}
                        value={toLocation}
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
            </div>
        </div>
    );
};

export default FlightPage;
