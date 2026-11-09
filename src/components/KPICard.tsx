import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export default function KPICard({ title, value, change, changeLabel, icon, color }: KPICardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? Colors.positive : Colors.negative;
  const changeIcon = isPositive ? 'arrow-up-right' : 'arrow-down-right';

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color + '22' }]}>
        <Feather name={icon as any} size={18} color={color} />
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.changeRow}>
        <Feather name={changeIcon as any} size={12} color={changeColor} />
        <Text style={[styles.changeText, { color: changeColor }]}>
          {Math.abs(change)}%
        </Text>
        <Text style={styles.changeLabel}> {changeLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flex: 1,
    minWidth: '47%',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginBottom: 4,
  },
  value: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '700',
    marginBottom: 6,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginLeft: 2,
  },
  changeLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
