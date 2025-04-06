import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    type: string;
    date: Date | null;
    setDate: (date: Date | null) => void;
    isDisable: boolean;
    otherDate: Date | null;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    type,
    date,
    setDate,
    isDisable,
    otherDate,
}) => {
    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
        } else {
            setDate(null);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={isDisable}
                    variant={"outline"}
                    className={cn(
                        "w-[350px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>{type}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(_date) =>
                        type === "Oneway" ? _date.getTime() < new Date().setHours(0, 0, 0, 0)
                            : otherDate ? _date.getTime() < otherDate.getTime()
                                : false
                    }
                />
            </PopoverContent>
        </Popover>
    );
};
