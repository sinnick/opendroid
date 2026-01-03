# OpenDroid

A mobile client for [OpenCode](https://opencode.ai) - the AI coding assistant. Built with Expo and React Native. Works on Android, iOS (including iPad), and web.

## Features

- Connect to any OpenCode server
- View and manage chat sessions
- Send messages and receive AI responses in real-time
- View tool usage (file reads, edits, bash commands, etc.)
- Expandable tool blocks with input/output details
- Image attachment support
- Dark/light theme support
- Live polling for real-time updates
- Optimized for Android devices

## Screenshots

*Coming soon*

## Requirements

- Node.js 18+
- npm or yarn
- Android device/emulator or iOS Simulator (Mac) or physical device with Expo Go

## Installation

1. Clone the repository:

```bash
git clone https://github.com/R44VC0RP/opendroid.git
cd opendroid
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your device:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## Connecting to OpenCode

1. Make sure you have an OpenCode server running (default: `http://localhost:9034`)
2. If running on a physical device, use your machine's local IP address instead of `localhost`
3. Enter the server URL in the connect screen and tap "Connect"

## Project Structure

```
opendroid/
├── app/                    # Expo Router structure
│   ├── (tabs)/            # Tab navigation
│   │   ├── sessions/      # Sessions screens
│   │   └── settings.tsx   # Settings screen
│   ├── chat/[id].tsx      # Chat screen (dynamic route)
│   ├── connect.tsx        # Connection screen
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── GlassCard.tsx   # Glass morphism card component (with Android fallback)
│   │   ├── Icon.tsx        # Icon wrapper for lucide-react-native
│   │   └── Markdown.tsx    # Markdown renderer for messages
│   ├── hooks/              # Custom React hooks
│   │   ├── useOpenCode.ts  # OpenCode SDK hook (legacy)
│   │   └── useTheme.ts     # Theme hook for dark/light mode
│   ├── providers/          # Context providers
│   │   └── OpenCodeProvider.tsx  # OpenCode client & state management
│   ├── screens/            # App screens
│   │   ├── ChatScreen.tsx      # Chat conversation view
│   │   ├── ConnectScreen.tsx   # Server connection screen
│   │   ├── SessionsScreen.tsx  # Sessions list
│   │   └── SettingsScreen.tsx  # App settings
│   └── theme/              # Theme configuration
│       └── index.ts        # Colors, typography, spacing
├── assets/                 # App icons and images
└── package.json
```

## Tech Stack

- **Expo SDK 54** - React Native development platform
- **Expo Router** - File-based navigation
- **@opencode-ai/sdk** - OpenCode API client
- **lucide-react-native** - Icon library
- **expo-blur** - Blur effects (iOS) with Android fallback
- **expo-glass-effect** - Liquid glass effects for iOS 26+ with Android fallback
- **react-native-markdown-display** - Markdown rendering

## Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run TypeScript check: `npx tsc --noEmit`
5. Commit your changes: `git commit -m "feat: Add my feature"`
6. Push to your fork: `git push origin feature/my-feature`
7. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Style

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use functional components with hooks
- Keep components small and focused
- Use the theme system for colors and spacing

### Areas for Contribution

- UI/UX improvements
- New features (voice input, image upload, etc.)
- Performance optimizations
- Bug fixes
- Documentation improvements
- Tests

### Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/R44VC0RP/opendroid/issues) with:

- Clear description of the problem or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
- Device/OS information (especially Android version)

## Building for Android

### Development Build

```bash
# Build APK for development
eas build --profile development --platform android

# Or build locally
npx expo run:android
```

### Production Build

```bash
# Build AAB for Google Play Store
eas build --profile production --platform android
```

### Running on Android Device

1. Enable USB debugging on your Android device
2. Connect your device via USB
3. Run: `npm run android`

Alternatively, use the Expo Go app:
1. Install Expo Go from Google Play Store
2. Run: `npm start`
3. Scan the QR code with Expo Go

## Platform-Specific Notes

### Android
- Uses BlurView for glass morphism effects (iOS uses GlassView on iOS 26+)
- Edge-to-edge display enabled for modern Android devices
- Optimized keyboard handling for Android

### iOS
- Supports iPad and iPhone
- Uses Liquid Glass effects on iOS 26+
- Fallback to BlurView on older iOS versions

## License

MIT

## Acknowledgments

- [OpenCode](https://opencode.ai) - The AI coding assistant this app connects to
- [Expo](https://expo.dev) - React Native development platform
- [Lucide](https://lucide.dev) - Beautiful icons
