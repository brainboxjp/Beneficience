import * as React from "react";
import { StyleSheet } from "react-nativescript";

type LocationDisplayProps = {
    location: any;
};

export function LocationDisplay({ location }: LocationDisplayProps) {
    if (!location) {
        return (
            <label className="text-gray-500 mb-4">
                Acquiring location...
            </label>
        );
    }

    return (
        <stackLayout className="w-full bg-white p-4 rounded-lg mb-4">
            <label className="font-bold mb-2">Current Location:</label>
            <label className="text-sm">
                Latitude: {location.latitude.toFixed(6)}
            </label>
            <label className="text-sm">
                Longitude: {location.longitude.toFixed(6)}
            </label>
            <label className="text-sm">
                Accuracy: ±{location.accuracy.toFixed(1)}m
            </label>
        </stackLayout>
    );
}