"use client";

import { Bell, Trash2, Calendar, Clock, CheckCircle2, Loader2, Inbox } from "lucide-react";
import {
  useNotifications,
  useDeleteNotification,
} from "@/hooks/useNotifications";

const Notification = () => {
  const { data: items, isLoading } = useNotifications();
  const deleteMutation = useDeleteNotification();

  // Skeleton Loader for high-end feel
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 w-full bg-slate-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased pb-20">
      {/* Top Glassmorphism Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-slate-200/50 mb-8">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                <Bell className="w-6 h-6 text-white" />
              </div>
              {items && items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800">Alert Center</h1>
              <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mt-0.5">
                {items?.length || 0} System Updates
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {!items?.length ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-300 rounded-[2rem] text-center">
            <div className="p-6 bg-slate-50 rounded-full mb-4">
              <Inbox className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">All caught up!</h3>
            <p className="text-slate-500 max-w-[240px] mt-2">
              Your inbox is empty. We'll notify you when something happens.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items?.map((item: any) => (
              <div
                key={item.id}
                className="group relative flex items-center gap-5 p-5 bg-white border border-slate-200/60 rounded-[1.5rem] hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                {/* Visual Icon/Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:from-indigo-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    {item.notification?.toLowerCase().includes("video") ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      <span className="font-black text-xl italic">{item.notification?.[0]?.toUpperCase()}</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500"></span>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">System Alert</p>
                  </div>
                  <h4 className="text-slate-900 font-bold leading-tight group-hover:text-indigo-600 transition-colors">
                    {item.notification}
                  </h4>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400">
                      <Clock className="w-3.5 h-3.5" />
                      Just now
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
                    disabled={deleteMutation.isPending}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                    title="Remove Notification"
                  >
                    {deleteMutation.isPending ? (
                       <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Status Dot */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-indigo-500 group-hover:hidden"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle Footer floating action (optional) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
         <div className="px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-full shadow-2xl flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Real-time synchronization active
         </div>
      </div>
    </div>
  );
};

export default Notification;