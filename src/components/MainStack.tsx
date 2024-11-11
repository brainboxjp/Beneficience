import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "./screens/LoginScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { VisitScreen } from "./screens/VisitScreen";
import { ScheduleScreen } from "./screens/ScheduleScreen";
import { PatientsScreen } from "./screens/PatientsScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="Dashboard"
                component={DashboardScreen}
            />
            <StackNavigator.Screen
                name="Visit"
                component={VisitScreen}
                options={{
                    headerBackVisible: false,
                }}
            />
            <StackNavigator.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={{
                    title: "My Schedule"
                }}
            />
            <StackNavigator.Screen
                name="Patients"
                component={PatientsScreen}
                options={{
                    title: "Patient List"
                }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);