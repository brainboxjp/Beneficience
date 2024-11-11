import { Dialogs, Utils, Geolocation, getCurrentLocation } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { RouteProp } from '@react-navigation/core';
import { MainStackParamList } from "../../NavigationParamList";
import { LocationDisplay } from "../visit/LocationDisplay";
import { VisitTimer } from "../visit/VisitTimer";
import { TaskList } from "../visit/TaskList";

type VisitScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Visit">,
    route: RouteProp<MainStackParamList, "Visit">,
};

export function VisitScreen({ navigation, route }: VisitScreenProps) {
    const [location, setLocation] = React.useState<any>(null);
    const [startTime] = React.useState(new Date());

    React.useEffect(() => {
        enableLocationTracking();
    }, []);

    const enableLocationTracking = async () => {
        try {
            const hasPermission = await Geolocation.enableLocationRequest();
            if (hasPermission) {
                const loc = await getCurrentLocation({
                    desiredAccuracy: 3,
                    updateDistance: 10,
                    maximumAge: 20000,
                });
                setLocation(loc);
            }
        } catch (error) {
            Dialogs.alert("Unable to get location. Please ensure GPS is enabled.");
        }
    };

    const endVisit = async () => {
        const result = await Dialogs.confirm("Are you sure you want to end this visit?");
        if (result) {
            // TODO: Save visit data
            navigation.navigate("Dashboard", {});
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-xl font-bold mb-4">
                Visit #{route.params.visitId}
            </label>

            <LocationDisplay location={location} />
            <VisitTimer startTime={startTime} />
            <TaskList />

            <button
                className="btn p-4 w-3/4 rounded-lg bg-red-500 text-white font-bold mt-4"
                onTap={endVisit}
            >
                End Visit
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
});