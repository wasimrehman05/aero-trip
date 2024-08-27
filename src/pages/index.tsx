import { useState } from "react";
import { GetServerSideProps } from "next";
import styles from "@/pages/styles/index.module.css";
import { LandingIcon, SwapIcon, TakeOffIcon } from "@/icons";
import { Radio } from "@/components";


export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};

type TripType = "oneWay" | "roundTrip";
type FareType = "regular" | "seniorCitizen" | "student" | "armedForces";

const FlightPage: React.FC = () => {
    const [tripType, setTripType] = useState<TripType>("oneWay");
    const [fareType, setFareType] = useState<FareType>("regular");
    const [oneWayDate, setOneWayDate] = useState<string>(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    });


    return (
        <div style={{ height: "200vh" }}>
            <h1>Flight Booking</h1>
            <div className={styles.search_card}>
                <Radio<TripType>
                    getValue={tripType}
                    setValue={setTripType}
                    data={[
                        { value: "oneWay", label: "One Way" },
                        { value: "roundTrip", label: "Round Trip" },
                    ]}
                />
                <div className={styles.input_group}>
                    <div>
                        <span className={styles.takeoff}>
                            <TakeOffIcon />
                        </span>
                        <input
                            placeholder="Country, city or airport"
                            type="text"
                        />
                    </div>
                    <span>
                        <SwapIcon />
                    </span>
                    <div>
                        <span className={styles.landing}>
                            <LandingIcon />
                        </span>
                        <input
                            placeholder="Country, city or airport"
                            type="text"
                        />
                    </div>
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
