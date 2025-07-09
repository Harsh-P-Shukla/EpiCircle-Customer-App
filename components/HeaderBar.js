import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HeaderBar = ({ title, subtitle, children, style }) => (
  <LinearGradient
    colors={["#e0f7fa", "#2ec492"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.header, style]}
  >
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12,
    shadowColor: '#2ec492',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 2,
  },
  content: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a3c34',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#1a3c34',
    opacity: 0.7,
  },
});

export default HeaderBar; 