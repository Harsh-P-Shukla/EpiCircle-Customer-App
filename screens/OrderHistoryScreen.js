import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { usePickup } from '../contexts/PickupContext';
import HeaderBar from '../components/HeaderBar';
import OrderCard from '../components/OrderCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const STATUS_TABS = [
  'All',
  'Pending',
  'Accepted',
  'In-Process',
  'Pending for Approval',
  'Completed',
];

const OrderHistoryScreen = ({ navigation }) => {
  const { pickups, updatePickupStatus, logoutUser, user } = usePickup();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(false);

  // Filter pickups by status
  const filteredPickups = selectedStatus === 'All'
    ? pickups
    : pickups.filter(pickup => pickup.status === selectedStatus);

  // Simulate loading (optional, for demo)
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => setLoading(false), 500);
  // }, [selectedStatus]);

  // Approve handler
  const handleApprovePickup = (pickupId) => {
    updatePickupStatus(pickupId, 'Completed');
  };

  // Profile initials
  const initials = user?.phoneNumber ? user.phoneNumber.slice(-2) : 'EC';

  // Header right: profile + logout
  const HeaderRight = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.avatar}
        activeOpacity={0.7}
      >
        <Text style={styles.avatarText}>{initials}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          logoutUser();
          navigation.replace('Login');
        }}
        activeOpacity={0.7}
      >
        <Icon name="logout" size={22} color="#38A169" />
      </TouchableOpacity>
    </View>
  );

  // Render status tab
  const renderTab = ({ item }) => (
    <TouchableOpacity
      style={[styles.tabBtn, selectedStatus === item && styles.tabBtnActive]}
      onPress={() => setSelectedStatus(item)}
      activeOpacity={0.8}
    >
      <Text style={[styles.tabText, selectedStatus === item && styles.tabTextActive]}>{item}</Text>
      {selectedStatus === item && <View style={styles.tabUnderline} />}
    </TouchableOpacity>
  );

  // Render order card
  const renderOrder = ({ item }) => (
    <OrderCard pickup={item} />
  );

  return (
    <SafeAreaView style={styles.root}>
      <HeaderBar
        title="Order History"
        subtitle={`${filteredPickups.length} pickup${filteredPickups.length !== 1 ? 's' : ''} found`}
        style={styles.headerBar}
      >
        <HeaderRight />
      </HeaderBar>
      {/* Status Tabs */}
      <View style={styles.tabsWrap}>
        <FlatList
          data={STATUS_TABS}
          renderItem={renderTab}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsList}
        />
      </View>
      {/* Orders List */}
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#38A169" />
        </View>
      ) : filteredPickups.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Icon name="package-variant" size={48} color="#a0aec0" style={{ marginBottom: 8 }} />
          <Text style={styles.emptyText}>No Pickups Found</Text>
          <Text style={styles.emptySubtext}>
            {selectedStatus === 'All'
              ? 'You haven\'t scheduled any pickups yet.'
              : `No ${selectedStatus.toLowerCase()} pickups found.`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPickups}
          renderItem={renderOrder}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  headerBar: {
    paddingTop: 36,
    paddingBottom: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e6f2ec',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#38A169',
  },
  avatarText: {
    color: '#38A169',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutBtn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#e6f2ec',
  },
  tabsWrap: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabsList: {
    alignItems: 'center',
    paddingRight: 8,
  },
  tabBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  tabBtnActive: {
    backgroundColor: '#e6f2ec',
  },
  tabText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#38A169',
    fontWeight: 'bold',
  },
  tabUnderline: {
    height: 3,
    backgroundColor: '#38A169',
    borderRadius: 2,
    marginTop: 3,
    width: 24,
    alignSelf: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
});

export default OrderHistoryScreen; 