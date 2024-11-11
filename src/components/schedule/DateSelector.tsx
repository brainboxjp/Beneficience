import * as React from "react";
import { StyleSheet } from "react-nativescript";

type DateSelectorProps = {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
};

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    const changeDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        onDateChange(newDate);
    };

    return (
        <gridLayout columns="auto, *, auto" className="p-4 bg-white">
            <button
                col={0}
                className="text-blue-500 font-bold px-4"
                onTap={() => changeDate(-1)}
            >
                ←
            </button>
            
            <label col={1} className="text-lg font-semibold text-center">
                {formatDate(selectedDate)}
            </label>
            
            <button
                col={2}
                className="text-blue-500 font-bold px-4"
                onTap={() => changeDate(1)}
            >
                →
            </button>
        </gridLayout>
    );
}