import * as React from "react";
import { StyleSheet } from "react-nativescript";

type SearchBarProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export function SearchBar({ value, onValueChange }: SearchBarProps) {
    return (
        <gridLayout columns="*" className="p-4 bg-white">
            <textField
                hint="Search patients..."
                text={value}
                onTextChange={(e) => onValueChange(e.value)}
                className="p-2 bg-gray-100 rounded-lg"
            />
        </gridLayout>
    );
}