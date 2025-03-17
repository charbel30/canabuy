import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Text, useTheme, Button, Card, Divider, Modal, Portal } from 'react-native-paper'

// Mock items in the checkout cart
const mockCartItems = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    price: 129.99,
    image: require('@/assets/images/products/electronics/wireless-earbuds.jpg'),
  },
  {
    id: '2',
    name: 'Winter Jacket',
    price: 199.99,
    image: require('@/assets/images/products/clothing/winter-jacket.jpg'),
  },
  {
    id: '3',
    name: 'Smart Speaker',
    price: 79.99,
    image: require('@/assets/images/products/electronics/smart-speaker.jpg'),
  },
]

const CheckoutScreen = () => {
  const theme = useTheme()
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)

  // Calculate total price
  const totalPrice = mockCartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Checkout
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {mockCartItems.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text variant="titleMedium">{item.name}</Text>
                <Text variant="bodyLarge">${item.price.toFixed(2)}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}

        <Divider style={styles.divider} />

        <Text variant="headlineSmall" style={styles.totalPrice}>
          Total: ${totalPrice.toFixed(2)}
        </Text>

        <Button
          mode="contained"
          onPress={() => setPaymentModalVisible(true)}
          style={styles.paymentButton}
        >
          Proceed to Payment
        </Button>
      </ScrollView>

      {/* Payment Modal */}
      <Portal>
        <Modal
          visible={paymentModalVisible}
          onDismiss={() => setPaymentModalVisible(false)}
          contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Payment Details
          </Text>
          <Text variant="bodyMedium" style={styles.paymentText}>
            Card Number: **** **** **** 1234
          </Text>
          <Text variant="bodyMedium" style={styles.paymentText}>
            Expiry: 12/26
          </Text>
          <Text variant="bodyMedium" style={styles.paymentText}>
            Name: John Doe
          </Text>

          <Button
            mode="contained"
            onPress={() => {
              alert('Payment Successful!')
              setPaymentModalVisible(false)
            }}
            style={styles.confirmButton}
          >
            Pay ${totalPrice.toFixed(2)}
          </Button>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  scrollContainer: { paddingBottom: 50 },
  card: { marginBottom: 16 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  productImage: { width: 60, height: 60, marginRight: 12 },
  productDetails: { flex: 1 },
  divider: { marginVertical: 16 },
  totalPrice: { fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  paymentButton: { marginTop: 10 },
  modalContainer: { padding: 20, borderRadius: 10, margin: 20 },
  modalTitle: { fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  paymentText: { marginBottom: 10, textAlign: 'center' },
  confirmButton: { marginTop: 16 },
})

export default CheckoutScreen
