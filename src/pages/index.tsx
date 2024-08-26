import { useState } from "react";
import { GetServerSideProps } from "next";
import { RadioChangeEvent, Radio } from "antd";
import styles from "@/pages/styles/index.module.css";

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

    const tripTypeChange = (e: RadioChangeEvent) => {
        setTripType(e.target.value);
    };
    const fareTypeChange = (e: RadioChangeEvent) => {
        setFareType(e.target.value);
    };

    return (
        <div style={{height: "200vh"}}>
            <h1>Flight Booking</h1>
            <div className={styles.search_card}>
                <div>
                    <Radio.Group value={tripType} onChange={tripTypeChange}>
                        <Radio.Button value="oneWay">One Way</Radio.Button>
                        <Radio.Button value="roundTrip">Round Trip</Radio.Button>
                    </Radio.Group>
                </div>
                <div>
                    <Radio.Group className={styles.radio_group} value={fareType} onChange={fareTypeChange}>
                        <Radio.Button className={styles.radio_btn} value="regular">Regular</Radio.Button>
                        <Radio.Button className={styles.radio_btn} value="seniorCitizen">Senior Citizen</Radio.Button>
                        <Radio.Button className={styles.radio_btn} value="student">Student</Radio.Button>
                        <Radio.Button className={styles.radio_btn} value="armedForces">Armed Forces</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};

export default FlightPage;
