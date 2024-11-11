import * as React from "react";
import { StyleSheet } from "react-nativescript";

type VisitTimerProps = {
    startTime: Date;
};

export function VisitTimer({ startTime }: VisitTimerProps) {
    const [duration, setDuration] = React.useState("00:00:00");

    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now.getTime() - startTime.getTime();
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            
            setDuration(
                `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <stackLayout className="w-full bg-white p-4 rounded-lg mb-4">
            <label className="font-bold mb-2">Visit Duration:</label>
            <label className="text-xl text-center">{duration}</label>
        </stackLayout>
    );
}