import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';
import { alerts } from '../data/mockData';
import { Alert } from '../types';

const alertConfig: Record<
  Alert['type'],
  { color: string; bgColor: string; icon: string; label: string }
> = {
  critical: { color: Colors.danger, bgColor: Colors.danger + '22', icon: 'alert-octagon', label: 'Critical' },
  warning: { color: Colors.warning, bgColor: Colors.warning + '22', icon: 'alert-triangle', label: 'Warning' },
  success: { color: Colors.positive, bgColor: Colors.positive + '22', icon: 'check-circle', label: 'Success' },
  info: { color: Colors.info, bgColor: Colors.info + '22', icon: 'info', label: 'Info' },
};

const FILTERS = ['All', 'Critical', 'Warning', 'Info', 'Success'];

export default function AlertsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [alertList, setAlertList] = useState(alerts);

  const unreadCount = alertList.filter((a) => !a.read).length;

  const filtered = activeFilter === 'All'
    ? alertList
    : alertList.filter((a) => a.type === activeFilter.toLowerCase());

  const markAllRead = () => {
    setAlertList((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const markRead = (id: string) => {
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pulse Alerts</Text>
          <Text style={styles.headerSub}>
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </Text>
        </View>
        <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
          <Feather name="check-circle" size={14} color={Colors.accent} />
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Summary cards */}
      <View style={styles.summaryRow}>
        {[
          { type: 'critical', count: alertList.filter((a) => a.type === 'critical').length },
          { type: 'warning', count: alertList.filter((a) => a.type === 'warning').length },
          { type: 'info', count: alertList.filter((a) => a.type === 'info').length },
          { type: 'success', count: alertList.filter((a) => a.type === 'success').length },
        ].map((item) => {
          const cfg = alertConfig[item.type as Alert['type']];
          return (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.summaryCard,
                activeFilter.toLowerCase() === item.type && {
                  borderColor: cfg.color,
                  backgroundColor: cfg.bgColor,
                },
              ]}
              onPress={() =>
                setActiveFilter(
                  activeFilter.toLowerCase() === item.type
                    ? 'All'
                    : item.type.charAt(0).toUpperCase() + item.type.slice(1)
                )
              }
            >
              <Feather name={cfg.icon as any} size={18} color={cfg.color} />
              <Text style={[styles.summaryCount, { color: cfg.color }]}>{item.count}</Text>
              <Text style={styles.summaryLabel}>{cfg.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filters}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Alerts list */}
      <View style={styles.alertsList}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="bell-off" size={32} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No alerts in this category</Text>
          </View>
        ) : (
          filtered.map((alert, i) => {
            const cfg = alertConfig[alert.type];
            return (
              <TouchableOpacity
                key={alert.id}
                style={[
                  styles.alertCard,
                  !alert.read && styles.alertCardUnread,
                  !alert.read && { borderLeftColor: cfg.color },
                ]}
                onPress={() => markRead(alert.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.alertIconWrap, { backgroundColor: cfg.bgColor }]}>
                  <Feather name={cfg.icon as any} size={18} color={cfg.color} />
                </View>
                <View style={styles.alertBody}>
                  <View style={styles.alertTopRow}>
                    <View style={[styles.alertTypeBadge, { backgroundColor: cfg.bgColor }]}>
                      <Text style={[styles.alertTypeText, { color: cfg.color }]}>
                        {cfg.label}
                      </Text>
                    </View>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                    {!alert.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '800',
  },
  headerSub: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  markAllText: {
    color: Colors.accent,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  summaryCount: {
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  summaryLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  filtersScroll: {
    marginBottom: Spacing.sm,
  },
  filters: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingRight: Spacing.md,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  filterChipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  filterText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.background,
    fontWeight: '700',
  },
  alertsList: {
    gap: Spacing.sm,
  },
  alertCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderLeftWidth: 1,
  },
  alertCardUnread: {
    borderLeftWidth: 3,
  },
  alertIconWrap: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  alertBody: {
    flex: 1,
  },
  alertTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  alertTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  alertTypeText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  alertTime: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  alertTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  alertMessage: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xxl,
    gap: Spacing.md,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
