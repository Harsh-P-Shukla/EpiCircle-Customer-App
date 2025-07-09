import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { usePickup } from '../contexts/PickupContext';
import HeaderBar from '../components/HeaderBar';
import PrimaryButton from '../components/PrimaryButton';
import CustomCard from '../components/CustomCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = usePickup();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async () => {
    setError('');
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.navigate('OTP', { phoneNumber });
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <HeaderBar
        title="Welcome to EpiCircle"
        subtitle="Enter your phone number to get started"
        style={{ paddingTop: 64, paddingBottom: 32 }}
      >
        <View style={styles.logoCircle}>
          <Icon name="recycle" size={44} color="#2ec492" />
        </View>
      </HeaderBar>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <CustomCard style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Icon name="cellphone" size={22} color="#b0b0b0" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.input}
                  placeholder="10-digit phone number"
                  placeholderTextColor="#b0b0b0"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoFocus
                  returnKeyType="done"
                />
              </View>
              <ErrorMessage message={error} />
            </View>
            <PrimaryButton
              title={isLoading ? 'Sending OTP...' : 'Send OTP'}
              icon="send"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={{ marginTop: 8 }}
            />
            <Text style={styles.terms}>
              By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </CustomCard>
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading && <LoadingSpinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
    shadowColor: '#2ec492',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  card: {
    marginTop: 24,
    marginBottom: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a3c34',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f8f7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#1a3c34',
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  terms: {
    fontSize: 12,
    color: '#7a8d8a',
    marginTop: 18,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#2ec492',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen; 