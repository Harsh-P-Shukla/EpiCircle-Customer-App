import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const STATUS_MAP = {
  Pending: { color: '#a0aec0', icon: 'clock-outline', label: 'Pending' },
  Accepted: { color: '#4299e1', icon: 'check-circle-outline', label: 'Accepted' },
  'In-Process': { color: '#ed8936', icon: 'progress-clock', label: 'In-Process' },
  'Pending for Approval': { color: '#9f7aea', icon: 'account-question-outline', label: 'Approval' },
  Completed: { color: '#48bb78', icon: 'check-bold', label: 'Completed' },
};

const StatusBadge = ({ status }) => {
  const { color, icon, label } = STATUS_MAP[status] || STATUS_MAP['Pending'];
  return (
    <View style={[styles.badge, { backgroundColor: color + '22' }]}> {/* 22 = ~13% opacity */}
      <Icon name={icon} size={16} color={color} style={{ marginRight: 4 }} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 2,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default StatusBadge; 