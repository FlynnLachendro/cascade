import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <img src="/cascade-logo.png" alt="Cascade" className="h-14 w-14" />
          <span className="text-base font-bold tracking-tight text-[#1a2332]">
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
        <img src="/cascade-logo.png" alt="Cascade" className="mx-auto mb-10 h-36 w-36" />
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
              icon={<GraphIcon />}
              number="01"
              title="Build Your Workflow"
              description="Drag and connect GxP document types — process steps, SOPs, training records, batch records, equipment qualifications, validation protocols, CAPAs, and regulatory submissions."
            />
            <Step
              icon={<ChangeIcon />}
              number="02"
              title="Simulate a Change"
              description="Select any process step and define a change — a temperature shift, a reagent substitution, a protocol modification. The engine traces every downstream dependency."
            />
            <Step
              icon={<CascadeIcon />}
              number="03"
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
          <p className="mt-4 text-sm text-[#8b95a5]">
            Built in 3 days as a solo engineer
          </p>
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
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#e2e6ea] bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f0f3f8]">
          {icon}
        </div>
        <span className="text-xs font-bold text-[#1a3a6b]/30">{number}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#1a2332]">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-[#5a6577]">
        {description}
      </p>
    </div>
  );
}

function GraphIcon() {
  return (
    <svg className="h-6 w-6 text-[#1a3a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  );
}

function ChangeIcon() {
  return (
    <svg className="h-6 w-6 text-[#1a3a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
    </svg>
  );
}

function CascadeIcon() {
  return (
    <svg className="h-6 w-6 text-[#1a3a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}
