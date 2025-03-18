import {Keyboard, Platform, TouchableWithoutFeedback, View, ViewProps} from 'react-native';
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";

interface KeyboardDismissWrapperProps extends ViewProps {
    children: React.ReactNode;
}

const KeyboardDismissWrapper: React.FC<KeyboardDismissWrapperProps> = ({children, ...props}) => {
    if (Platform.OS === 'web') {
        return <View {...props}>{children}</View>; // No keyboard dismiss on desktop
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView {...props}>{children}</SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default KeyboardDismissWrapper;
