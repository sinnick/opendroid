import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GlassContainer } from './GlassContainer';
import { Icon, IconName } from './Icon';
import { spacing, typography } from '../theme';

export type ChatMode = 'plan' | 'code';

interface ModeIndicatorProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  disabled?: boolean;
}

const MODE_CONFIG: Record<ChatMode, { label: string; icon: IconName; color: string }> = {
  plan: {
    label: 'Plan',
    icon: 'list-todo',
    color: '#3b82f6', // Blue
  },
  code: {
    label: 'Code',
    icon: 'code',
    color: '#f97316', // Orange
  },
};

export function ModeIndicator({ mode, onModeChange, disabled }: ModeIndicatorProps) {
  const config = MODE_CONFIG[mode];
  const otherMode: ChatMode = mode === 'plan' ? 'code' : 'plan';

  const handleToggle = () => {
    if (disabled) return;
    onModeChange(otherMode);
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <GlassContainer style={styles.badge}>
        <Icon name={config.icon} size={16} color={config.color} />
        <Text style={[styles.badgeText, { color: config.color }]}>
          {config.label}
        </Text>
      </GlassContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 22,
    gap: 6,
  },
  badgeText: {
    ...typography.body,
    fontWeight: '500',
  },
});
