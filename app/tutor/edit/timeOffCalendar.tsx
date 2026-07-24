"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { setTutorTimeOff } from "@/lib/actions";
import {isSameDay} from 'date-fns';
type Props = {
    onChange?: (dates: Date[]) => void;
    initialDates?: Date[];
    tutorId?: number;
};

/* function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return disabledDates.find(dDate => isSameDay(dDate, date));
    }
  } */

export default function TimeOffCalendar({ initialDates = [], onChange, tutorId }: Props) {
    function parseMySQLDateAsLocal(dateString: string) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const normalizedInitialDates: Date[] = Array.isArray(initialDates)
        ? initialDates.map(d =>
            d instanceof Date ? d : parseMySQLDateAsLocal(d as string)
        )
        : [];

    const [selectedDates, setSelectedDates] = useState<Date[]>(
        normalizedInitialDates.sort((a, b) => a.getTime() - b.getTime())
    );

    // Dates that should be disabled in the calendar
    const disabledDays = normalizedInitialDates.map(d =>
        d.toISOString().split("T")[0]
    );

    const tileDisabled = ({ date }: { date: Date }) => {
        const iso = date.toISOString().split("T")[0];
        return disabledDays.includes(iso);
    };

    const handleSelect = (date: Date | Date[]) => {
        let newDates: Date[] = Array.isArray(date) ? date : [date];

        // merge with existing selectedDates (avoid duplicates)
        const merged = [...selectedDates];
        newDates.forEach(d => {
            if (!merged.some(sd => sd.toDateString() === d.toDateString())) {
                merged.push(d);
            }
        });

        // sort ascending
        const sorted = merged.sort((a, b) => a.getTime() - b.getTime());

        setSelectedDates(sorted);
        if (onChange) onChange(sorted);
    };

    const removeDate = (date: Date) => {
        const filtered = selectedDates.filter(d => d.toDateString() !== date.toDateString());
        setSelectedDates(filtered);
        if (onChange) onChange(filtered);
    };

    function handleSave() {
        // setTutorTimeOff(selectedDates, tutorId!);
    }

    return (
        <div className="mt-4">
            <h1 className="font-semibold mb-4">Manage time off</h1>
            <Calendar
                onClickDay={handleSelect}
                selectRange={false}
                minDate={new Date()}
                tileDisabled={tileDisabled}
                className="mb-4"
            />

            {selectedDates.length > 0 ? (
                <div className="mt-4">
                    <h3 className="font-semibold">Days off</h3>

                    <ul className="mt-2">

                        {selectedDates.map(date => (
                            <li key={date.toISOString()} className="mb-4 w-50 flex justify-between items-center gap-2 border border-gray-400 rounded p-4">
                                <span>{date.toISOString().split('T')[0]}</span>
                                <button
                                    type="button"
                                    onClick={() => removeDate(date)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    <X />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : <span className="font-semibold">No days off.</span>}
            <button onClick={handleSave} className="block mt-4 bg-blue-600 text-gray-100 rounded px-6 py-2">
                Save
            </button>
        </div>
    );
}
