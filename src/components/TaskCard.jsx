import { CalendarDays, CheckCircle2, Circle, PencilLine, Trash2 } from 'lucide-react'

export function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {task.category}
          </p>
          <h3 className="text-lg font-semibold text-white">{task.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{task.description}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${task.priority === 'High' ? 'bg-rose-500/15 text-rose-300' : task.priority === 'Medium' ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'}`}>
          {task.priority}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
        <CalendarDays size={16} />
        <span>Due {task.dueDate}</span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => onToggle(task.id)}
          className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300"
        >
          {task.completed ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Circle size={16} />}
          {task.completed ? 'Completed' : 'Mark done'}
        </button>

        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="rounded-full border border-slate-700 p-2 text-slate-300">
            <PencilLine size={16} />
          </button>
          <button onClick={() => onDelete(task.id)} className="rounded-full border border-slate-700 p-2 text-rose-300">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}
