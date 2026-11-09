import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';
import KPICard from '../components/KPICard';
import SectionHeader from '../components/SectionHeader';
import {
  financialKPIs,
  revenueChartData,
  expenseBreakdown,
  monthlyPLData,
} from '../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 2;

const PERIODS = ['1M', '3M', '6M', 'YTD', '1Y'];

export default function FinancialScreen() {
  const [activePeriod, setActivePeriod] = useState('6M');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, CEO</Text>
          <Text style={styles.headerTitle}>Financial Overview</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.dateBadge}>
            <Feather name="calendar" size={12} color={Colors.accent} />
            <Text style={styles.dateText}>Q2 2026</Text>
          </View>
        </View>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {PERIODS.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodBtn, activePeriod === p && styles.periodBtnActive]}
            onPress={() => setActivePeriod(p)}
          >
            <Text style={[styles.periodText, activePeriod === p && styles.periodTextActive]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* KPI Cards */}
      <SectionHeader title="Key Metrics" subtitle="vs. previous period" />
      <View style={styles.kpiGrid}>
        {financialKPIs.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </View>

      {/* Revenue Chart */}
      <SectionHeader title="Revenue Trend" subtitle="Monthly revenue in millions" />
      <View style={styles.chartCard}>
        <LineChart
          data={revenueChartData}
          width={CHART_WIDTH - Spacing.md * 2}
          height={180}
          chartConfig={{
            backgroundColor: Colors.surface,
            backgroundGradientFrom: Colors.surface,
            backgroundGradientTo: Colors.surface,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 200, 160, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: Colors.accent,
            },
            propsForBackgroundLines: {
              stroke: Colors.surfaceBorder,
            },
          }}
          bezier
          style={styles.chart}
          withInnerLines
          withOuterLines={false}
          withVerticalLines={false}
        />
      </View>

      {/* P&L Trend */}
      <SectionHeader title="Net Profit Trend" subtitle="Monthly profit in thousands" />
      <View style={styles.chartCard}>
        <LineChart
          data={monthlyPLData}
          width={CHART_WIDTH - Spacing.md * 2}
          height={160}
          chartConfig={{
            backgroundColor: Colors.surface,
            backgroundGradientFrom: Colors.surface,
            backgroundGradientTo: Colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#6366F1',
            },
            propsForBackgroundLines: {
              stroke: Colors.surfaceBorder,
            },
          }}
          bezier
          style={styles.chart}
          withInnerLines
          withOuterLines={false}
          withVerticalLines={false}
        />
      </View>

      {/* Expense Breakdown */}
      <SectionHeader title="Expense Breakdown" subtitle="by category" />
      <View style={styles.expenseCard}>
        {expenseBreakdown.map((item, i) => (
          <View key={i} style={styles.expenseRow}>
            <View style={styles.expenseLeft}>
              <View style={[styles.expenseDot, { backgroundColor: item.color }]} />
              <Text style={styles.expenseName}>{item.name}</Text>
            </View>
            <View style={styles.expenseRight}>
              <View style={styles.expenseBarTrack}>
                <View
                  style={[
                    styles.expenseBarFill,
                    { width: `${item.value}%`, backgroundColor: item.color },
                  ]}
                />
              </View>
              <Text style={styles.expensePercent}>{item.value}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Financial Health Score */}
      <SectionHeader title="Financial Health Score" />
      <View style={styles.healthCard}>
        <View style={styles.healthScoreRow}>
          <View style={styles.healthScoreContainer}>
            <Text style={styles.healthScore}>82</Text>
            <Text style={styles.healthScoreLabel}>/ 100</Text>
          </View>
          <View style={styles.healthMeta}>
            <Text style={styles.healthBadge}>Good</Text>
            <Text style={styles.healthDesc}>
              Your financial health is strong. Focus on improving cash flow reserves to reach Excellent status.
            </Text>
          </View>
        </View>
        <View style={styles.healthBreakdown}>
          {[
            { label: 'Liquidity', score: 78, color: '#3B82F6' },
            { label: 'Profitability', score: 86, color: '#10B981' },
            { label: 'Solvency', score: 91, color: '#00C8A0' },
            { label: 'Efficiency', score: 74, color: '#F59E0B' },
          ].map((item, i) => (
            <View key={i} style={styles.healthItem}>
              <View style={styles.healthItemTrack}>
                <View
                  style={[
                    styles.healthItemFill,
                    { height: `${item.score}%`, backgroundColor: item.color },
                  ]}
                />
              </View>
              <Text style={styles.healthItemScore}>{item.score}</Text>
              <Text style={styles.healthItemLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
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
  greeting: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginBottom: 2,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '800',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent + '22',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  dateText: {
    color: Colors.accent,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: 4,
    marginBottom: Spacing.sm,
  },
  periodBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  periodBtnActive: {
    backgroundColor: Colors.accent,
  },
  periodText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  periodTextActive: {
    color: Colors.background,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  chart: {
    marginLeft: -Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  expenseCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: Spacing.sm,
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
  },
  expenseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.sm,
  },
  expenseName: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  expenseRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  expenseBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  expenseBarFill: {
    height: '100%',
    borderRadius: BorderRadius.round,
  },
  expensePercent: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '700',
    width: 36,
    textAlign: 'right',
  },
  healthCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  healthScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  healthScore: {
    color: Colors.accent,
    fontSize: 56,
    fontWeight: '800',
    lineHeight: 64,
  },
  healthScoreLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.lg,
    marginLeft: 4,
  },
  healthMeta: {
    flex: 1,
  },
  healthBadge: {
    color: Colors.accent,
    fontSize: FontSize.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  healthDesc: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
  healthBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    alignItems: 'flex-end',
  },
  healthItem: {
    alignItems: 'center',
    gap: 4,
  },
  healthItemTrack: {
    width: 32,
    height: 70,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  healthItemFill: {
    width: '100%',
    borderRadius: BorderRadius.sm,
  },
  healthItemScore: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  healthItemLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
