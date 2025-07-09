import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) =>
  message ? <Text style={styles.error}>{message}</Text> : null;

const styles = StyleSheet.create({
  error: {
    color: '#e53e3e',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'left',
    fontWeight: '500',
  },
});

export default ErrorMessage; 