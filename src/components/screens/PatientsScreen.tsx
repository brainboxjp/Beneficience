import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { PatientList } from "../patients/PatientList";
import { SearchBar } from "../patients/SearchBar";

type PatientsScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Patients">,
};

export function PatientsScreen({ navigation }: PatientsScreenProps) {
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <flexboxLayout style={styles.container}>
            <SearchBar 
                value={searchQuery}
                onValueChange={setSearchQuery}
            />
            <PatientList 
                searchQuery={searchQuery}
                onPatientPress={(patientId) => {
                    // TODO: Navigate to patient details
                }}
            />
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
    },
});