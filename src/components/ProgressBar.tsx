import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius } from '../theme';

interface ProgressBarProps {
  label: string;
  value: number;
  target?: number;
  maxValue?: number;
  color: string;
  showPercent?: boolean;
  suffix?: string;
}

export default function ProgressBar({
  label,
  value,
  target,
  maxValue = 100,
  color,
  showPercent = true,
  suffix = '%',
}: ProgressBarProps) {
  const progress = Math.min((value / maxValue) * 100, 100);
  const isAboveTarget = target ? value >= target : true;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueRow}>
          {target ? (
            <Text style={styles.target}>Target: {target}{suffix}  </Text>
          ) : null}
          <Text style={[styles.value, { color: isAboveTarget ? Colors.positive : Colors.negative }]}>
            {value}{suffix}
          </Text>
        </View>
      </View>
      <View style={styles.track}>
        {target ? (
          <View style={[styles.targetLine, { left: `${(target / maxValue) * 100}%` as any }]} />
        ) : null}
        <View style={[styles.fill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm + 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  value: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  target: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  track: {
    height: 8,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.round,
    overflow: 'visible',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.round,
  },
  targetLine: {
    position: 'absolute',
    width: 2,
    height: 12,
    top: -2,
    backgroundColor: Colors.warning,
    zIndex: 1,
  },
});
