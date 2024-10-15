import React, { useRef, useState, useEffect } from "react";
import { View, Pressable, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import Colors from "../Themes/Colors";
import { FontSize, FontsWeights } from "../Themes/Fonts";

const OTP_Input = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef(null);
    const [ isInputBoxFocused, setIsInputBoxFocused ] = useState(false);

    const handleOnPress = () => {
        setIsInputBoxFocused(true);
        inputRef.current?.focus();
    };

    const handleOnBlur = () => {
        setIsInputBoxFocused(false);
    };

    useEffect(() => {
        setIsPinReady(code.length === maximumLength);
        if (code.length === maximumLength)
        {
            Keyboard.dismiss();
        }
        return () => {
            setIsPinReady(false);
        };
    }, [ code, setIsPinReady ]);

    const boxDigit = (_, index) => {
        const digit = code[ index ] || "";
        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;
        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);
        return (
            <View
                style={[ styles.splitBoxes, isInputBoxFocused && isValueFocused && styles.splitBoxesFocused]}
                key={index}
            >
                <Text style={styles.splitBoxText}>{digit}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={handleOnPress} style={styles.splitBoxesContainer}>
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                ref={inputRef}
                onBlur={handleOnBlur}
                style={styles.hiddenInput}
            />
        </View>
    );
};
export default OTP_Input;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 35
    },
    splitBoxesContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-evenly",
    },
    splitBoxes: {
        width: 45,
        height: 60,
        backgroundColor: Colors.inputFieldBg,
        marginHorizontal: 2,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 4,
        borderRadius: 10,
    },
    splitBoxText: {
        fontSize: FontSize.FS28,
        textAlign: "center",
        color: Colors.black,
        fontWeight: FontsWeights.FW500,
    },
    splitBoxesFocused: {
        transform: [ { scale: 1.05 } ],
        borderColor: Colors.gray,
        backgroundColor: Colors.white,
        borderColor: Colors.gray,
        borderWidth: 1.5,
    },
    hiddenInput: {
        position: "absolute",
        opacity: 0,
    },
});
