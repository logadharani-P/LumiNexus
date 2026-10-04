import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Check, ExternalLink, AlertTriangle, CheckCircle2, Info, AlertOctagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLumi } from '../../context/LumiContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useLumi();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertOctagon className="h-4 w-4 text-rose-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      default:
        return <Info className="h-4 w-4 text-brand-cyan" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-sm">
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-slate-950 border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">System Notifications</h3>
                  <p className="text-[11px] text-slate-400">
                    {notifications.filter(n => !n.read).length} unread updates
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-brand-cyan hover:underline font-medium"
                >
                  Mark all read
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs">
                  No notifications recorded
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.link) {
                        navigate(n.link);
                        onClose();
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      n.read
                        ? 'bg-slate-900/40 border-slate-800 text-slate-300'
                        : 'bg-slate-900/90 border-brand-cyan/30 text-white shadow-sm'
                    } hover:border-brand-cyan/60`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-white">{n.title}</span>
                          <span className="font-mono text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-snug">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/40 text-center">
              <span className="text-[11px] text-slate-500 font-mono">
                LumiNexus Real-time Dispatch Sync
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationPanel;
