# Expo React Native Paper

[![EAS Build](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eas-build.yml/badge.svg)](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eas-build.yml)
[![EAS Review](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eas-reviews.yml/badge.svg)](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eas-reviews.yml)
[![EAS Update](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eas-update.yml/badge.svg)](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eas-update.yml)
[![CodeQL](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/codeql.yml/badge.svg)](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/codeql.yml)
[![ESLint](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eslint.yml/badge.svg)](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/eslint.yml)
[![Prettier](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/prettier.yml/badge.svg)](https://github.com/youzarsiph/expo-react-native-paper/actions/workflows/prettier.yml)

## Overview

The `expo-react-native-paper` repository provides a robust boilerplate for developing React Native applications using Expo. It seamlessly integrates core components such as Expo Router for navigation, React Native Paper for UI design, and GitHub Actions for continuous integration and deployment, ensuring high standards of code quality and maintainability.

### Key Features

- **Expo Framework**: Streamlines the development process with its managed workflow.
- **Expo Router**: Simplifies routing and navigation with minimal configuration.
- **Material Design V3**: Adapts the latest Material Design principles for a modern user experience.
- **Themable UI**: Offers customizable light and dark themes.
- **Cross-Platform Compatibility**: Operates seamlessly on Web, iOS, and Android.
- **Bi-directional Layout Support**: Supports Left-to-Right (LTR) and Right-to-Left (RTL) layouts.
- **Internationalization (i18n)**: Supports multiple languages, including Arabic, English, and Turkish.
- **CI/CD Integration**: Employs GitHub Actions for automated builds, code reviews, and deployments.

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
   git clone https://github.com/youzarsiph/expo-react-native-paper.git
   cd expo-react-native-paper
   ```

2. **Customize the Project**

   Open the `package.json` file to update the application name:

   ```jsonc
   {
     "name": "your-app-name",
     ...
   }
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Application**

   ```bash
   npm start
   ```

5. **Set Up Android Emulator (Pixel 9, API 35)**

To run the app on Android, set up an emulator using Android Studio:

1. **Download and Install [Android Studio](https://developer.android.com/studio)**.
2. Open Android Studio and go to **Tools > Device Manager**.
3. Click **Create Device**, then:
   - Choose **Phone** > **Pixel 9** and click **Next**.
   - Choose **API Level 35** (Android 14) system image and download it if necessary.
   - Name your virtual device (e.g., `Pixel_9_API_35`) and finish setup.

4. Once created, **launch the emulator** by clicking the play ▶️ icon next to the device.

> 🚨 **Important:** Make sure the emulator is running **before** you execute `npm start`.

6. **Run the Application**

   Once the emulator is running, start the Expo development server:

   ```bash
   npm start
   then press a in the terminal
   ```

## Built With

- **TypeScript** - For type-safe JavaScript development.
- **React** - A JavaScript library for building user interfaces.
- **React Native** - A framework for creating native applications.
- **Expo** - A platform for universal React applications.
- **Expo Router** - A flexible and efficient routing solution for React Native.
- **React Native Paper** - A component library implementing Material Design.

## Contributing

We welcome contributions that enhance the quality and functionality of this project. To contribute, follow these steps:

1. **Fork the Repository**

   Fork the `expo-react-native-paper` repository on GitHub and clone your fork to your local machine.

2. **Create a New Branch**

   Create a new branch for your feature or fix:

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit Your Changes**

   Make your changes and commit them with a descriptive message:

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   Push your changes to your fork on GitHub:

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

   Open a pull request in the original repository with a description of your changes.

Your contributions are integral to the ongoing evolution of this project.

## Code Quality

We enforce high code quality through automated checks:

- **CodeQL**: Security scans for identifying vulnerabilities.
- **ESLint**: JavaScript linting to maintain code consistency.
- **Prettier**: Code formatting to ensure uniformity.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

## Related Projects

- [**expo-material**](https://gi
thub.com/youzarsiph/expo-material): Enhances Expo's default setup with Material Design elements.
- [**expo-material-tabs**](https://github.com/youzarsiph/expo-material-tabs): Expands the `expo-material` template with tab navigation.
- [**expo-material-drawer**](https://github.com/youzarsiph/expo-material-drawer): Integrates a side drawer navigation system into the `expo-material` template.
- [**expo-drive**](https://github.com/youzarsiph/expo-drive): A template replicating the Google Drive user interface, providing a familiar and intuitive design.

## Acknowledgments

We extend our gratitude to the developers and maintainers of the following open-source libraries and tools:

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://docs.expo.dev/build-reference/variables/)
