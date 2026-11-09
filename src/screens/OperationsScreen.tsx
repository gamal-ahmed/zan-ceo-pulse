import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';
import KPICard from '../components/KPICard';
import SectionHeader from '../components/SectionHeader';
import ProgressBar from '../components/ProgressBar';
import { operationsKPIs, departmentPerformance } from '../data/mockData';

const supplyChainSteps = [
  { label: 'Procurement', status: 'warning', icon: 'shopping-bag', value: '78%' },
  { label: 'Production', status: 'ok', icon: 'settings', value: '91%' },
  { label: 'Quality Check', status: 'ok', icon: 'check-square', value: '94%' },
  { label: 'Logistics', status: 'warning', icon: 'truck', value: '86%' },
  { label: 'Delivery', status: 'ok', icon: 'package', value: '94.2%' },
];

const inventoryItems = [
  { category: 'Raw Materials', stock: 68, reorder: 25, unit: '%', color: '#3B82F6' },
  { category: 'WIP', stock: 42, reorder: 20, unit: '%', color: '#F59E0B' },
  { category: 'Finished Goods', stock: 83, reorder: 30, unit: '%', color: '#10B981' },
  { category: 'Spare Parts', stock: 19, reorder: 25, unit: '%', color: '#EF4444' },
];

export default function OperationsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Operations</Text>
        <View style={styles.badge}>
          <Feather name="activity" size={12} color={Colors.warning} />
          <Text style={styles.badgeText}>2 Alerts</Text>
        </View>
      </View>

      {/* KPIs */}
      <SectionHeader title="Operations KPIs" />
      <View style={styles.kpiGrid}>
        {operationsKPIs.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </View>

      {/* Supply Chain Flow */}
      <SectionHeader title="Supply Chain" subtitle="Current operational status" />
      <View style={styles.supplyChainCard}>
        {supplyChainSteps.map((step, i) => (
          <React.Fragment key={i}>
            <View style={styles.supplyStep}>
              <View
                style={[
                  styles.supplyIconWrap,
                  {
                    backgroundColor:
                      step.status === 'ok'
                        ? Colors.positive + '22'
                        : Colors.warning + '22',
                  },
                ]}
              >
                <Feather
                  name={step.icon as any}
                  size={18}
                  color={step.status === 'ok' ? Colors.positive : Colors.warning}
                />
              </View>
              <Text style={styles.supplyLabel}>{step.label}</Text>
              <Text
                style={[
                  styles.supplyValue,
                  { color: step.status === 'ok' ? Colors.positive : Colors.warning },
                ]}
              >
                {step.value}
              </Text>
            </View>
            {i < supplyChainSteps.length - 1 && (
              <Feather name="arrow-right" size={14} color={Colors.surfaceBorder} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Department Performance */}
      <SectionHeader title="Department Performance" subtitle="vs. monthly targets" />
      <View style={styles.card}>
        {departmentPerformance.map((dept, i) => (
          <ProgressBar
            key={i}
            label={dept.dept}
            value={dept.score}
            target={dept.target}
            color={dept.color}
          />
        ))}
      </View>

      {/* Inventory Levels */}
      <SectionHeader title="Inventory Levels" subtitle="Current stock vs reorder point" />
      <View style={styles.card}>
        {inventoryItems.map((item, i) => {
          const isBelowReorder = item.stock <= item.reorder;
          return (
            <View key={i} style={styles.inventoryRow}>
              <View style={styles.inventoryLeft}>
                <Text style={styles.inventoryCategory}>{item.category}</Text>
                {isBelowReorder && (
                  <View style={styles.reorderBadge}>
                    <Feather name="alert-triangle" size={10} color={Colors.warning} />
                    <Text style={styles.reorderText}>Reorder</Text>
                  </View>
                )}
              </View>
              <View style={styles.inventoryRight}>
                <View style={styles.inventoryBarTrack}>
                  <View
                    style={[
                      styles.inventoryBarFill,
                      {
                        width: `${item.stock}%`,
                        backgroundColor: isBelowReorder ? Colors.warning : item.color,
                      },
                    ]}
                  />
                  {/* Reorder line */}
                  <View
                    style={[
                      styles.reorderLine,
                      { left: `${item.reorder}%` as any },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.inventoryValue,
                    { color: isBelowReorder ? Colors.warning : Colors.textPrimary },
                  ]}
                >
                  {item.stock}{item.unit}
                </Text>
              </View>
            </View>
          );
        })}
        <Text style={styles.reorderNote}>
          <Feather name="minus" size={10} color={Colors.warning} /> Dashed line = reorder point
        </Text>
      </View>

      {/* Key Action Items */}
      <SectionHeader title="Action Items" subtitle="Requires your attention" />
      <View style={styles.actionsCard}>
        {[
          {
            icon: 'alert-triangle',
            color: Colors.warning,
            title: 'Logistics Performance Below Target',
            desc: 'On-time delivery at 86% vs 92% goal. Review logistics partner SLAs.',
            priority: 'High',
          },
          {
            icon: 'alert-circle',
            color: Colors.danger,
            title: 'Spare Parts Stock Critical',
            desc: 'Spare parts at 19% — below the 25% reorder point. Raise PO immediately.',
            priority: 'Critical',
          },
          {
            icon: 'info',
            color: Colors.info,
            title: 'Procurement Improvement Plan Due',
            desc: 'Q3 procurement improvement plan was due last week. Awaiting submission.',
            priority: 'Medium',
          },
        ].map((action, i) => (
          <View key={i} style={[styles.actionItem, i > 0 && styles.actionBorder]}>
            <View style={[styles.actionIcon, { backgroundColor: action.color + '22' }]}>
              <Feather name={action.icon as any} size={16} color={action.color} />
            </View>
            <View style={styles.actionBody}>
              <View style={styles.actionTopRow}>
                <Text style={styles.actionTitle} numberOfLines={1}>{action.title}</Text>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        action.priority === 'Critical'
                          ? Colors.danger + '22'
                          : action.priority === 'High'
                          ? Colors.warning + '22'
                          : Colors.info + '22',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color:
                          action.priority === 'Critical'
                            ? Colors.danger
                            : action.priority === 'High'
                            ? Colors.warning
                            : Colors.info,
                      },
                    ]}
                  >
                    {action.priority}
                  </Text>
                </View>
              </View>
              <Text style={styles.actionDesc}>{action.desc}</Text>
            </View>
          </View>
        ))}
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
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '800',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning + '22',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  badgeText: {
    color: Colors.warning,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  supplyChainCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 4,
  },
  supplyStep: {
    alignItems: 'center',
    gap: 4,
  },
  supplyIconWrap: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplyLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    textAlign: 'center',
  },
  supplyValue: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  inventoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  inventoryLeft: {
    width: 110,
  },
  inventoryCategory: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginBottom: 2,
  },
  reorderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  reorderText: {
    color: Colors.warning,
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
  inventoryRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  inventoryBarTrack: {
    flex: 1,
    height: 10,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.round,
    overflow: 'visible',
  },
  inventoryBarFill: {
    height: '100%',
    borderRadius: BorderRadius.round,
  },
  reorderLine: {
    position: 'absolute',
    width: 2,
    height: 14,
    top: -2,
    backgroundColor: Colors.warning,
  },
  inventoryValue: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    width: 36,
    textAlign: 'right',
  },
  reorderNote: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.sm,
  },
  actionsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  actionBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actionBody: {
    flex: 1,
  },
  actionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  actionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  priorityText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  actionDesc: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
