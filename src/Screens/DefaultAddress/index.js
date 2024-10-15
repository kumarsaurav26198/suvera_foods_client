import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Themes/Colors';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import images from '../../Themes/Images';
import { DeletIcon } from '../../Assets/svg';
import AppHeader from '../../Components/AppComponent/AppHeader';
import C_Button from '../../Components/C_Button';
import { connect } from 'react-redux';
import { FontSize, FontsWeights } from '../../Themes/Fonts';

function DefaultAddress({ navigation, userLocationRes }) {
  const [addresses, setAddresses] = useState(userLocationRes);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    label: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    pinCode: '',
    primaryAddress: false,
  });

  const handleEdit = address => {
    setEditingAddress(address);
    setModalVisible(true);
  };

  const handleDelete = id => {
    setAddresses(addresses.filter(address => address._id !== id));
  };

  const handleSave = () => {
    if (editingAddress) {
      setAddresses(
        addresses.map(address =>
          address._id === editingAddress._id ? editingAddress : address,
        ),
      );
      setModalVisible(false);
      setEditingAddress(null);
    }
  };

  const handleAddNewAddress = () => {
    
    // const newId = Date.now().toString();
    // setAddresses([...addresses, { ...newAddress, _id: newId }]);
    // setAddModalVisible(false);
    // setNewAddress({
    //   label: '',
    //   addressLine1: '',
    //   addressLine2: '',
    //   city: '',
    //   pinCode: '',
    //   primaryAddress: false,
    // });
  };

  const renderAddressItem = ({ item }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressInfo}>
        <Image source={images.map} style={styles.addressImage} />
        <View style={styles.addressText}>
          <Text style={styles.addressType}>{item.label || 'Address'}</Text>
          <Text style={styles.addressDetails}>
            {`${item.addressLine1}, ${item.addressLine2}, ${item.city}, ${item.pinCode}`}
          </Text>
        </View>
      </View>
      <View style={styles.addressActions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <MaterialIcons
            name="edit"
            size={responsiveHeight(3)}
            color={Colors.darkgrey}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <DeletIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader text="Address" />
      <View style={styles.listsContainer}>
        <FlatList
          data={[1]}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            return (
              <>
                <View>
                  {addresses.filter(address => address.primaryAddress) && (
                    <Text style={styles.title}>Default Address</Text>
                  )}
                  <FlatList
                    data={addresses.filter(address => address.primaryAddress)}
                    renderItem={renderAddressItem}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.emptyTitle}>No primary address</Text>}
                  />
                </View>
                <View>
                  <FlatList
                    data={addresses.filter(address => !address.primaryAddress)}
                    ListHeaderComponent={   <Text style={styles.title}>Other Addresses</Text>}
                    renderItem={renderAddressItem}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.emptyTitle}>No any other address</Text>}
                  />
                </View>
              </>
            );
          }}
          ListFooterComponent={<View style={{ height: 180 }} />}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Icon name="cross" size={35} color={Colors.black} />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Edit Address</Text>
            <TextInput
              style={styles.input}
              value={editingAddress?.label}
              onChangeText={text =>
                setEditingAddress(prev => (prev ? { ...prev, label: text } : null))
              }
              placeholder="Address Label"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={editingAddress?.addressLine1}
              onChangeText={text =>
                setEditingAddress(prev =>
                  prev ? { ...prev, addressLine1: text } : null,
                )
              }
              placeholder="Address Line 1"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={editingAddress?.addressLine2}
              onChangeText={text =>
                setEditingAddress(prev =>
                  prev ? { ...prev, addressLine2: text } : null,
                )
              }
              placeholder="Address Line 2"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={editingAddress?.city}
              onChangeText={text =>
                setEditingAddress(prev => (prev ? { ...prev, city: text } : null))
              }
              placeholder="City"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={editingAddress?.pinCode}
              onChangeText={text =>
                setEditingAddress(prev => (prev ? { ...prev, pinCode: text } : null))
              }
              placeholder="Pin Code"
              keyboardType="numeric"
              placeholderTextColor={"gray"}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}>
        <View style={styles.modalContainerAdd}>
          <View style={styles.modalContentAdd}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAddModalVisible(false)}>
              <Icon name="cross" size={35} color={Colors.black} />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Add New Address</Text>
            <TextInput
              style={styles.input}
              value={newAddress.label}
              onChangeText={text =>
                setNewAddress(prev => ({ ...prev, label: text }))
              }
              placeholder="Address Label"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={newAddress.addressLine1}
              onChangeText={text =>
                setNewAddress(prev => ({ ...prev, addressLine1: text }))
              }
              placeholder="Address Line 1"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={newAddress.addressLine2}
              onChangeText={text =>
                setNewAddress(prev => ({ ...prev, addressLine2: text }))
              }
              placeholder="Address Line 2"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={newAddress.city}
              onChangeText={text =>
                setNewAddress(prev => ({ ...prev, city: text }))
              }
              placeholder="City"
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={styles.input}
              value={newAddress.pinCode}
              onChangeText={text =>
                setNewAddress(prev => ({ ...prev, pinCode: text }))
              }
              placeholder="Pin Code"
              keyboardType="numeric"
              placeholderTextColor={"gray"}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddNewAddress}>
              <Text style={styles.saveButtonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomContainer}>
        <C_Button
          title="+ Add New Address"
          backgroundColor={Colors.black}
          text_color={Colors.white}
          onPress={() => setAddModalVisible(true)}
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  userLocationRes: state.userLocationReducers?.address || [],
});

export default connect(mapStateToProps)(DefaultAddress);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: FontSize.FS17,
    fontWeight: FontsWeights.FW500,
    marginVertical: 10,
    color: Colors.black,
  },
  emptyTitle: {
    fontSize: FontSize.FS14,
    marginVertical: 10,
    color: Colors.black,
    alignSelf:"center",
    marginVertical:50
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressImage: {
    width: responsiveWidth(8),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  addressText: {
    marginLeft: 12,
    flexShrink: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#000"
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    flexWrap: 'wrap',
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(15),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainerAdd: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  modalContentAdd: {
    backgroundColor: '#fff',
    padding: 30,
    // borderRadius: 8,
    width: '100%',
    position: "absolute",
    bottom: 0
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    color:"#000"
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});