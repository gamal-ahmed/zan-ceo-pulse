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
import { teamKPIs, departmentHeadcount, topPerformers } from '../data/mockData';

const statusColors: Record<string, string> = {
  active: Colors.positive,
  remote: Colors.info,
  leave: Colors.warning,
};

const statusLabels: Record<string, string> = {
  active: 'On-site',
  remote: 'Remote',
  leave: 'On leave',
};

export default function TeamScreen() {
  const totalHeadcount = departmentHeadcount.reduce((sum, d) => sum + d.count, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>People & Team</Text>
        <View style={styles.badge}>
          <Feather name="users" size={12} color={Colors.info} />
          <Text style={styles.badgeText}>342 Employees</Text>
        </View>
      </View>

      {/* KPIs */}
      <SectionHeader title="HR Metrics" />
      <View style={styles.kpiGrid}>
        {teamKPIs.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </View>

      {/* Department Headcount */}
      <SectionHeader title="Department Breakdown" subtitle={`${totalHeadcount} total employees`} />
      <View style={styles.card}>
        {departmentHeadcount.map((dept, i) => {
          const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#6366F1'];
          const color = colors[i % colors.length];
          return (
            <View key={i} style={styles.deptRow}>
              <View style={styles.deptLeft}>
                <View style={[styles.deptDot, { backgroundColor: color }]} />
                <Text style={styles.deptName}>{dept.dept}</Text>
              </View>
              <View style={styles.deptRight}>
                <View style={styles.deptBarTrack}>
                  <View
                    style={[
                      styles.deptBarFill,
                      { width: `${dept.percent}%`, backgroundColor: color },
                    ]}
                  />
                </View>
                <Text style={styles.deptCount}>{dept.count}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Workforce Summary */}
      <SectionHeader title="Workforce Status" />
      <View style={styles.workforceCard}>
        {[
          { label: 'On-site Today', value: 198, percent: '57.9%', icon: 'users', color: Colors.positive },
          { label: 'Remote Today', value: 112, percent: '32.7%', icon: 'wifi', color: Colors.info },
          { label: 'On Leave', value: 32, percent: '9.4%', icon: 'moon', color: Colors.warning },
        ].map((item, i) => (
          <View key={i} style={[styles.workforceItem, i > 0 && styles.workforceDivider]}>
            <View style={[styles.workforceIcon, { backgroundColor: item.color + '22' }]}>
              <Feather name={item.icon as any} size={18} color={item.color} />
            </View>
            <Text style={styles.workforceValue}>{item.value}</Text>
            <Text style={styles.workforcePercent}>{item.percent}</Text>
            <Text style={styles.workforceLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Top Performers */}
      <SectionHeader title="Top Performers" subtitle="This quarter" actionLabel="See all" />
      <View style={styles.performersCard}>
        {topPerformers.map((person, i) => (
          <View
            key={person.id}
            style={[styles.performerRow, i < topPerformers.length - 1 && styles.performerBorder]}
          >
            {/* Avatar */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {person.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.performerInfo}>
              <Text style={styles.performerName}>{person.name}</Text>
              <Text style={styles.performerRole}>{person.role}</Text>
            </View>
            <View style={styles.performerRight}>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    {
                      width: `${person.performance}%`,
                      backgroundColor: person.performance >= 90 ? Colors.positive : Colors.warning,
                    },
                  ]}
                />
              </View>
              <Text style={styles.performanceScore}>{person.performance}</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColors[person.status] + '22' },
                ]}
              >
                <Text style={[styles.statusText, { color: statusColors[person.status] }]}>
                  {statusLabels[person.status]}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Hiring Pipeline */}
      <SectionHeader title="Hiring Pipeline" subtitle="28 open positions" />
      <View style={styles.card}>
        {[
          { stage: 'Applications', count: 184, icon: 'file-text' },
          { stage: 'Screening', count: 47, icon: 'search' },
          { stage: 'Interviews', count: 23, icon: 'message-square' },
          { stage: 'Offers Sent', count: 8, icon: 'send' },
          { stage: 'Offers Accepted', count: 5, icon: 'check-circle' },
        ].map((stage, i) => (
          <View key={i} style={[styles.hiringRow, i < 4 && styles.hiringBorder]}>
            <Feather name={stage.icon as any} size={16} color={Colors.textSecondary} />
            <Text style={styles.hiringStage}>{stage.stage}</Text>
            <View style={styles.hiringCountBadge}>
              <Text style={styles.hiringCount}>{stage.count}</Text>
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
    backgroundColor: Colors.info + '22',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  badgeText: {
    color: Colors.info,
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
  deptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  deptLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    gap: Spacing.sm,
  },
  deptDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  deptName: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  deptRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  deptBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  deptBarFill: {
    height: '100%',
    borderRadius: BorderRadius.round,
  },
  deptCount: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '700',
    width: 30,
    textAlign: 'right',
  },
  workforceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    flexDirection: 'row',
  },
  workforceItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  workforceDivider: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.surfaceBorder,
  },
  workforceIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  workforceValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  workforcePercent: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  workforceLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    textAlign: 'center',
  },
  performersCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  performerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  performerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  performerRole: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  performerRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  scoreBar: {
    width: 60,
    height: 4,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: BorderRadius.round,
  },
  performanceScore: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '800',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
  hiringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  hiringBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  hiringStage: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  hiringCountBadge: {
    backgroundColor: Colors.surfaceBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
  },
  hiringCount: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
