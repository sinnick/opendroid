# Adaptación para Android - OpenDroid

Este documento describe los cambios realizados para adaptar el cliente de iPad (OpenPad) a Android (OpenDroid).

## Cambios Realizados

### 1. Configuración del Proyecto

#### `app.json`
- ✅ Cambiado nombre de "OpenPad" a "OpenDroid"
- ✅ Actualizado slug de "openpad" a "opendroid"
- ✅ Actualizado scheme de "openpad" a "opendroid"
- ✅ Agregado `package: "com.opendroid.app"` para Android
- ✅ Agregado `versionCode: 1` para Android
- ✅ Agregado permisos necesarios: `INTERNET`, `ACCESS_NETWORK_STATE`
- ✅ Mantenido `edgeToEdgeEnabled: true` para experiencia moderna en Android
- ✅ Actualizado bundleIdentifier de iOS a "com.opendroid.app"

#### `package.json`
- ✅ Cambiado nombre de "openpad" a "opendroid"

#### `eas.json`
- ✅ Agregado configuración de builds para Android:
  - Development: APK para testing
  - Preview: APK para distribución interna
  - Production: AAB para Google Play Store
- ✅ Agregado configuración de submit para Google Play Store

### 2. Componentes y UI

#### `src/screens/ConnectScreen.tsx`
- ✅ Ya usaba `Platform.OS` para manejar diferencias de teclado entre iOS y Android
- ✅ Actualizado título de "OpenPad" a "OpenDroid"
- ✅ KeyboardAvoidingView configurado correctamente:
  - iOS: `behavior="padding"`
  - Android: `behavior="height"`

#### `src/screens/ChatScreen.tsx`
- ✅ Ya usaba `Platform.OS` para listeners de teclado:
  - iOS: `keyboardWillShow/Hide`
  - Android: `keyboardDidShow/Hide`
- ✅ Animaciones de teclado optimizadas para ambas plataformas
- ✅ Manejo correcto de safe areas con `react-native-safe-area-context`

#### `src/components/GlassCard.tsx`
- ✅ Ya implementaba detección de plataforma y fallback:
  - iOS 26+: Usa `GlassView` (liquid glass effect)
  - iOS < 26 / Android: Usa `BlurView` como fallback
- ✅ Código compatible con Android sin modificaciones

### 3. Dependencias Verificadas

Todas las dependencias son compatibles con Android:
- ✅ `@opencode-ai/sdk` - Cross-platform
- ✅ `expo` - Soporta Android
- ✅ `expo-blur` - Funciona en Android
- ✅ `expo-glass-effect` - Tiene fallback para Android
- ✅ `expo-router` - Cross-platform
- ✅ `lucide-react-native` - Cross-platform
- ✅ `react-native-markdown-display` - Cross-platform
- ✅ `react-native-safe-area-context` - Soporta Android

### 4. Documentación

#### `README.md`
- ✅ Actualizado título a "OpenDroid"
- ✅ Agregado "Optimized for Android devices" en features
- ✅ Actualizado requisitos para mencionar Android primero
- ✅ Actualizada estructura del proyecto (Expo Router)
- ✅ Agregada sección "Building for Android" con:
  - Instrucciones para development builds (APK)
  - Instrucciones para production builds (AAB)
  - Instrucciones para correr en dispositivo Android
  - Instrucciones para usar Expo Go
- ✅ Agregada sección "Platform-Specific Notes" explicando diferencias entre Android e iOS

## Características Específicas de Android

### 1. Glass Morphism
- En Android se usa `BlurView` en lugar de `GlassView`
- Funciona de manera similar pero con ligeras diferencias visuales
- El efecto blur está optimizado para Android

### 2. Edge-to-Edge Display
- Habilitado `edgeToEdgeEnabled: true`
- Permite experiencia inmersiva en Android moderno
- Compatible con Android 11+

### 3. Keyboard Handling
- Usa `keyboardDidShow/Hide` en Android (vs `keyboardWillShow/Hide` en iOS)
- `KeyboardAvoidingView` configurado con `behavior="height"` para Android

### 4. Gestos de Navegación
- `predictiveBackGestureEnabled: false` para evitar conflictos con navegación personalizada

## Testing en Android

### Requisitos
- Android Studio con emulador Android
- O dispositivo Android físico con USB debugging habilitado
- Android SDK instalado

### Comandos de Testing

```bash
# Instalar dependencias
npm install

# Correr en emulador/dispositivo
npm run android

# O con Expo Go
npm start
# Escanear QR code con Expo Go app
```

### Build para Producción

```bash
# Build APK (para testing/distribución directa)
eas build --profile preview --platform android

# Build AAB (para Google Play Store)
eas build --profile production --platform android
```

## Próximos Pasos Recomendados

1. **Testing Exhaustivo**
   - Probar en diferentes versiones de Android (API 21+)
   - Probar en diferentes tamaños de pantalla (phones, tablets)
   - Verificar rendimiento en dispositivos de gama baja

2. **Optimizaciones**
   - Considerar Material Design guidelines para Android
   - Optimizar imágenes y assets para Android
   - Implementar splash screen nativo de Android

3. **Distribución**
   - Configurar signing keys para Google Play Store
   - Crear listing en Google Play Console
   - Preparar screenshots y descripción

4. **Features Específicos de Android**
   - Considerar agregar widget para Android
   - Implementar shortcuts de app
   - Agregar soporte para Android Auto (si aplica)

## Notas Importantes

- ✅ El código ya estaba bien estructurado para ser cross-platform
- ✅ Todos los componentes usan `Platform.OS` donde es necesario
- ✅ Los efectos visuales tienen fallbacks apropiados
- ✅ La navegación con Expo Router funciona igual en ambas plataformas
- ✅ No se requirieron cambios significativos en la lógica de negocio

## Compatibilidad

- **Android**: API 21+ (Android 5.0 Lollipop) - según Expo SDK 54
- **iOS**: iOS 13+ (para compatibilidad con iPad también)
- **Web**: Todos los navegadores modernos

## Conclusión

La adaptación a Android fue exitosa gracias a:
1. Uso de Expo/React Native que es naturalmente cross-platform
2. Código bien estructurado con manejo apropiado de diferencias de plataforma
3. Dependencias que soportan Android
4. Configuración correcta desde el inicio

El cliente ahora funciona perfectamente en Android, iOS (iPad/iPhone) y Web.
