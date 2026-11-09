import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';
import KPICard from '../components/KPICard';
import SectionHeader from '../components/SectionHeader';
import { salesKPIs, salesPipelineData, topCustomers } from '../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 2;

const salesChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{ data: [680, 750, 820, 710, 890, 980] }],
};

export default function SalesScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sales Dashboard</Text>
        <View style={styles.badge}>
          <Feather name="trending-up" size={12} color={Colors.info} />
          <Text style={styles.badgeText}>Live</Text>
        </View>
      </View>

      {/* KPIs */}
      <SectionHeader title="Sales KPIs" subtitle="Current quarter performance" />
      <View style={styles.kpiGrid}>
        {salesKPIs.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </View>

      {/* Monthly Sales Chart */}
      <SectionHeader title="Monthly Sales" subtitle="Revenue in thousands" />
      <View style={styles.chartCard}>
        <BarChart
          data={salesChartData}
          width={CHART_WIDTH - Spacing.md * 2}
          height={180}
          yAxisLabel="$"
          yAxisSuffix="K"
          chartConfig={{
            backgroundColor: Colors.surface,
            backgroundGradientFrom: Colors.surface,
            backgroundGradientTo: Colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
            barPercentage: 0.65,
            propsForBackgroundLines: {
              stroke: Colors.surfaceBorder,
            },
          }}
          style={styles.chart}
          withInnerLines
          showValuesOnTopOfBars={false}
        />
      </View>

      {/* Sales Pipeline */}
      <SectionHeader title="Sales Pipeline" subtitle="Active deals by stage" />
      <View style={styles.pipelineCard}>
        {salesPipelineData.map((stage, i) => {
          const maxCount = Math.max(...salesPipelineData.map((s) => s.count));
          const widthPercent = (stage.count / maxCount) * 100;
          return (
            <View key={i} style={styles.pipelineRow}>
              <Text style={styles.pipelineStage}>{stage.stage}</Text>
              <View style={styles.pipelineBarContainer}>
                <View style={styles.pipelineTrack}>
                  <View
                    style={[
                      styles.pipelineFill,
                      {
                        width: `${widthPercent}%`,
                        backgroundColor: stage.color,
                      },
                    ]}
                  />
                </View>
                <View style={styles.pipelineMeta}>
                  <Text style={[styles.pipelineCount, { color: stage.color }]}>
                    {stage.count}
                  </Text>
                  <Text style={styles.pipelineValue}>{stage.value}</Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Funnel total */}
        <View style={styles.pipelineTotals}>
          <View style={styles.pipelineTotalItem}>
            <Text style={styles.pipelineTotalValue}>208</Text>
            <Text style={styles.pipelineTotalLabel}>Total Deals</Text>
          </View>
          <View style={styles.pipelineDivider} />
          <View style={styles.pipelineTotalItem}>
            <Text style={styles.pipelineTotalValue}>$6.99M</Text>
            <Text style={styles.pipelineTotalLabel}>Pipeline Value</Text>
          </View>
          <View style={styles.pipelineDivider} />
          <View style={styles.pipelineTotalItem}>
            <Text style={[styles.pipelineTotalValue, { color: Colors.accent }]}>
              64%
            </Text>
            <Text style={styles.pipelineTotalLabel}>Win Rate</Text>
          </View>
        </View>
      </View>

      {/* Top Customers */}
      <SectionHeader title="Top Customers" subtitle="by revenue contribution" actionLabel="View all" />
      <View style={styles.customersCard}>
        {topCustomers.map((customer, i) => {
          const isPositive = customer.growth >= 0;
          return (
            <View key={i} style={[styles.customerRow, i < topCustomers.length - 1 && styles.customerBorder]}>
              <View style={styles.customerRank}>
                <Text style={styles.rankText}>{i + 1}</Text>
              </View>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{customer.name}</Text>
                <View style={styles.customerMeta}>
                  <View style={styles.segmentBadge}>
                    <Text style={styles.segmentText}>{customer.segment}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.customerRevenue}>
                <Text style={styles.revenueText}>{customer.revenue}</Text>
                <View style={styles.growthRow}>
                  <Feather
                    name={isPositive ? 'arrow-up-right' : 'arrow-down-right'}
                    size={12}
                    color={isPositive ? Colors.positive : Colors.negative}
                  />
                  <Text
                    style={[
                      styles.growthText,
                      { color: isPositive ? Colors.positive : Colors.negative },
                    ]}
                  >
                    {Math.abs(customer.growth)}%
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
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
  pipelineCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: Spacing.sm,
  },
  pipelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pipelineStage: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    width: 100,
  },
  pipelineBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pipelineTrack: {
    flex: 1,
    height: 10,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  pipelineFill: {
    height: '100%',
    borderRadius: BorderRadius.round,
  },
  pipelineMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 80,
  },
  pipelineCount: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    width: 24,
  },
  pipelineValue: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  pipelineTotals: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  pipelineTotalItem: {
    flex: 1,
    alignItems: 'center',
  },
  pipelineTotalValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  pipelineTotalLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  pipelineDivider: {
    width: 1,
    backgroundColor: Colors.surfaceBorder,
  },
  customersCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  customerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  customerRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  customerMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  segmentBadge: {
    backgroundColor: Colors.info + '22',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  segmentText: {
    color: Colors.info,
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
  customerRevenue: {
    alignItems: 'flex-end',
  },
  revenueText: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  growthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  growthText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
