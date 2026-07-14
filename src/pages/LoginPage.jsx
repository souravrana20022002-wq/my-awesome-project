import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const [form, setForm] = useState({ email: 'ava@taskflow.dev', password: 'demo1234' })
  const [isSignup, setIsSignup] = useState(false)
  const { login, signup, error, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSignup) {
      const result = await signup(form.name, form.email, form.password)
      if (result) navigate('/dashboard')
      return
    }

    const result = await login(form.email, form.password)
    if (result) navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.24),_transparent_40%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-8 text-slate-100">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-slate-950/70 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">TaskFlow</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Plan smarter. Ship faster.</h1>
            <p className="mt-4 max-w-md text-lg text-slate-400">
              A modern task workspace for ambitious teams and developers building their next big thing.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">• Real-time task visibility for your weekly goals</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">• Clean dashboards and polished interview-ready UI</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">• Built with React hooks, routing, and local persistence</div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 flex rounded-full border border-slate-800 bg-slate-800/80 p-1">
              <button onClick={() => setIsSignup(false)} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${!isSignup ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>Login</button>
              <button onClick={() => setIsSignup(true)} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${isSignup ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>Sign up</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Full name</label>
                  <input name="name" value={form.name || ''} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white" placeholder="Jordan Lee" />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-slate-400">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white" placeholder="name@example.com" />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white" placeholder="Enter at least 4 characters" />
              </div>

              {error && <p className="text-sm text-rose-300">{error}</p>}

              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60">
                {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Log in'}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              Demo login: <span className="font-semibold text-slate-200">ava@taskflow.dev</span> / any 4+ character password.
            </p>
            <Link to="/dashboard" className="mt-3 inline-block text-sm text-cyan-400">Continue to dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
