"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data.projects || []);
    }
  }

  useEffect(() => { fetchProjects(); }, []);

  async function addProject(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, imageUrl }),
    });
    setLoading(false);
    if (res.ok) {
      setTitle("");
      setDescription("");
      setImageUrl("");
      fetchProjects();
    }
  }

  async function updateProject(id, patch) {
    const res = await fetch(`/api/projects/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    if (res.ok) fetchProjects();
  }

  async function deleteProject(id) {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Your Projects</h1>
            <p className="text-slate-400">Create, update, and manage your projects</p>
          </div>
        </div>

        <form onSubmit={addProject} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" className="rounded-lg bg-white/10 border border-white/10 px-3 py-2" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className="rounded-lg bg-white/10 border border-white/10 px-3 py-2" />
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="rounded-lg bg-white/10 border border-white/10 px-3 py-2" />
          <button disabled={loading} className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2">{loading ? "Adding..." : "Add Project"}</button>
        </form>

        {projects.length === 0 ? (
          <div className="text-slate-400">No projects yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div key={p._id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-slate-800 flex items-center justify-center text-slate-500">No Image</div>
                )}
                <div className="p-4 space-y-2">
                  <input defaultValue={p.title} onBlur={(e) => updateProject(p._id, { title: e.target.value })} className="w-full bg-transparent outline-none font-semibold" />
                  <textarea defaultValue={p.description || ""} onBlur={(e) => updateProject(p._id, { description: e.target.value })} className="w-full bg-transparent outline-none text-sm text-slate-300" rows={2} />
                  <input defaultValue={p.imageUrl || ""} onBlur={(e) => updateProject(p._id, { imageUrl: e.target.value })} className="w-full bg-transparent outline-none text-sm text-slate-300" placeholder="Image URL" />
                  <div className="flex justify-end pt-2">
                    <button onClick={() => deleteProject(p._id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}