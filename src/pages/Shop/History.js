import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Fire from '../../config/Fire'; // Import konfigurasi Firebase Anda

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await Fire.database().ref('dataPembelian').once('value');
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setOrders(formattedData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Riwayat Pemesanan</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>Tidak ada riwayat pemesanan</Text>
      ) : (
        orders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderDate}>Tanggal: {new Date(order.timestamp).toLocaleDateString()}</Text>
            <Text style={styles.itemsHeader}>Item Pesanan:</Text>
            {order.items && order.items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemText}>- {item.name} (Harga: {item.price})</Text>
              </View>
            ))}
            <Text style={styles.totalText}>Total Harga: Rp {order.totalPrice}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2c94df',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
  },
  orderCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 5,
  },
  itemContainer: {
    marginLeft: 15,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 15,
    color: '#555',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388e3c',
    marginTop: 10,
  },
});
