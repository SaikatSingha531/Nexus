"use client";

import { useState } from "react";
import { Plus, Trash2, Bell, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import {
  useNotifications,
  useAddNotification,
  useDeleteNotification,
} from "@/hooks/useNotifications";

export default function AddNotification() {
  const { data: items, isLoading } = useNotifications();
  const addMutation = useAddNotification();
  const deleteMutation = useDeleteNotification();

  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!text.trim() || !date) return;
    addMutation.mutate({ text, date }, {
      onSuccess: () => {
        setText("");
        setDate("");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
            <p className="text-sm text-slate-500">Manage and schedule your system alerts.</p>
          </div>
          <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
        </header>

        <div className="grid gap-6">
          {/* Input Card */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Notification Message</label>
                  <input
                    type="text"
                    placeholder="e.g. System maintenance scheduled"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Schedule Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addMutation.isPending || !text || !date}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Create Notification
                </button>
              </div>
            </div>
          </section>

          {/* List Section */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-1">
              Active Alerts ({items?.length || 0})
            </h2>
            
            <div className="space-y-3">
              {isLoading ? (
                <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>
              ) : !items?.length ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
                  <p className="text-slate-500 text-sm">No notifications found.</p>
                </div>
              ) : (
                items.map((item: any) => (
                  <div
                    key={item.id}
                    className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-slate-900 leading-none">
                        {item.notification}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteMutation.mutate(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Notification"
                    >
                      {deleteMutation.isPending ? (
                         <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}