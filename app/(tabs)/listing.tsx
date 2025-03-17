import React, { useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native'
import {
  Text,
  useTheme,
  Button,
  TextInput,
  Surface,
  IconButton,
  Modal,
  Portal,
  HelperText,
} from 'react-native-paper'
import { GradientBackground } from '@/lib'
import * as ImagePicker from 'expo-image-picker'

// Mock categories for dropdown selection
const mockCategories = [
  'Electronics',
  'Food & Beverage',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Beauty',
]

const ListingScreen = () => {
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [scrollY] = useState(new Animated.Value(0))

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp',
  })

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  })

  // Image picker function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  // Form validation
  const isPriceValid = () => /^\d+(\.\d{1,2})?$/.test(price)

  // Mock function to submit the listing
  const handleSubmit = () => {
    if (!title || !price || !description || !category || !image) {
      alert('Please fill out all fields and add an image.')
      return
    }

    console.log({
      title,
      price,
      description,
      category,
      image,
    })

    alert('Listing added successfully!')
  }

  return (
    <View style={styles.container}>
      <GradientBackground height="half" />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Create Listing
        </Text>
        <Text variant="bodyLarge" style={styles.headerSubtitle}>
          Add a new item to the marketplace
        </Text>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        <View style={styles.formContainer}>
          {/* Image Upload */}
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <IconButton icon="camera" size={40} />
            )}
            <Text variant="bodyMedium">Upload an image</Text>
          </TouchableOpacity>

          {/* Title Input */}
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />

          {/* Price Input */}
          <TextInput
            label="Price ($)"
            value={price}
            onChangeText={setPrice}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
          {!isPriceValid() && price.length > 0 && (
            <HelperText type="error">Enter a valid price</HelperText>
          )}

          {/* Description Input */}
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          {/* Category Selector */}
          <TouchableOpacity
            style={[styles.categorySelector, { backgroundColor: theme.colors.surfaceVariant }]}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text variant="bodyLarge">{category || 'Select a category'}</Text>
            <IconButton icon="chevron-down" />
          </TouchableOpacity>

          {/* Submit Button */}
          <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
            Add Listing
          </Button>
        </View>
      </Animated.ScrollView>

      {/* Category Modal */}
      <Portal>
        <Modal
          visible={categoryModalVisible}
          onDismiss={() => setCategoryModalVisible(false)}
          contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Select Category
          </Text>
          {mockCategories.map((item) => (
            <Button
              key={item}
              mode={category === item ? 'contained' : 'text'}
              onPress={() => {
                setCategory(item)
                setCategoryModalVisible(false)
              }}
              style={styles.modalButton}
            >
              {item}
            </Button>
          ))}
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 20, paddingHorizontal: 16 },
  headerTitle: { fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  headerSubtitle: { textAlign: 'center', opacity: 0.8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 100, paddingBottom: 32, paddingHorizontal: 16 },
  formContainer: { gap: 16 },
  input: { marginBottom: 12 },
  categorySelector: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 10 },
  submitButton: { marginTop: 20 },
  imagePicker: { alignItems: 'center', padding: 20, borderWidth: 1, borderRadius: 10, borderColor: '#ccc' },
  imagePreview: { width: 120, height: 120, borderRadius: 10 },
  modalContainer: { margin: 20, borderRadius: 20, padding: 20 },
  modalTitle: { fontWeight: 'bold', marginBottom: 16 },
  modalButton: { marginVertical: 4 },
})

export default ListingScreen
