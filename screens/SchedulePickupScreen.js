import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePickup } from '../contexts/PickupContext';

const SchedulePickupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    address: '',
    locationLink: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addPickup } = usePickup();

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getMinimumDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.date) {
      Alert.alert('Error', 'Please select a pickup date');
      return;
    }

    if (!formData.timeSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }

    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add pickup to context
      addPickup({
        date: formData.date,
        timeSlot: formData.timeSlot,
        address: formData.address,
        locationLink: formData.locationLink,
        items: [
          { name: 'Mixed Scrap', qty: 1, price: 200 },
          { name: 'Paper', qty: 5, price: 20 },
          { name: 'Cardboard', qty: 3, price: 25 },
        ],
        totalAmount: 335,
      });

      Alert.alert(
        'Success',
        'Pickup scheduled successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule pickup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#2E7D32', '#4CAF50']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Schedule Pickup</Text>
          <Text style={styles.headerSubtitle}>
            Fill in the details below to schedule your scrap pickup
          </Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          {/* Date Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#999"
              value={formData.date}
              onChangeText={(value) => handleInputChange('date', value)}
              keyboardType="numeric"
            />
            <Text style={styles.hint}>
              Format: YYYY-MM-DD (e.g., 2025-01-30)
            </Text>
          </View>

          {/* Time Slot */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time Slot *</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.timeSlotContainer}
            >
              {timeSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlotButton,
                    formData.timeSlot === slot && styles.timeSlotButtonActive,
                  ]}
                  onPress={() => handleInputChange('timeSlot', slot)}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      formData.timeSlot === slot && styles.timeSlotTextActive,
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your complete address"
              placeholderTextColor="#999"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Location Link */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Google Maps Link (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="https://maps.google.com/..."
              placeholderTextColor="#999"
              value={formData.locationLink}
              onChangeText={(value) => handleInputChange('locationLink', value)}
              keyboardType="url"
            />
            <Text style={styles.hint}>
              Paste your Google Maps location link for easier pickup
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Scheduling...' : 'Schedule Pickup'}
            </Text>
          </TouchableOpacity>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>📋 What to expect:</Text>
            <Text style={styles.infoText}>
              • Our team will contact you within 24 hours{'\n'}
              • Pickup will be confirmed based on availability{'\n'}
              • You'll receive a pickup code once confirmed{'\n'}
              • Payment will be made after pickup completion
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  timeSlotContainer: {
    marginTop: 8,
  },
  timeSlotButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeSlotButtonActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  timeSlotTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default SchedulePickupScreen; 