import React from "react";
import { Button } from "@/components/ui/button";
import { TravelingType, ClassType } from "@/pages/index";
import {
    Dialog,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Radio } from "./Radio";

interface DialogBoxProps {
    dialogValue: TravelingType;
    setDialogValue: (value: TravelingType) => void;
}

// Define traveler constraints in a single place
const TRAVELER_CONSTRAINTS = {
    adults: {
        min: 1,
        max: 9,
        errorMin: "Minimum 1 adult required",
        errorMax: "Maximum 9 adults allowed",
    },
    children: {
        min: 0,
        max: 7,
        errorMin: "Children cannot be negative",
        errorMax: "Maximum 7 children allowed",
    },
    infants: {
        min: 0,
        max: 2,
        errorMin: "Infants cannot be negative",
        errorMax: "Maximum 2 infants allowed",
    },
};

export const DialogBox: React.FC<DialogBoxProps> = ({
    dialogValue,
    setDialogValue,
}) => {
    const [displayText, setDisplayText] = React.useState("1 Adult, Economy");
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const setClass = (value: ClassType) => {
        setDialogValue({ ...dialogValue, class: value });
    };

    const updateTraveller = (
        value: number,
        key: keyof Omit<TravelingType, "class">
    ) => {
        // Clear any previous errors for this field
        setErrors((prev) => ({ ...prev, [key]: "" }));

        // Get constraints for this traveler type
        const constraints = TRAVELER_CONSTRAINTS[key];

        // Validate the input
        let validatedValue = value;
        let errorMessage = "";

        if (value < constraints.min) {
            validatedValue = constraints.min;
            errorMessage = constraints.errorMin;
        } else if (value > constraints.max) {
            validatedValue = constraints.max;
            errorMessage = constraints.errorMax;
        }

        // Set error message if validation failed
        if (errorMessage) {
            setErrors((prev) => ({ ...prev, [key]: errorMessage }));
        }

        setDialogValue({ ...dialogValue, [key]: validatedValue });
    };

    React.useEffect(() => {
        let text = "";

        text += `${
            dialogValue.adults > 1
                ? dialogValue.adults + " Adults, "
                : "1 Adult, "
        }`;
        text += `${
            dialogValue.children === 0
                ? ""
                : dialogValue.children > 1
                ? dialogValue.children + " children, "
                : "1 Child, "
        }`;
        text += `${
            dialogValue.infants === 0
                ? ""
                : dialogValue.infants > 1
                ? dialogValue.infants + " Infants, "
                : "1 Infant, "
        }`;
        text += dialogValue.class;

        setDisplayText(text);
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="h-9">
                    {displayText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px] py-9">
                <DialogTitle>Update Traveller and Class</DialogTitle>
                <div className="flex justify-between items-center">
                    <div>
                        <p>Adults</p>
                        <DialogDescription>12+ years</DialogDescription>
                        {errors.adults && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.adults}
                            </p>
                        )}
                    </div>
                    <div className="text-xl">
                        <input
                            className={`bg-white border ${
                                errors.adults
                                    ? "border-red-500"
                                    : "border-black"
                            } text-center pl-1 rounded pointer-events-none`}
                            type="number"
                            value={dialogValue.adults}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                updateTraveller(value, "adults");
                            }}
                            min={TRAVELER_CONSTRAINTS.adults.min}
                            max={TRAVELER_CONSTRAINTS.adults.max}
                            
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p>Children</p>
                        <DialogDescription>2 - 12 yrs</DialogDescription>
                        {errors.children && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.children}
                            </p>
                        )}
                    </div>
                    <div className="text-xl">
                        <input
                            className={`bg-white border ${
                                errors.children
                                    ? "border-red-500"
                                    : "border-black"
                            } text-center pl-1 rounded pointer-events-none`}
                            type="number"
                            value={dialogValue.children}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                updateTraveller(value, "children");
                            }}
                            min={TRAVELER_CONSTRAINTS.children.min}
                            max={TRAVELER_CONSTRAINTS.children.max}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p>Infants</p>
                        <DialogDescription>Below 2 yrs</DialogDescription>
                        {errors.infants && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.infants}
                            </p>
                        )}
                    </div>
                    <div className="text-xl">
                        <input
                            className={`bg-white border ${
                                errors.infants
                                    ? "border-red-500"
                                    : "border-black"
                            } text-center pl-1 rounded pointer-events-none`}
                            type="number"
                            value={dialogValue.infants}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                updateTraveller(value, "infants");
                            }}
                            min={TRAVELER_CONSTRAINTS.infants.min}
                            max={TRAVELER_CONSTRAINTS.infants.max}
                        />
                    </div>
                </div>
                <Radio<ClassType>
                    getValue={dialogValue.class}
                    setValue={setClass}
                    data={[
                        { value: "economy", label: "Economy" },
                        { value: "premium economy", label: "Premium Economy" },
                        { value: "business class", label: "Business Class" },
                        { value: "first class", label: "First Class" },
                    ]}
                />
            </DialogContent>
        </Dialog>
    );
};
