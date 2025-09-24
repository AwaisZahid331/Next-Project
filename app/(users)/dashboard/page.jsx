"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";

export default function UsersDashboardPage() {
  const [user, setUser] = useState(null);
  const storeUser = useSelector((s) => s.auth.user);
  useEffect(() => {
    if (storeUser) setUser(storeUser);
  }, [storeUser]);

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);

  async function fetchItems() {
    const res = await fetch("/api/items");
    if (res.ok) {
      const data = await res.json();
      setItems(data.items || []);
    }
  }

  useEffect(() => { fetchItems(); }, []);

  async function addItem(e) {
    e.preventDefault();
    if (!title.trim()) return;
    
    const res = await fetch("/api/items", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ title, notes }) 
    });
    if (res.ok) {
      setTitle("");
      setNotes("");
      setShowNoteForm(false);
      fetchItems();
    }
  }

  async function updateItem(id, patch) {
    const res = await fetch(`/api/items/${id}`, { 
      method: "PUT", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(patch) 
    });
    if (res.ok) fetchItems();
  }

  async function deleteItem(id) {
    if (confirm("Are you sure you want to delete this note?")) {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    }
  }

  // Sample chart data
  const chartData = [
    { name: 'Jan', tasks: 12 },
    { name: 'Feb', tasks: 19 },
    { name: 'Mar', tasks: 8 },
    { name: 'Apr', tasks: 15 },
    { name: 'May', tasks: 22 },
    { name: 'Jun', tasks: 18 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - More Compact */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Welcome back{user?.name ? `, ${user.name}` : ""} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">Your activity dashboard</p>
          </div>
        </div>

        {/* Main Grid - More Compact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Chart Section - Takes 2/3 on large screens */}
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Monthly Progress</h3>
              <span className="text-slate-400 text-xs">Tasks Completed</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      color: 'white',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="tasks" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-sm">Profile Status</div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-slate-400 text-xs mb-2">95% complete</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-sm">Recent Activity</div>
                <div className="text-indigo-400 text-xs">View All</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Project Update</span>
                  <span className="text-slate-400">2h ago</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Task Completed</span>
                  <span className="text-slate-400">1d ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section - Improved Design */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Quick Notes ({items.length})</h3>
            <button 
              onClick={() => setShowNoteForm(!showNoteForm)}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors"
            >
              {showNoteForm ? 'Cancel' : '+ Add Note'}
            </button>
          </div>

          {/* Add Note Form - Compact */}
          {showNoteForm && (
            <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 p-3 bg-white/5 rounded-lg">
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                className="md:col-span-1 rounded bg-white/10 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-indigo-400" 
              />
              <input 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Write your note..." 
                className="md:col-span-2 rounded bg-white/10 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-indigo-400" 
              />
              <button 
                type="submit" 
                className="rounded bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-sm transition-colors"
                disabled={!title.trim()}
              >
                Save
              </button>
            </form>
          )}

          {/* Notes List - Compact Design */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {items.map((it) => (
              <div key={it._id} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <input 
                  defaultValue={it.title} 
                  onBlur={(e) => updateItem(it._id, { title: e.target.value })} 
                  className="flex-1 bg-transparent outline-none text-sm font-medium min-w-0" 
                  placeholder="Title"
                />
                <input 
                  defaultValue={it.notes || ""} 
                  onBlur={(e) => updateItem(it._id, { notes: e.target.value })} 
                  className="flex-2 bg-transparent outline-none text-sm text-slate-300 min-w-0" 
                  placeholder="Add details..."
                />
                <button 
                  onClick={() => deleteItem(it._id)} 
                  className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1"
                >
                  Delete
                </button>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center text-slate-400 text-sm py-8">
                No notes yet. Click "Add Note" to create your first note.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}