import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import FaqComp from '../../Components/AppComponent/FaqComp';
import C_Button from '../../Components/C_Button';

const SupportFAQ = ({ navigation }) => {
    const faqData = [
        {
            header: 'How are delivery orders assigned to me?',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
        {
            header: 'How are delivery orders assigned to me?',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
        {
            header: 'How are delivery orders assigned to me?',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
        {
            header: 'How are delivery orders assigned to me?',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
        {
            header: 'How are delivery orders assigned to me?',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
        {
            header: 'How to create id?',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
        {
            header: 'Refund',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
        {
            header: 'Organizer id?',
            title:
                'Wave is a financial service app that allows you to manage your finances seamlessly.',
        },
    ];
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={30} color={Colors.black} />
            </TouchableOpacity>
            <FlatList
                data={faqData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (<FaqComp {...item} />);
                }}
                ListHeaderComponent={<Text style={styles.title}>Support & FAQ</Text>}
            />
            <View style={styles.bottomView}>
                <C_Button
                    title="Submit your query"
                    backgroundColor={Colors.white}
                    text_color={Colors.black}
                    borderColor={Colors.black}
                    // onPress={() => { navigation.navigate("SavedAddresses"); }}
                />
                <C_Button
                    title="Contact Team"
                    backgroundColor={Colors.black}
                    text_color={Colors.white}
                    // onPress={() => { navigation.navigate("SavedAddresses"); }}
                />
            </View>
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
        marginBottom: responsiveHeight(2),
        color: Colors.black,
    },
    bottomView: {
        paddingVertical: 15,
        // paddingHorizontal: 20,
        borderTopColor: Colors.gray,
    },
});

export default SupportFAQ;
