export interface KPICard {
  title: string;
  value: string;
  change: number; // percentage change
  changeLabel: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  performance: number;
  status: 'active' | 'leave' | 'remote';
}
