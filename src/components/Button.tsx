import React from "react";
import styles from "@/components/styles/Button.module.css";

interface ButtonProps {
    text: string;
    callback?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, callback }) => {
    return (
        <button className={styles.button} onClick={callback}>
            {text}
        </button>
    );
};
