import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/components/styles/SideBar.module.css";
import { OfferIcon, FlightIcon, TripIcon, SupportIcon } from "@/icons";

export const SideBar: React.FC = () => {
    const router = useRouter();

    return (
        <aside className={styles.sidebar}>
            <ul>
                <li className={router.pathname === "/" ? styles.active : undefined}>
                    <FlightIcon />
                    <Link href={"/"}>Fights</Link>
                </li>
                <li className={router.pathname === "/offers" ? styles.active : undefined}>
                    <OfferIcon />
                    <Link href={"/offers"}>Offers</Link>
                </li>
                <li className={router.pathname === "/my-trips" ? styles.active : undefined}>
                    <TripIcon />
                    <Link href={"/my-trips"}>My Trips</Link>
                </li>
                <li className={router.pathname === "/support" ? styles.active : undefined}>
                    <SupportIcon />
                    <Link href={"/support"}>Support</Link>
                </li>
            </ul>
        </aside>
    );
};
