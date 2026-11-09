import { Alert, TeamMember } from '../types';

export const financialKPIs = [
  {
    title: 'Total Revenue',
    value: '$4.82M',
    change: 12.4,
    changeLabel: 'vs last month',
    icon: 'trending-up',
    color: '#10B981',
  },
  {
    title: 'Net Profit',
    value: '$1.23M',
    change: 8.7,
    changeLabel: 'vs last month',
    icon: 'dollar-sign',
    color: '#00C8A0',
  },
  {
    title: 'Total Expenses',
    value: '$3.59M',
    change: -3.2,
    changeLabel: 'vs last month',
    icon: 'credit-card',
    color: '#EF4444',
  },
  {
    title: 'Cash Flow',
    value: '$980K',
    change: 15.1,
    changeLabel: 'vs last month',
    icon: 'activity',
    color: '#6366F1',
  },
];

export const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [3.2, 3.5, 3.8, 4.1, 4.5, 4.82],
      color: (opacity = 1) => `rgba(0, 200, 160, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

export const expenseBreakdown = [
  { name: 'Operations', value: 35, color: '#6366F1' },
  { name: 'Payroll', value: 28, color: '#F59E0B' },
  { name: 'Marketing', value: 18, color: '#EC4899' },
  { name: 'R&D', value: 12, color: '#3B82F6' },
  { name: 'Other', value: 7, color: '#94A3B8' },
];

export const monthlyPLData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [820, 940, 760, 1050, 1120, 1230],
      color: (opacity = 1) => `rgba(0, 200, 160, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

export const salesKPIs = [
  {
    title: 'Total Sales',
    value: '$5.1M',
    change: 9.3,
    changeLabel: 'vs last quarter',
    icon: 'shopping-cart',
    color: '#3B82F6',
  },
  {
    title: 'New Clients',
    value: '147',
    change: 22.5,
    changeLabel: 'vs last month',
    icon: 'users',
    color: '#10B981',
  },
  {
    title: 'Win Rate',
    value: '64%',
    change: 5.0,
    changeLabel: 'vs last quarter',
    icon: 'target',
    color: '#F59E0B',
  },
  {
    title: 'Avg Deal Size',
    value: '$34.7K',
    change: -1.8,
    changeLabel: 'vs last month',
    icon: 'briefcase',
    color: '#8B5CF6',
  },
];

export const salesPipelineData = [
  { stage: 'Prospecting', count: 84, value: '$2.1M', color: '#6366F1' },
  { stage: 'Qualified', count: 52, value: '$1.8M', color: '#3B82F6' },
  { stage: 'Proposal', count: 31, value: '$1.4M', color: '#F59E0B' },
  { stage: 'Negotiation', count: 18, value: '$890K', color: '#EC4899' },
  { stage: 'Closed Won', count: 23, value: '$800K', color: '#10B981' },
];

export const topCustomers = [
  { name: 'Meridian Corp', revenue: '$420K', growth: 18.2, segment: 'Enterprise' },
  { name: 'Atlas Holdings', revenue: '$385K', growth: 12.4, segment: 'Enterprise' },
  { name: 'Vanguard Tech', revenue: '$297K', growth: 24.7, segment: 'Mid-Market' },
  { name: 'Nexus Group', revenue: '$245K', growth: -3.1, segment: 'Mid-Market' },
  { name: 'Prism Digital', revenue: '$198K', growth: 31.5, segment: 'SMB' },
];

export const operationsKPIs = [
  {
    title: 'Efficiency Score',
    value: '87.4%',
    change: 2.1,
    changeLabel: 'vs last month',
    icon: 'zap',
    color: '#F59E0B',
  },
  {
    title: 'On-Time Delivery',
    value: '94.2%',
    change: 1.8,
    changeLabel: 'vs last month',
    icon: 'check-circle',
    color: '#10B981',
  },
  {
    title: 'Inventory Turns',
    value: '8.3x',
    change: -0.4,
    changeLabel: 'vs last quarter',
    icon: 'refresh-cw',
    color: '#6366F1',
  },
  {
    title: 'Cost per Unit',
    value: '$42.80',
    change: -4.5,
    changeLabel: 'vs last month',
    icon: 'package',
    color: '#00C8A0',
  },
];

export const departmentPerformance = [
  { dept: 'Production', score: 91, target: 90, color: '#10B981' },
  { dept: 'Logistics', score: 86, target: 92, color: '#F59E0B' },
  { dept: 'Quality', score: 94, target: 90, color: '#10B981' },
  { dept: 'Procurement', score: 78, target: 85, color: '#EF4444' },
  { dept: 'Support', score: 89, target: 88, color: '#10B981' },
];

export const teamKPIs = [
  {
    title: 'Total Headcount',
    value: '342',
    change: 4.3,
    changeLabel: 'YoY growth',
    icon: 'users',
    color: '#3B82F6',
  },
  {
    title: 'Retention Rate',
    value: '91.5%',
    change: 2.1,
    changeLabel: 'vs last year',
    icon: 'heart',
    color: '#10B981',
  },
  {
    title: 'Avg Performance',
    value: '84.2',
    change: 3.5,
    changeLabel: 'vs last quarter',
    icon: 'award',
    color: '#F59E0B',
  },
  {
    title: 'Open Positions',
    value: '28',
    change: -12.5,
    changeLabel: 'vs last month',
    icon: 'user-plus',
    color: '#8B5CF6',
  },
];

export const departmentHeadcount = [
  { dept: 'Engineering', count: 98, percent: 28.7 },
  { dept: 'Sales', count: 72, percent: 21.1 },
  { dept: 'Operations', count: 65, percent: 19.0 },
  { dept: 'Marketing', count: 42, percent: 12.3 },
  { dept: 'Finance', count: 28, percent: 8.2 },
  { dept: 'HR & Admin', count: 37, percent: 10.8 },
];

export const topPerformers: TeamMember[] = [
  { id: '1', name: 'Sarah Chen', role: 'VP Engineering', department: 'Engineering', performance: 97, status: 'active' },
  { id: '2', name: 'Marcus Johnson', role: 'Sales Director', department: 'Sales', performance: 95, status: 'active' },
  { id: '3', name: 'Leila Ahmadi', role: 'Product Lead', department: 'Engineering', performance: 94, status: 'remote' },
  { id: '4', name: 'David Okonkwo', role: 'Head of Ops', department: 'Operations', performance: 92, status: 'active' },
  { id: '5', name: 'Ana Torres', role: 'CMO', department: 'Marketing', performance: 91, status: 'active' },
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Cash Flow Alert',
    message: 'Cash reserves projected below 60-day threshold by end of Q3. Immediate review recommended.',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Logistics Underperforming',
    message: 'On-time delivery in Logistics dept has dropped below target (86% vs 92% goal).',
    time: '18 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Q2 Revenue Target Hit',
    message: 'Q2 revenue has exceeded the $4.5M target. Total achieved: $4.82M (+7.1%).',
    time: '1 hr ago',
    read: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'Board Meeting Prep',
    message: 'Q3 board presentation materials are ready for your review before Thursday.',
    time: '3 hr ago',
    read: true,
  },
  {
    id: '5',
    type: 'warning',
    title: 'Key Account Risk',
    message: 'Nexus Group (-3.1% revenue) has requested a contract review meeting.',
    time: '5 hr ago',
    read: true,
  },
  {
    id: '6',
    type: 'info',
    title: 'New Hire Onboarding',
    message: '14 new employees started this week across Engineering and Sales teams.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '7',
    type: 'critical',
    title: 'Procurement Shortfall',
    message: 'Procurement performance at 78% vs 85% target. Supply chain disruption possible.',
    time: 'Yesterday',
    read: true,
  },
];
