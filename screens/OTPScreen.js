// OTPScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { usePickup } from '../contexts/PickupContext';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../components/PrimaryButton';

const OTP_LENGTH = 6;
const OTP_MOCK = '123456';
const RESEND_SECONDS = 30;

const OtpInput = React.forwardRef(({ value, onChange, onFocus, onKeyPress, isFocused }, ref) => (
  <View style={[styles.otpBox, isFocused && styles.otpBoxFocused]}>
    <TextInput
      ref={ref}
      style={styles.otpInput}
      value={value}
      onChangeText={onChange}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      keyboardType="number-pad"
      maxLength={1}
      textAlign="center"
      secureTextEntry={false}
      autoFocus={isFocused}
      selectionColor="#38A169"
      importantForAutofill="no"
      autoComplete="off"
      autoCorrect={false}
      underlineColorAndroid="transparent"
      allowFontScaling={false}
    />
  </View>
));

const OTPScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params || {};
  const { loginUser } = usePickup();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  // Timer logic
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Focus next input on change
  const handleOtpChange = (text, idx) => {
    if (!/^[0-9]?$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[idx] = text;
    setOtp(newOtp);
    setError('');
    if (text && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
      setFocusedIndex(idx + 1);
    }
    if (text === '' && idx > 0) {
      setFocusedIndex(idx);
    }
  };

  // Backspace to previous
  const handleKeyPress = (e, idx) => {
    if (e.nativeEvent.key === 'Backspace' && otp[idx] === '' && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
      setFocusedIndex(idx - 1);
    }
  };

  // On focus
  const handleFocus = idx => setFocusedIndex(idx);

  // Submit OTP
  const handleSubmit = async () => {
    setError('');
    const otpString = otp.join('');
    if (otpString.length !== OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 800));
      if (otpString !== OTP_MOCK) {
        setError('Incorrect OTP. Please try again.');
        setLoading(false);
        return;
      }
      await loginUser(phoneNumber);
      navigation.replace('Dashboard');
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit on 6 digits
  useEffect(() => {
    if (otp.every(d => d.length === 1)) {
      handleSubmit();
    }
    // eslint-disable-next-line
  }, [otp]);

  // Resend OTP
  const handleResend = async () => {
    setResending(true);
    setError('');
    setOtp(Array(OTP_LENGTH).fill(''));
    setFocusedIndex(0);
    inputRefs.current[0]?.focus();
    await new Promise(res => setTimeout(res, 1000));
    setTimer(RESEND_SECONDS);
    setResending(false);
  };

  // Back to login
  const handleBack = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.iconWrap}>
            <Icon name="lock-closed-outline" size={44} color="#38A169" />
          </View>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
          <Text style={styles.phone}>+91 {phoneNumber}</Text>

          {/* OTP Inputs */}
          <View style={styles.otpRow}>
            {otp.map((digit, idx) => (
              <OtpInput
                key={idx}
                ref={el => (inputRefs.current[idx] = el)}
                value={digit}
                onChange={t => handleOtpChange(t, idx)}
                onFocus={() => handleFocus(idx)}
                onKeyPress={e => handleKeyPress(e, idx)}
                isFocused={focusedIndex === idx}
              />
            ))}
          </View>

          {/* Error Message */}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Resend Timer */}
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={resending}>
                <Text style={styles.resendLink}>{resending ? 'Resending...' : 'Resend Code'}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <PrimaryButton
            title={loading ? 'Verifying...' : 'Verify OTP'}
            icon="checkmark-circle-outline"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading || otp.some(d => d === '')}
            style={{ marginTop: 18, marginBottom: 8 }}
          />

          {/* Back to Login */}
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Text style={styles.backBtnText}>← Back to Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: '#f0fdf4',
  },
  iconWrap: {
    backgroundColor: '#e6f2ec',
    borderRadius: 32,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#38A169',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
  phone: {
    fontSize: 16,
    color: '#38A169',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 2,
  },
  otpBox: {
    width: 44,
    height: 54,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  otpBoxFocused: {
    borderColor: '#38A169',
    shadowColor: '#38A169',
    shadowOpacity: 0.12,
    elevation: 2,
  },
  otpInput: {
    fontSize: 22,
    color: '#222',
    fontWeight: 'bold',
    width: 44,
    height: 54,
    textAlign: 'center',
    backgroundColor: 'transparent',
    letterSpacing: 2,
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 2,
    alignSelf: 'stretch',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    textAlign: 'center',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  resendText: {
    fontSize: 14,
    color: '#555',
  },
  timerText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  resendLink: {
    fontSize: 14,
    color: '#38A169',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  backBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
  backBtnText: {
    color: '#888',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default OTPScreen; 