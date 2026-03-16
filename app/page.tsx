import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <img src="/cascade-logo.png" alt="Cascade" className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight text-[#1a2332]">
            Cascade
          </span>
        </div>
        <Link
          href="/editor"
          className="text-sm font-medium text-[#5a6577] transition-colors hover:text-[#1a2332]"
        >
          Open Editor
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-8 pb-24 pt-16 text-center">
        <img src="/cascade-logo.png" alt="Cascade" className="mx-auto mb-10 h-44 w-44" />
        <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-[#1a2332] sm:text-6xl">
          See how one change ripples through your entire GxP system
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-[#5a6577]">
          Model regulated manufacturing workflows, simulate a process change,
          and instantly trace cascading impacts across SOPs, training records,
          validation protocols, and regulatory submissions — with AI-powered
          regulatory analysis.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link
            href="/editor?template=car-t"
            className="rounded-lg bg-[#1a3a6b] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#152e55]"
          >
            Try the Demo
          </Link>
          <Link
            href="/editor"
            className="rounded-lg border border-[#1a3a6b] bg-white px-8 py-3.5 text-base font-semibold text-[#1a3a6b] shadow-sm transition-colors hover:bg-[#f0f3f8]"
          >
            Build Your Own
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-[#e2e6ea] bg-[#f4f5f7] px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-[#1a2332]">
            Three steps to trace your impact
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-[#5a6577]">
            Model your regulated workflow, trigger a change, and watch the
            consequences propagate in real time.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Step
              visual={<MiniNode label="Process Step" borderColor="#1a3a6b" icon={<CogIcon />} />}
              title="Build Your Workflow"
              description="Drag and connect GxP document types — process steps, SOPs, training records, batch records, equipment qualifications, validation protocols, CAPAs, and regulatory submissions."
            />
            <Step
              visual={<MiniNode label="Cell Washing" borderColor="#1a3a6b" icon={<CogIcon />} hint="Click to simulate change →" />}
              title="Simulate a Change"
              description="Select any process step and define a change — a temperature shift, a reagent substitution, a protocol modification. The engine traces every downstream dependency."
            />
            <Step
              visual={<MiniNodeImpacted />}
              title="See the Impact"
              description="Watch the cascade propagate through your workflow in real time. Each impacted node receives an AI-generated regulatory analysis citing 21 CFR, ICH Q10, EU GMP Annex 11, and more."
            />
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#1a2332]">
            In regulated manufacturing, no change exists in isolation
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5a6577]">
            A single process parameter change can trigger SOP revisions,
            operator retraining, batch record updates, equipment
            re-qualification, process revalidation, and regulatory filing
            amendments. Cascade makes these hidden dependencies visible.
          </p>
        </div>
        <div className="mx-auto mt-12 flex max-w-3xl items-center justify-center gap-8 md:gap-16">
          <Stat value="8" label="Document types" />
          <div className="h-8 w-px bg-[#e2e6ea]" />
          <Stat value="9" label="Cascade rules" />
          <div className="h-8 w-px bg-[#e2e6ea]" />
          <Stat value="7" label="Regulatory frameworks" />
        </div>
      </section>

      {/* Built With */}
      <section className="border-t border-[#e2e6ea] bg-[#f4f5f7] px-8 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-[#8b95a5]">
            Built with
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {["Next.js", "TypeScript", "GraphQL", "React Flow", "Turso", "OpenRouter"].map((tech) => (
              <span key={tech} className="text-base font-medium text-[#5a6577]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e2e6ea] px-8 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <p className="text-xs text-[#8b95a5]">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/flynnlachendro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5a6577] underline underline-offset-2 transition-colors hover:text-[#1a2332]"
            >
              Flynn Lachendro
            </a>
          </p>
          <p className="text-xs text-[#8b95a5]">
            GxP Change Impact Analyzer
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-[#1a3a6b]">{value}</p>
      <p className="mt-1 text-sm text-[#5a6577]">{label}</p>
    </div>
  );
}

function Step({
  visual,
  title,
  description,
}: {
  visual: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#e2e6ea] bg-white p-6">
      <div className="mb-4">{visual}</div>
      <h3 className="text-lg font-semibold text-[#1a2332]">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-[#5a6577]">
        {description}
      </p>
    </div>
  );
}

function CogIcon() {
  return (
    <svg className="h-3 w-3 text-[#5a6577]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MiniNode({ label, borderColor, icon, hint }: { label: string; borderColor: string; icon: React.ReactNode; hint?: string }) {
  return (
    <div
      className="inline-block rounded-md border-l-[3px] bg-white px-3 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[9px] font-medium uppercase tracking-wider" style={{ color: borderColor }}>
          {label}
        </span>
      </div>
      {hint && (
        <p className="mt-1 text-[8px] text-[#8b95a5]">{hint}</p>
      )}
    </div>
  );
}

function MiniNodeImpacted() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="inline-block rounded-md border-l-[3px] bg-[#faf7f5] px-3 py-2 shadow-[0_1px_4px_rgba(196,85,58,0.12)]"
        style={{ borderLeftColor: "#c4553a" }}
      >
        <div className="flex items-center gap-1.5">
          <svg className="h-3 w-3 text-[#5a6577]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-[9px] font-medium uppercase tracking-wider text-[#c4553a]">SOP</span>
          <span className="rounded bg-[#c4553a] px-1 py-0.5 text-[7px] font-bold uppercase text-white">high</span>
        </div>
      </div>
      <span className="text-[10px] text-[#8b95a5]">§ 21 CFR 211.100</span>
    </div>
  );
}
