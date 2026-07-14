import { useEffect, useState } from 'react'

const initialState = {
  title: '',
  description: '',
  priority: 'Medium',
  category: 'Planning',
  dueDate: '',
}

export function TaskModal({ isOpen, onClose, onSubmit, task }) {
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (task) {
      setForm(task)
    } else {
      setForm(initialState)
    }
  }, [task, isOpen])

  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{task ? 'Edit task' : 'Create task'}</h2>
          <button onClick={onClose} className="text-sm text-slate-400">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-400">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm text-slate-400">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-400">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white">
                <option>Planning</option>
                <option>Design</option>
                <option>Development</option>
                <option>Research</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-400">Due date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300">Cancel</button>
            <button type="submit" className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Save task</button>
          </div>
        </form>
      </div>
    </div>
  )
}
