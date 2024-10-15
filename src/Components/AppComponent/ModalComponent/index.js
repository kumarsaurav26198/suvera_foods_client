import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../../Themes/Colors';
import { FontSize, FontsWeights } from '../../../Themes/Fonts';

const ModalComponent = ({ 
    visible, 
    onClose, 
    value, 
    onChangeText, 
    placeholder, 
    secureTextEntry, 
    title, 
    secondValue, 
    setSecondValue,
    errors,
    onPressCross,
    loading
}) => {
    // State to manage visibility of the password input field
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSecondPasswordVisible, setIsSecondPasswordVisible] = useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={onPressCross}>
                        <Icon name="cross" size={35} color={Colors.black} />
                    </TouchableOpacity>
                    {title && <Text style={styles.modalTitle}>{title}</Text>}

                    {/* Main password input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={placeholder}
                            value={value}
                            onChangeText={onChangeText}
                            style={styles.modalInput}
                            secureTextEntry={secureTextEntry && !isPasswordVisible}
                            placeholderTextColor={Colors.gray}
                        />
                        {secureTextEntry && (
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <Icon
                                    name={isPasswordVisible ? 'eye-with-line' : 'eye'}
                                    size={22}
                                    color={Colors.gray}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Confirm password input */}
                    {/* {secondValue !== undefined && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Confirm Password"
                                value={secondValue}
                                onChangeText={setSecondValue}
                                style={styles.modalInput}
                                secureTextEntry={secureTextEntry && !isSecondPasswordVisible}
                                placeholderTextColor={Colors.gray}
                            />
                            {secureTextEntry && (
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setIsSecondPasswordVisible(!isSecondPasswordVisible)}
                                >
                                    <Icon
                                        name={isSecondPasswordVisible ? 'eye-with-line' : 'eye'}
                                        size={22}
                                        color={Colors.gray}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )} */}

                    {/* Save button */}
                    {errors && (
                <Text style={styles.errorText}>{errors}</Text>
              )}
                    <TouchableOpacity style={styles.saveButton} onPress={onClose}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: responsiveWidth(90),
        backgroundColor: Colors.white,
        borderRadius: 8,
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(3),
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    modalTitle: {
        fontSize: FontSize.FS20,
        fontWeight: FontsWeights.FW400,
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
        color: Colors.black,
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    modalInput: {
        borderRadius: 8,
        marginVertical: responsiveHeight(2.5),
        borderWidth: 1,
        borderColor: Colors.darkgrey,
        height: responsiveHeight(7),
        fontSize: FontSize.FS17,
        paddingLeft: responsiveWidth(3),
        color: Colors.black,
    },
    eyeIcon: {
        position: 'absolute',
        right: responsiveWidth(3),
        // top: responsiveHeight(2.5),
    },
    saveButton: {
        backgroundColor: Colors.black,
        borderRadius: 8,
        padding: responsiveHeight(2),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: responsiveHeight(4),
    },
    saveButtonText: {
        color: Colors.white,
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW600,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        // marginTop: 5,
        marginBottom: 15,
        fontWeight:FontsWeights.FW600
      },
});

export default ModalComponent;
