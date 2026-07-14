export function ToastViewport({ toasts }) {
  if (!toasts.length) return null

  return (
    <div className="fixed right-4 top-4 z-[60] flex w-80 flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`rounded-2xl border px-4 py-3 text-sm shadow-lg ${toast.type === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-200' : 'border-cyan-500/30 bg-slate-900/95 text-slate-100'}`}>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
