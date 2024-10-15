import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderHeader({ orderId, orderDate, orderTime }) {
  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order ID: {orderId}</Text>
      <Text style={styles.orderDateTime}>
        {orderDate} {orderTime}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDateTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});