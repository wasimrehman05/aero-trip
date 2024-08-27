import React from "react";
import styles from "@/components/styles/Radio.module.css";

type DataEleType<T> = {
    label: string;
    value: T;
};

type RadioProps<T> = {
    getValue: T;
    setValue: (value: T) => void;
    data: DataEleType<T>[];
};

export const Radio = <T extends string | number | React.Key>({ getValue, setValue, data }: RadioProps<T>) => {
    const handChange = (e: React.MouseEvent<HTMLDivElement>) => {
        const value = e.currentTarget.getAttribute("data-value");
        if (value) {
            setValue(JSON.parse(value) as T);
        }
    };

    return (
        <div className={styles.radio_group}>
            {data.map((ele) => (
                <div
                    key={ele.value}
                    className={`${styles.radio_btn} ${ele.value === getValue ? styles.active : ""}`}
                    onClick={handChange}
                    data-value={JSON.stringify(ele.value)}
                >
                    {ele.label}
                </div>
            ))}
        </div>
    );
};
