"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Animated, StatusBar } from "react-native"
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
  Chip,
  Card,
  Divider,
} from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { GradientBackground } from "@/lib"
import * as ImagePicker from "expo-image-picker"
import { Camera, ChevronDown, X } from "lucide-react-native"

// Mock categories for dropdown selection
const mockCategories = ["Electronics", "Food & Beverage", "Clothing", "Home & Garden", "Sports", "Books", "Beauty"]

const ListingScreen = () => {
  const theme = useTheme()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [scrollY] = useState(new Animated.Value(0))

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.8, 0],
    extrapolate: "clamp",
  })

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: "clamp",
  })

  // Image picker function
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
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
      alert("Please fill out all fields and add an image.")
      return
    }

    console.log({
      title,
      price,
      description,
      category,
      image,
    })

    alert("Listing added successfully!")
  }

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <GradientBackground height="half" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Animated Header */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: headerOpacity,
              transform: [{ translateY: headerTranslateY }],
              backgroundColor: "transparent",
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
          <Card style={styles.formCard} mode="elevated">
            <Card.Content style={styles.formContainer}>
              {/* Image Upload */}
              <TouchableOpacity style={[styles.imagePicker, { borderColor: theme.colors.outline }]} onPress={pickImage}>
                {image ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                    <IconButton
                      icon={() => <X size={20} color={theme.colors.onSurface} />}
                      size={20}
                      style={styles.removeImageButton}
                      onPress={() => setImage(null)}
                    />
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Camera size={40} color={theme.colors.primary} />
                    <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                      Upload product image
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                      Tap to browse your gallery
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <Divider style={styles.divider} />

              {/* Title Input */}
              <TextInput
                label="Product Title"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
                style={styles.input}
                placeholder="Enter product name"
              />

              {/* Price Input */}
              <TextInput
                label="Price ($)"
                value={price}
                onChangeText={setPrice}
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                placeholder="0.00"
                left={<TextInput.Affix text="$" />}
              />
              {!isPriceValid() && price.length > 0 && (
                <HelperText type="error" visible={!isPriceValid() && price.length > 0}>
                  Enter a valid price (e.g., 19.99)
                </HelperText>
              )}

              {/* Category Selector */}
              <TouchableOpacity
                style={[styles.categorySelector, { backgroundColor: theme.colors.surfaceVariant }]}
                onPress={() => setCategoryModalVisible(true)}
              >
                <Text variant="bodyLarge">{category || "Select a category"}</Text>
                <ChevronDown size={20} color={theme.colors.onSurfaceVariant} />
              </TouchableOpacity>

              {/* Description Input */}
              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline
                numberOfLines={5}
                style={[styles.input, styles.textArea]}
                placeholder="Describe your product in detail..."
              />

              {/* Canadian Product Tag */}
              <View style={styles.tagContainer}>
                <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
                  Product Tags:
                </Text>
                <View style={styles.chipContainer}>
                  <Chip selected icon="flag" style={{ marginRight: 8, marginBottom: 8 }}>
                    Canadian Made
                  </Chip>
                  <Chip
                    selected={false}
                    icon="leaf"
                    style={{ marginRight: 8, marginBottom: 8 }}
                    onPress={() => console.log("Eco-friendly selected")}
                  >
                    Eco-friendly
                  </Chip>
                  <Chip selected={false} icon="plus" style={{ marginBottom: 8 }} onPress={() => console.log("Add tag")}>
                    Add Tag
                  </Chip>
                </View>
              </View>

              {/* Submit Button */}
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                contentStyle={{ height: 50 }}
                disabled={!title || !price || !description || !category || !image}
              >
                Add Listing
              </Button>
            </Card.Content>
          </Card>
        </Animated.ScrollView>

        {/* Category Modal */}
        <Portal>
          <Modal
            visible={categoryModalVisible}
            onDismiss={() => setCategoryModalVisible(false)}
            contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
          >
            <View style={styles.modalHeader}>
              <Text variant="titleLarge" style={styles.modalTitle}>
                Select Category
              </Text>
              <IconButton
                icon={() => <X size={20} color={theme.colors.onSurface} />}
                onPress={() => setCategoryModalVisible(false)}
              />
            </View>
            <Divider />
            <ScrollView style={styles.categoryList}>
              {mockCategories.map((item) => (
                <Button
                  key={item}
                  mode={category === item ? "contained" : "text"}
                  onPress={() => {
                    setCategory(item)
                    setCategoryModalVisible(false)
                  }}
                  style={styles.modalButton}
                  contentStyle={{ justifyContent: "flex-start" }}
                >
                  {item}
                </Button>
              ))}
            </ScrollView>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    textAlign: "center",
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 120,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  formCard: {
    elevation: 3,
    borderRadius: 12,
  },
  formContainer: {
    gap: 16,
    padding: 16,
  },
  input: {
    marginBottom: 4,
  },
  textArea: {
    minHeight: 120,
  },
  categorySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    height: 56,
  },
  submitButton: {
    marginTop: 20,
  },
  imagePicker: {
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: "dashed",
    overflow: "hidden",
  },
  uploadPlaceholder: {
    alignItems: "center",
    padding: 30,
  },
  imagePreviewContainer: {
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
  },
  modalContainer: {
    margin: 20,
    borderRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalTitle: {
    fontWeight: "bold",
  },
  categoryList: {
    padding: 8,
  },
  modalButton: {
    marginVertical: 4,
    borderRadius: 8,
  },
  divider: {
    marginVertical: 8,
  },
  tagContainer: {
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

export default ListingScreen

