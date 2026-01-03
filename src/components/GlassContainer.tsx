import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../hooks/useTheme';

// Try to import GlassView, fallback to blur if not available
let GlassView: any = null;
let isLiquidGlassAvailable: (() => boolean) | null = null;

try {
  const glassEffect = require('expo-glass-effect');
  GlassView = glassEffect.GlassView;
  isLiquidGlassAvailable = glassEffect.isLiquidGlassAvailable;
} catch {
  // expo-glass-effect not available or iOS < 26
}

interface GlassContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

/**
 * Cross-platform glass container component.
 * Uses iOS 26+ Liquid Glass when available, falls back to styled container on Android/older iOS.
 */
export function GlassContainer({ children, style, intensity = 40 }: GlassContainerProps) {
  const { isDark, colors } = useTheme();

  // Check if liquid glass is available (iOS 26+)
  const canUseLiquidGlass = Platform.OS === 'ios' && isLiquidGlassAvailable?.();

  if (canUseLiquidGlass && GlassView) {
    return (
      <GlassView style={style}>
        {children}
      </GlassView>
    );
  }

  // Fallback for Android / older iOS - semi-transparent background with subtle border
  const fallbackStyle = {
    backgroundColor: isDark ? 'rgba(50, 50, 50, 0.85)' : 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden' as const,
  };

  return (
    <View style={[style, fallbackStyle]}>
      {Platform.OS === 'ios' && (
        <BlurView
          intensity={intensity}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </View>
  );
}
