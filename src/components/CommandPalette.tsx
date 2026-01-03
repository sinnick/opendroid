import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Icon, IconName } from './Icon';
import { spacing, typography } from '../theme';
import type { Command } from '../providers/OpenCodeProvider';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.4;

interface CommandPaletteProps {
  visible: boolean;
  commands: Command[];
  loading?: boolean;
  filter: string; // Current typed filter after "/"
  onSelect: (command: Command) => void;
  onClose: () => void;
}

// Get icon for command category/type
function getCommandIcon(command: Command): IconName {
  const name = command.name.toLowerCase();

  if (name.includes('plan')) return 'list-todo';
  if (name.includes('code') || name.includes('build')) return 'code';
  if (name.includes('search')) return 'search';
  if (name.includes('help')) return 'alert';
  if (name.includes('clear')) return 'inbox';
  if (name.includes('config') || name.includes('setting')) return 'settings';
  if (name.includes('model')) return 'zap';
  if (name.includes('file')) return 'file-text';
  if (name.includes('terminal') || name.includes('bash')) return 'terminal';

  return 'chevron-right';
}

export function CommandPalette({
  visible,
  commands,
  loading,
  filter,
  onSelect,
  onClose,
}: CommandPaletteProps) {
  const { colors } = useTheme();

  // Filter commands based on user input (without the leading /)
  const filteredCommands = useMemo(() => {
    const cleanFilter = filter.replace(/^\//, '').toLowerCase();

    if (!cleanFilter) return commands;

    return commands.filter(cmd =>
      cmd.name.toLowerCase().includes(cleanFilter) ||
      cmd.description?.toLowerCase().includes(cleanFilter)
    );
  }, [commands, filter]);

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgCard,
          borderTopColor: colors.border,
        }
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Commands
        </Text>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
          <Icon name="chevron-down" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textMuted }]}>
            Loading commands...
          </Text>
        </View>
      ) : filteredCommands.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="inbox" size={32} color={colors.textMuted} />
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            {filter ? 'No matching commands' : 'No commands available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCommands}
          keyExtractor={(item) => item.name}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.commandItem, { borderBottomColor: colors.border }]}
              onPress={() => onSelect(item)}
              activeOpacity={0.7}
            >
              <View style={[styles.commandIcon, { backgroundColor: colors.accent + '20' }]}>
                <Icon name={getCommandIcon(item)} size={18} color={colors.accent} />
              </View>
              <View style={styles.commandInfo}>
                <View style={styles.commandNameRow}>
                  <Text style={[styles.commandSlash, { color: colors.textMuted }]}>/</Text>
                  <Text style={[styles.commandName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                </View>
                {item.description && (
                  <Text
                    style={[styles.commandDescription, { color: colors.textSecondary }]}
                    numberOfLines={1}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
              <Icon name="chevron-right" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: MAX_HEIGHT,
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    ...typography.bodyMedium,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
  commandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: spacing.md,
  },
  commandIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commandInfo: {
    flex: 1,
    gap: 2,
  },
  commandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commandSlash: {
    ...typography.bodyMedium,
    fontFamily: 'monospace',
  },
  commandName: {
    ...typography.bodyMedium,
    fontFamily: 'monospace',
  },
  commandDescription: {
    ...typography.small,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  loadingText: {
    ...typography.small,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.body,
  },
});
