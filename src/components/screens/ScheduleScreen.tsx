import { Dialogs } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ScheduleList } from "../schedule/ScheduleList";
import { DateSelector } from "../schedule/DateSelector";

type ScheduleScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Schedule">,
};

export function ScheduleScreen({ navigation }: ScheduleScreenProps) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    return (
        <flexboxLayout style={styles.container}>
            <DateSelector 
                selectedDate={selectedDate} 
                onDateChange={setSelectedDate}
            />
            <ScheduleList 
                date={selectedDate}
                onVisitPress={(visitId) => navigation.navigate("Visit", { visitId })}
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