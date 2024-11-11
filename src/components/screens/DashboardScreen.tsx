import { Dialogs } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type DashboardScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Dashboard">,
};

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const startVisit = () => {
        navigation.navigate("Visit", { visitId: Date.now().toString() });
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-8 font-bold text-center">
                Caregiver Dashboard
            </label>

            <gridLayout rows="auto, auto" columns="*, *" className="w-full p-4 gap-4">
                <button
                    row={0}
                    col={0}
                    className="btn p-6 rounded-lg bg-green-500 text-white"
                    onTap={startVisit}
                >
                    Start Visit
                </button>

                <button
                    row={0}
                    col={1}
                    className="btn p-6 rounded-lg bg-blue-500 text-white"
                    onTap={() => navigation.navigate("Schedule", {})}
                >
                    Schedule
                </button>

                <button
                    row={1}
                    col={0}
                    className="btn p-6 rounded-lg bg-purple-500 text-white"
                    onTap={() => navigation.navigate("Patients", {})}
                >
                    Patients
                </button>

                <button
                    row={1}
                    col={1}
                    className="btn p-6 rounded-lg bg-orange-500 text-white"
                    onTap={() => Dialogs.alert("Coming soon!")}
                >
                    Reports
                </button>
            </gridLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
});