export type UserRole = 'CITIZEN' | 'FIELD_EMPLOYEE' | 'GOVERNMENT';

export type StreetlightStatus = 'OPERATIONAL' | 'FAULTY' | 'MAINTENANCE' | 'RECENTLY_REPAIRED';
export type PowerStatus = 'ON' | 'OFF' | 'DIMMED' | 'FAULT';

export interface Streetlight {
  id: string; // e.g. SL-204
  location: string; // e.g. North Avenue, Ward 12
  latitude: number;
  longitude: number;
  status: StreetlightStatus;
  powerStatus: PowerStatus;
  brightness: number; // percentage 0-100
  energyConsumption: number; // in kWh, e.g. 0.85
  temperature: number; // Celsius, e.g. 38
  operatingHours: number; // total hours
  lastMaintenance: string; // ISO date or formatted
  assignedEmployee: string; // Employee ID e.g. EB-1042
  area: string; // e.g. Ward 12
  cameraId?: string; // e.g. CAM-1204
  complaintCount: number;
  healthScore: number; // 0-100%
  poleType?: string;
  voltage?: number; // Volts e.g. 230
  installedDate?: string;
  maintenanceHistory?: MaintenanceRecord[];
}

export type ComplaintPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ComplaintStatus = 'FILED' | 'ANALYZED' | 'ASSIGNED' | 'ACCEPTED' | 'MAINTENANCE' | 'RESOLVED';
export type ComplaintCategory = 
  | 'Streetlight not working'
  | 'Flickering'
  | 'Dim light'
  | 'Damaged pole'
  | 'Wiring issue'
  | 'Other civic issue';

export interface ComplaintAIAnalysis {
  detectedIssue: string;
  confidence: number; // 0-100 percentage
  suggestedPriority: ComplaintPriority;
  electricalHazardRisk: 'None' | 'Low' | 'Moderate' | 'Critical';
  recommendedAction: string;
  timestamp?: string;
}

export interface MaintenanceRecord {
  id: string;
  streetlightId: string;
  complaintId?: string;
  issueFound: string;
  repairPerformed: string;
  partsReplaced: string;
  maintenanceNotes: string;
  beforeImage?: string;
  afterImage?: string;
  repairDate: string;
  repairTime: string;
  employeeId: string;
  employeeName: string;
  finalCondition: 'Optimal' | 'Satisfactory' | 'Follow-up Needed';
}

export interface Complaint {
  id: string; // CMP-20481
  citizen: {
    name: string;
    phone: string;
    email: string;
  };
  streetlightId: string;
  location: string;
  latitude: number;
  longitude: number;
  category: ComplaintCategory;
  description: string;
  image?: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  assignedEmployee: string; // Employee ID
  createdAt: string;
  updatedAt: string;
  aiAnalysis?: ComplaintAIAnalysis;
  maintenanceHistory?: MaintenanceRecord[];
}

export type EmployeeStatus = 'Available' | 'Working' | 'Offline';

export interface Employee {
  id: string; // EB-1042
  name: string;
  department: string; // e.g. EB Field Operations / Electrical
  area: string; // Ward 12
  status: EmployeeStatus;
  assignedStreetlights: number;
  activeTasks: number;
  completedRepairs: number;
  pendingRepairs: number;
  location: string;
  phone: string;
  email: string;
  avatar?: string;
}

export interface Camera {
  id: string; // CAM-1204
  streetlightId: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'ONLINE' | 'RECORDING' | 'MAINTENANCE' | 'OFFLINE';
  streamUrl?: string;
  lastActive: string;
  aiStatus: {
    streetlightDetected: boolean;
    poleCondition: 'Normal' | 'Damaged' | 'Tilt Warning' | 'Critical Inspection';
    activityLevel: 'Low' | 'Moderate' | 'High';
    visibility: 'Good' | 'Fair' | 'Poor (Fog/Dust)';
    lastScanTime: string;
  };
}

export interface WardArea {
  id: string; // W-12
  name: string; // Ward 12 - Tech Corridor
  streetlightsCount: number;
  operationalCount: number;
  faultyCount: number;
  maintenanceCount: number;
  complaintsCount: number;
  representativeId: string;
  representativeName: string;
  energyUsageTodayKWh: number;
  efficiencyScore: number; // percentage
  coordinates: [number, number]; // center
}

export type InsightCategory = 'Infrastructure' | 'Energy' | 'Maintenance' | 'Complaints' | 'Operations';

export interface AIInsight {
  id: string;
  category: InsightCategory;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  impactWard?: string;
  metrics?: string;
  recommendation: string;
  confidenceScore: number;
  timestamp: string;
}

export interface GlobalNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'critical';
  targetRole?: UserRole | 'ALL';
  link?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  address: string;
  registeredLocation: string;
  avatarUrl?: string;
  stats?: {
    complaintsFiled?: number;
    resolved?: number;
    active?: number;
    reports?: number;
  };
}
