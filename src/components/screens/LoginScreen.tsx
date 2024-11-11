import { Dialogs } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type LoginScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        // TODO: Implement actual authentication
        if (username && password) {
            navigation.navigate("Dashboard", {});
        } else {
            Dialogs.alert("Please enter both username and password");
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-8 font-bold text-center">
                EVV Login
            </label>
            
            <textField
                className="input mb-4 p-4 w-3/4 rounded-lg bg-white"
                hint="Username"
                text={username}
                onTextChange={(e) => setUsername(e.value)}
                secure={false}
            />
            
            <textField
                className="input mb-6 p-4 w-3/4 rounded-lg bg-white"
                hint="Password"
                text={password}
                onTextChange={(e) => setPassword(e.value)}
                secure={true}
            />

            <button
                className="btn p-4 w-3/4 rounded-lg bg-blue-500 text-white font-bold"
                onTap={handleLogin}
            >
                Login
            </button>
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