import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState = {
  user: null,
  pickups: [
    {
      id: 1,
      date: '2025-01-15',
      timeSlot: '10-11 AM',
      address: '123 Main Street, City',
      locationLink: 'https://maps.google.com/?q=123+Main+Street',
      status: 'Completed',
      pickupCode: 'XYZ123',
      items: [
        { name: 'Iron', qty: 5, price: 100 },
        { name: 'Aluminum', qty: 3, price: 80 },
        { name: 'Copper', qty: 2, price: 150 }
      ],
      totalAmount: 790
    },
    {
      id: 2,
      date: '2025-01-20',
      timeSlot: '2-3 PM',
      address: '456 Oak Avenue, Town',
      locationLink: 'https://maps.google.com/?q=456+Oak+Avenue',
      status: 'Accepted',
      pickupCode: 'ABC456',
      items: [
        { name: 'Steel', qty: 4, price: 90 },
        { name: 'Plastic', qty: 6, price: 30 }
      ],
      totalAmount: 480
    },
    {
      id: 3,
      date: '2025-01-25',
      timeSlot: '11-12 PM',
      address: '789 Pine Road, Village',
      locationLink: 'https://maps.google.com/?q=789+Pine+Road',
      status: 'Pending',
      items: [
        { name: 'Paper', qty: 10, price: 20 },
        { name: 'Cardboard', qty: 8, price: 25 }
      ],
      totalAmount: 400
    }
  ]
};

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  ADD_PICKUP: 'ADD_PICKUP',
  UPDATE_PICKUP_STATUS: 'UPDATE_PICKUP_STATUS',
  LOAD_SESSION: 'LOAD_SESSION'
};

// Reducer function
const pickupReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null
      };
    
    case ACTIONS.ADD_PICKUP:
      const newPickup = {
        ...action.payload,
        id: Date.now(),
        status: 'Pending'
      };
      return {
        ...state,
        pickups: [newPickup, ...state.pickups]
      };
    
    case ACTIONS.UPDATE_PICKUP_STATUS:
      return {
        ...state,
        pickups: state.pickups.map(pickup =>
          pickup.id === action.payload.id
            ? { ...pickup, status: action.payload.status }
            : pickup
        )
      };
    
    case ACTIONS.LOAD_SESSION:
      return {
        ...state,
        user: action.payload
      };
    
    default:
      return state;
  }
};

// Create context
const PickupContext = createContext();

// Provider component
export const PickupProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pickupReducer, initialState);

  // Load user session from AsyncStorage on app start
  useEffect(() => {
    loadUserSession();
  }, []);

  const loadUserSession = async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const user = JSON.parse(userSession);
        dispatch({ type: ACTIONS.LOAD_SESSION, payload: user });
      }
    } catch (error) {
      console.error('Error loading user session:', error);
    }
  };

  // Save user session to AsyncStorage
  const saveUserSession = async (user) => {
    try {
      await AsyncStorage.setItem('userSession', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user session:', error);
    }
  };

  // Login user
  const loginUser = async (phoneNumber) => {
    const user = { phoneNumber, isLoggedIn: true };
    await saveUserSession(user);
    dispatch({ type: ACTIONS.SET_USER, payload: user });
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      dispatch({ type: ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Add new pickup request
  const addPickup = (pickupData) => {
    dispatch({ type: ACTIONS.ADD_PICKUP, payload: pickupData });
  };

  // Update pickup status
  const updatePickupStatus = (id, status) => {
    dispatch({ type: ACTIONS.UPDATE_PICKUP_STATUS, payload: { id, status } });
  };

  // Get recent pickups (last 3)
  const getRecentPickups = () => {
    return state.pickups.slice(0, 3);
  };

  // Get pickup by ID
  const getPickupById = (id) => {
    return state.pickups.find(pickup => pickup.id === id);
  };

  const value = {
    user: state.user,
    pickups: state.pickups,
    loginUser,
    logoutUser,
    addPickup,
    updatePickupStatus,
    getRecentPickups,
    getPickupById
  };

  return (
    <PickupContext.Provider value={value}>
      {children}
    </PickupContext.Provider>
  );
};

// Custom hook to use the context
export const usePickup = () => {
  const context = useContext(PickupContext);
  if (!context) {
    throw new Error('usePickup must be used within a PickupProvider');
  }
  return context;
}; 