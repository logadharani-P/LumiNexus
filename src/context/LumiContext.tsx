import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  Streetlight,
  Complaint,
  Employee,
  Camera,
  WardArea,
  AIInsight,
  GlobalNotification,
  UserProfile,
  MaintenanceRecord,
} from '../types';
import {
  initialStreetlights,
  initialComplaints,
  initialEmployees,
  initialCameras,
  initialWardAreas,
  initialAIInsights,
  initialNotifications,
  defaultUsers,
} from '../data/mockData';

interface LumiContextType {
  currentUser: UserProfile;
  role: UserRole;
  theme: 'dark' | 'light';
  streetlights: Streetlight[];
  complaints: Complaint[];
  employees: Employee[];
  cameras: Camera[];
  wardAreas: WardArea[];
  aiInsights: AIInsight[];
  notifications: GlobalNotification[];
  // Actions
  loginAs: (role: UserRole) => void;
  logout: () => void;
  toggleTheme: () => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => Complaint;
  startRepair: (complaintId: string) => void;
  completeRepair: (data: Omit<MaintenanceRecord, 'id' | 'repairDate' | 'repairTime'>) => void;
  updateStreetlightBrightness: (id: string, brightness: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

const LumiContext = createContext<LumiContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'luminexus_v2_';

export const LumiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}theme`);
    return (saved as 'dark' | 'light') || 'dark';
  });

  // Current User / Role state
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem(`${STORAGE_KEY_PREFIX}role`) as UserRole;
    return savedRole && ['CITIZEN', 'FIELD_EMPLOYEE', 'GOVERNMENT'].includes(savedRole)
      ? savedRole
      : 'CITIZEN';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUsers[role]);

  // Main collections state
  const [streetlights, setStreetlights] = useState<Streetlight[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}streetlights`);
    return saved ? JSON.parse(saved) : initialStreetlights;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}complaints`);
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}employees`);
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [cameras, setCameras] = useState<Camera[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}cameras`);
    return saved ? JSON.parse(saved) : initialCameras;
  });

  const [wardAreas, setWardAreas] = useState<WardArea[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}wardAreas`);
    return saved ? JSON.parse(saved) : initialWardAreas;
  });

  const [aiInsights, setAiInsights] = useState<AIInsight[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}aiInsights`);
    return saved ? JSON.parse(saved) : initialAIInsights;
  });

  const [notifications, setNotifications] = useState<GlobalNotification[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Keep HTML root class in sync with theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem(`${STORAGE_KEY_PREFIX}theme`, theme);
  }, [theme]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}streetlights`, JSON.stringify(streetlights));
  }, [streetlights]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}complaints`, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}employees`, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
    setCurrentUser(defaultUsers[newRole]);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}role`, newRole);
  };

  const logout = () => {
    loginAs('CITIZEN');
  };

  const addComplaint = (data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newId = `CMP-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newComplaint: Complaint = {
      ...data,
      id: newId,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };

    // Update complaints
    setComplaints(prev => [newComplaint, ...prev]);

    // Update target streetlight if not already faulty/maintenance
    setStreetlights(prev =>
      prev.map(sl => {
        if (sl.id === data.streetlightId) {
          return {
            ...sl,
            status: 'FAULTY',
            complaintCount: sl.complaintCount + 1,
            healthScore: Math.max(20, sl.healthScore - 30),
          };
        }
        return sl;
      })
    );

    // Create notification
    const newNotification: GlobalNotification = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Complaint Filed',
      message: `Citizen filed complaint ${newId} for streetlight ${data.streetlightId} (${data.category}).`,
      time: 'Just now',
      read: false,
      type: data.priority === 'CRITICAL' ? 'critical' : 'warning',
      targetRole: 'ALL',
      link: '/employee/complaints',
    };

    setNotifications(prev => [newNotification, ...prev]);

    return newComplaint;
  };

  const startRepair = (complaintId: string) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId) {
          return { ...c, status: 'MAINTENANCE', updatedAt: 'Just now' };
        }
        return c;
      })
    );

    // Find complaint to update its streetlight
    const target = complaints.find(c => c.id === complaintId);
    if (target) {
      setStreetlights(prev =>
        prev.map(sl => {
          if (sl.id === target.streetlightId) {
            return { ...sl, status: 'MAINTENANCE' };
          }
          return sl;
        })
      );
    }
  };

  const completeRepair = (data: Omit<MaintenanceRecord, 'id' | 'repairDate' | 'repairTime'>) => {
    const now = new Date();
    const repairDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const repairTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newRecordId = `MNT-${Math.floor(1000 + Math.random() * 9000)}`;

    const fullRecord: MaintenanceRecord = {
      ...data,
      id: newRecordId,
      repairDate,
      repairTime,
    };

    // 1. Update target Streetlight: RED -> GREEN (RECENTLY_REPAIRED / OPERATIONAL)
    setStreetlights(prev =>
      prev.map(sl => {
        if (sl.id === data.streetlightId) {
          const currentHist = sl.maintenanceHistory || [];
          return {
            ...sl,
            status: 'RECENTLY_REPAIRED',
            powerStatus: 'ON',
            brightness: 100,
            healthScore: 98,
            complaintCount: Math.max(0, sl.complaintCount - 1),
            lastMaintenance: repairDate,
            maintenanceHistory: [fullRecord, ...currentHist],
          };
        }
        return sl;
      })
    );

    // 2. Update Complaint: UNDER MAINTENANCE -> RESOLVED
    if (data.complaintId) {
      setComplaints(prev =>
        prev.map(c => {
          if (c.id === data.complaintId || c.streetlightId === data.streetlightId) {
            const hist = c.maintenanceHistory || [];
            return {
              ...c,
              status: 'RESOLVED',
              updatedAt: `${repairDate} ${repairTime}`,
              maintenanceHistory: [fullRecord, ...hist],
            };
          }
          return c;
        })
      );
    }

    // 3. Update Employee stats
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === data.employeeId) {
          return {
            ...emp,
            completedRepairs: emp.completedRepairs + 1,
            activeTasks: Math.max(0, emp.activeTasks - 1),
            pendingRepairs: Math.max(0, emp.pendingRepairs - 1),
          };
        }
        return emp;
      })
    );

    // 4. Update Ward area statistics
    setWardAreas(prev =>
      prev.map(w => {
        if (w.representativeId === data.employeeId) {
          return {
            ...w,
            operationalCount: w.operationalCount + 1,
            faultyCount: Math.max(0, w.faultyCount - 1),
            maintenanceCount: Math.max(0, w.maintenanceCount - 1),
            complaintsCount: Math.max(0, w.complaintsCount - 1),
          };
        }
        return w;
      })
    );

    // 5. Global celebration notification
    const celebrationNotif: GlobalNotification = {
      id: `NOTIF-${Date.now()}`,
      title: 'Infrastructure Restored!',
      message: `Streetlight ${data.streetlightId} successfully repaired by ${data.employeeName}. Output tested and optimal.`,
      time: 'Just now',
      read: false,
      type: 'success',
      targetRole: 'ALL',
      link: '/citizen/streetlights',
    };
    setNotifications(prev => [celebrationNotif, ...prev]);

    // 6. Confetti animation
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#14F1D9', '#2563EB', '#10B981'],
      });
    } catch {
      // ignore in non-browser environments
    }
  };

  const updateStreetlightBrightness = (id: string, brightness: number) => {
    setStreetlights(prev =>
      prev.map(sl => (sl.id === id ? { ...sl, brightness } : sl))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setStreetlights(initialStreetlights);
    setComplaints(initialComplaints);
    setEmployees(initialEmployees);
    setCameras(initialCameras);
    setWardAreas(initialWardAreas);
    setAiInsights(initialAIInsights);
    setNotifications(initialNotifications);
  };

  return (
    <LumiContext.Provider
      value={{
        currentUser,
        role,
        theme,
        streetlights,
        complaints,
        employees,
        cameras,
        wardAreas,
        aiInsights,
        notifications,
        loginAs,
        logout,
        toggleTheme,
        addComplaint,
        startRepair,
        completeRepair,
        updateStreetlightBrightness,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
      }}
    >
      {children}
    </LumiContext.Provider>
  );
};

export const useLumi = () => {
  const context = useContext(LumiContext);
  if (!context) {
    throw new Error('useLumi must be used within a LumiProvider');
  }
  return context;
};
