import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';

const AboutUs = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={30} color={Colors.black} />
            </TouchableOpacity>
            <ScrollView >
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Text style={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ScrollView>
                <TouchableOpacity>
                    <Text style={styles.footerText}>Privacy Policy</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity>
                    <Text style={styles.footerText}>Terms & Conditions</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.white,
        paddingVertical: responsiveHeight(5),
        paddingHorizontal: responsiveWidth(3)
    },

    title: {
        fontSize: FontSize.FS20,
        fontWeight: FontsWeights.FW500,
        marginTop: responsiveHeight(3),
        color: Colors.black

    },
    paragraph: {
        fontSize: FontSize.FS13,
        lineHeight: responsiveFontSize(2.5),
        marginTop: responsiveHeight(2),
        color: Colors.gray,
    },

    footerText: {
        fontSize: FontSize.FS15,
        color: Colors.black,
        marginVertical: responsiveHeight(2),
    },
    divider: {
        height: 1.5,
        backgroundColor: Colors.lightgrey,
    }
});

export default AboutUs;
