import React from "react";
import { Button } from "@/components/ui/button";
import { TravelingType, ClassType } from "@/pages/index" 
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

export const DialogBox: React.FC<DialogBoxProps> = ({ dialogValue, setDialogValue }) => {
    const [displayText, setDisplayText] = React.useState("1 Adult, Economy");

    const setClass = (value: ClassType) => {
        setDialogValue({ ...dialogValue, class: value });
    };

    const updateTraveller = (
        value: number,
        key: keyof Omit<TravelingType, "class">
    ) => {
        setDialogValue({ ...dialogValue, [key]: value });
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
                    </div>
                    <div className="text-xl">
                        <input
                            className="bg-white border border-black text-center pl-1 rounded"
                            type="number"
                            value={dialogValue.adults}
                            onChange={(e) => updateTraveller( parseInt(e.target.value), "adults")}
                            min={1}
                            max={9}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p>Children</p>
                        <DialogDescription>2 - 12 yrs</DialogDescription>
                    </div>
                    <div className="text-xl">
                        <input
                            className="bg-white border border-black text-center pl-1 rounded"
                            type="number"
                            value={dialogValue.children}
                            onChange={(e) => updateTraveller( parseInt(e.target.value), "children")}
                            min={0}
                            max={7}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p>Infants</p>
                        <DialogDescription>Below 2 yrs</DialogDescription>
                    </div>
                    <div className="text-xl">
                        <input
                            className="bg-white border border-black text-center pl-1 rounded"
                            type="number"
                            value={dialogValue.infants}
                            onChange={(e) => updateTraveller( parseInt(e.target.value), "infants")}
                            min={0}
                            max={2}
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
