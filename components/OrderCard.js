import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBadge from './StatusBadge';
import CustomCard from './CustomCard';

const OrderCard = ({ pickup }) => {
  return (
    <CustomCard style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <View style={styles.metaRow}>
            <Icon name="calendar" size={16} color="#38A169" style={{ marginRight: 6 }} />
            <Text style={styles.date}>{formatDate(pickup.date)} • {pickup.timeSlot}</Text>
          </View>
          <View style={styles.metaRow}>
            <Icon name="map-marker" size={16} color="#4299e1" style={{ marginRight: 6 }} />
            <Text style={styles.address} numberOfLines={1}>{pickup.address}</Text>
          </View>
        </View>
        <StatusBadge status={pickup.status} />
      </View>
      {pickup.pickupCode && (
        <View style={styles.codeRow}>
          <Icon name="barcode" size={15} color="#38A169" style={{ marginRight: 4 }} />
          <Text style={styles.codeLabel}>Pickup Code:</Text>
          <Text style={styles.code}>{pickup.pickupCode}</Text>
        </View>
      )}
      {pickup.totalAmount && (
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Total:</Text>
          <Text style={styles.amount}>₹{pickup.totalAmount}</Text>
        </View>
      )}
    </CustomCard>
  );
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    minHeight: 80,
    maxHeight: 170,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  date: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  address: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  codeLabel: {
    fontSize: 13,
    color: '#888',
    marginRight: 4,
  },
  code: {
    fontSize: 14,
    color: '#38A169',
    fontWeight: 'bold',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  amountLabel: {
    fontSize: 13,
    color: '#888',
    marginRight: 4,
  },
  amount: {
    fontSize: 15,
    color: '#38A169',
    fontWeight: 'bold',
  },
});

export default OrderCard; 