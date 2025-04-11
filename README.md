# CanaBuy – Support Local with Confidence 🇨🇦

## Overview

**CanaBuy** is a cross-platform mobile application that helps Canadian consumers identify and purchase Canadian-made products. Created in response to recent international trade tensions and rising interest in economic patriotism, CanaBuy provides users with tools to scan product barcodes, view Canadian alternatives, and shop within a marketplace tailored to locally sourced goods.

Designed with accessibility, simplicity, and UX best practices in mind, CanaBuy is especially optimized for older adults and less tech-savvy users while remaining modern and functional for all Canadians.

### Key Features

- **Barcode Scanning** – Instantly verify if a product is Canadian-made.
- **Marketplace** – Browse and shop Canadian products from verified sellers.
- **Canadian Score** – View how "Canadian" a product is, based on origin and branding.
- **Accessibility-First Design** – UI considerations for vision, motor skills, and cognitive accessibility.
- **Cross-Platform Support** – Works on iOS, Android, and Web via Expo.
- **Buyer & Seller Modes** – Seamlessly switch between shopping and listing items for sale.
- **Multilingual Ready** – Internationalization support for future language expansion.

### Supported Platforms

- Web
- iOS
- Android

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/charbel30/canabuy.git
   cd canabuy
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Android Emulator (Pixel 9, API 35)**

To run the app on Android, set up an emulator using Android Studio:

1. **Download and Install [Android Studio](https://developer.android.com/studio)**.
2. Open Android Studio and go to **Tools > Device Manager**.
3. Click **Create Device**, then:
   - Choose **Phone** > **Pixel 9** and click **Next**.
   - Choose **API Level 35** (Android 14) system image and download it if necessary.
   - Name your virtual device (e.g., `Pixel_9_API_35`) and finish setup.

4. Once created, **launch the emulator** by clicking the play ▶️ icon next to the device.

> 🚨 **Important:** Make sure the emulator is running **before** you execute `npm start`.

4. **Run the Application**

   Once the emulator is running, start the Expo development server:

   ```bash
   npm start
   ```
   then check if its in expo Go mode
   (if it is not press s Then a)
   (if it is press a in the terminal)
   

   if you receive an error from the expoCLI after npm start in expo go. this caused from ReactNativePaper module

## Built With

- **TypeScript** - For type-safe JavaScript development.
- **React** - A JavaScript library for building user interfaces.
- **React Native** - A framework for creating native applications.
- **Expo** - A platform for universal React applications.
- **Expo Router** - A flexible and efficient routing solution for React Native.
- **React Native Paper** - A component library implementing Material Design.

## Acknowledgments

We extend our gratitude to the developers and maintainers of the following open-source libraries and tools:

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://docs.expo.dev/build-reference/variables/)
