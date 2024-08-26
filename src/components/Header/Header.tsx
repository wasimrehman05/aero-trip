"use client";

import React from "react";
import styles from "@/components/Header/Header.module.css";
import { Button } from "../Button/Button";

export const Header: React.FC = (img) => {
    const clicked = () => {
        console.log("clicked");
    };

    return (
        <nav className={styles.nav}>
            <a href="/">
                <img src="/logo.png" alt="Logo" />
                <img src="/logo_v2.png" alt="Aero Trip" />
            </a>
            <div>
                <Button text="Log in / Sign up" callback={clicked} />
            </div>
        </nav>
    );
};
