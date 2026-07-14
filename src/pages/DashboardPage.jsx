import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../hooks/useTasks'
import { useToast } from '../hooks/useToast'
import { TaskCard } from '../components/TaskCard'
import { TaskModal } from '../components/TaskModal'
import { ToastViewport } from '../components/ToastViewport'

export function DashboardPage() {
  const { user } = useAuth()
  const { tasks, paginatedTasks, loading, error, search, setSearch, filter, setFilter, sortBy, setSortBy, page, setPage, totalPages, addTask, updateTask, deleteTask, reorderTasks } = useTasks()
  const { toasts, addToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    const pending = tasks.length - completed

    return [
      { label: 'Total tasks', value: tasks.length, tone: 'bg-cyan-500/15 text-cyan-300' },
      { label: 'Completed', value: completed, tone: 'bg-emerald-500/15 text-emerald-300' },
      { label: 'Pending', value: pending, tone: 'bg-amber-500/15 text-amber-300' },
    ]
  }, [tasks])

  const handleCreateOrUpdate = async (data) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, data)
      addToast('Task updated successfully', 'info')
      setSelectedTask(null)
      return
    }

    await addTask(data)
    addToast('Task created successfully', 'info')
  }

  const handleToggle = async (taskId) => {
    const current = tasks.find((task) => task.id === taskId)
    if (current) {
      await updateTask(taskId, { completed: !current.completed })
      addToast(current.completed ? 'Task marked pending' : 'Task completed', 'info')
    }
  }

  const openCreateModal = () => {
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  if (loading) {
    return <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-slate-300">Loading your workspace...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/70 p-6 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-400">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{user?.name}, your task board is ready.</h2>
            <p className="mt-2 max-w-2xl text-slate-400">Track priorities, finish important work, and keep your day organized in a polished portfolio-ready experience.</p>
          </div>
          <button onClick={openCreateModal} className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">
            <Plus size={18} />
            New task
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-400">Task library</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">Manage your priorities</h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-400">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks" className="bg-transparent outline-none" />
            </label>
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300">
              <option value="all">All tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300">
              <option value="dueDate">Sort by due date</option>
              <option value="priority">Sort by priority</option>
              <option value="title">Sort by title</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {error ? <div className="text-rose-300">{error}</div> : paginatedTasks.length > 0 ? paginatedTasks.map((task) => (
            <div key={task.id} draggable onDragStart={() => localStorage.setItem('dragged-task-id', task.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => {
              const draggedId = Number(localStorage.getItem('dragged-task-id'))
              if (draggedId) {
                reorderTasks(draggedId, task.id)
                addToast('Task order updated', 'info')
              }
            }}>
              <TaskCard task={task} onToggle={handleToggle} onEdit={openEditModal} onDelete={deleteTask} />
            </div>
          )) : <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">No tasks match your current filters.</div>}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-400">
          <span>Showing page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-full border border-slate-700 px-3 py-2">Prev</button>
            <button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-full border border-slate-700 px-3 py-2">Next</button>
          </div>
        </div>
      </section>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateOrUpdate} task={selectedTask} />
      <ToastViewport toasts={toasts} />
    </div>
  )
}
