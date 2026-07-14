export function TeamPage() {
  const members = [
    { name: 'Ava Carter', role: 'Product Designer', focus: 'Design systems' },
    { name: 'Milo Chen', role: 'Frontend Engineer', focus: 'React performance' },
    { name: 'Zara Brooks', role: 'Product Manager', focus: 'Roadmaps' },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-400">Team collaboration</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Keep your crew aligned</h2>
        <p className="mt-2 text-slate-400">This section highlights how a portfolio app can demonstrate richer product thinking beyond just CRUD.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {members.map((member) => (
          <div key={member.name} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="h-12 w-12 rounded-full bg-cyan-500/20" />
            <h3 className="mt-4 text-lg font-semibold text-white">{member.name}</h3>
            <p className="text-sm text-slate-400">{member.role}</p>
            <p className="mt-2 text-sm text-cyan-300">{member.focus}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
