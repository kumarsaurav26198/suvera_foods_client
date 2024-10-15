import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import { RightIcon } from '../../Assets/svg';

const Notification = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={30} color={Colors.black} />
            </TouchableOpacity>
            <ScrollView>
                <Text style={styles.title}>Promos and offers</Text>
                <View style={styles.fieldContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Push Notification ON</Text>
                        <Text style={styles.textDes}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Text>
                    </View>
                    <View style={styles.switchContainer}>
                        <RightIcon style={styles.icon} />
                        <Switch
                            trackColor={{ false: Colors.gray, true: Colors.black }}
                            thumbColor={Colors.white}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={styles.switch}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: responsiveHeight(5),
        paddingHorizontal: responsiveWidth(3),
    },
    title: {
        fontSize: FontSize.FS17,
        fontWeight: FontsWeights.FW500,
        marginTop: responsiveHeight(3),
        color: Colors.black,
    },
    textTitle: {
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW500,
        color: Colors.black,
    },
    textDes: {
        fontSize: FontSize.FS13,
        fontWeight: FontsWeights.FW500,
        color: Colors.gray,
    },
    textContainer: {
        width: '80%',
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 26,
        borderRadius: 15,
        borderColor: Colors.gray,
    },
    switchContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    icon: {
        marginLeft: 30, 
        position:"absolute",
        zIndex:2
    },
    switch: {
        marginHorizontal: 18,
    },
});

export default Notification;
