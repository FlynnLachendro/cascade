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
      <section className="mx-auto max-w-4xl px-8 pb-16 pt-16 text-center">
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

      {/* App Preview */}
      <section className="px-8 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-[#e2e6ea] shadow-lg">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-[#e2e6ea] bg-[#f4f5f7] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#e2e6ea]" />
                <div className="h-3 w-3 rounded-full bg-[#e2e6ea]" />
                <div className="h-3 w-3 rounded-full bg-[#e2e6ea]" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-xs text-[#8b95a5]">
                cascade.dev/editor?template=car-t
              </div>
            </div>
            {/* App preview iframe */}
            <div className="relative h-[500px] bg-[#f4f5f7]">
              <iframe
                src="/editor?template=car-t"
                className="h-full w-full border-0"
                title="Cascade demo preview"
                loading="lazy"
              />
              {/* Overlay to prevent interaction — clicking goes to actual app */}
              <Link
                href="/editor?template=car-t"
                className="absolute inset-0 z-10"
                aria-label="Open the demo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-[#e2e6ea] bg-[#f4f5f7] px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-[#1a2332]">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-[#5a6577]">
            Model your regulated workflow, trigger a change, and watch the
            consequences propagate in real time.
          </p>
          <div className="mt-14 space-y-16">
            <WalkthroughStep
              step="Build"
              title="Model your manufacturing workflow"
              description="Drag and connect 8 GxP document types — process steps, SOPs, training records, batch records, equipment qualifications, validation protocols, CAPAs, and regulatory submissions — to map out your manufacturing dependencies."
              visual={
                <div className="flex items-center gap-3">
                  <NodePreview label="Cell Washing" type="Process Step" color="#1a3a6b" />
                  <Arrow />
                  <NodePreview label="SOP-0042" type="SOP" color="#2d5a3d" />
                  <Arrow />
                  <NodePreview label="TR: Operator A" type="Training" color="#6b5b2d" />
                </div>
              }
            />
            <WalkthroughStep
              step="Simulate"
              title="Trigger a process change"
              description="Select any process step and define a change — a temperature adjustment, a reagent substitution, a protocol modification. Choose from pre-defined changes or describe your own."
              visual={
                <div className="rounded-lg border border-[#e2e6ea] bg-white p-4">
                  <p className="text-xs font-medium text-[#8b95a5]">Select a change to simulate on <span className="font-semibold text-[#1a2332]">Cell Washing</span></p>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-md border border-[#1a3a6b] bg-[#f0f3f8] px-3 py-2">
                      <p className="text-sm font-medium text-[#1a2332]">Change washing temperature (4°C → 8°C)</p>
                    </div>
                    <div className="rounded-md border border-[#e2e6ea] px-3 py-2">
                      <p className="text-sm text-[#5a6577]">Change centrifugation speed (300g → 400g)</p>
                    </div>
                  </div>
                </div>
              }
            />
            <WalkthroughStep
              step="Trace"
              title="See the cascading impact"
              description="Watch impacts propagate through your workflow in real time. Each affected node receives an AI-generated regulatory analysis with specific citations from 21 CFR, ICH Q10, EU GMP Annex 11, and more."
              visual={
                <div className="space-y-2">
                  <ImpactPreview severity="high" color="#c4553a" label="SOP-0042: Cell Washing Procedure" reg="21 CFR 211.100" />
                  <ImpactPreview severity="critical" color="#9b2c2c" label="VP-015: Process Validation" reg="21 CFR 211.186" />
                  <ImpactPreview severity="medium" color="#b8860b" label="EQ-009: Centrifuge OQ" reg="21 CFR 211.68" />
                </div>
              }
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

function WalkthroughStep({
  step,
  title,
  description,
  visual,
}: {
  step: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1a3a6b]">
          {step}
        </span>
        <h3 className="mt-2 text-2xl font-bold text-[#1a2332]">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-[#5a6577]">
          {description}
        </p>
      </div>
      <div>{visual}</div>
    </div>
  );
}

function NodePreview({ label, type, color }: { label: string; type: string; color: string }) {
  return (
    <div
      className="rounded-md border-l-[3px] bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      style={{ borderLeftColor: color }}
    >
      <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>
        {type}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-[#1a2332]">{label}</p>
    </div>
  );
}

function Arrow() {
  return (
    <svg className="h-4 w-8 shrink-0 text-[#c8cdd4]" fill="none" viewBox="0 0 32 16">
      <path d="M0 8h28m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ImpactPreview({ severity, color, label, reg }: { severity: string; color: string; label: string; reg: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border-l-[3px] bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center gap-2">
        <span
          className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-white"
          style={{ backgroundColor: color }}
        >
          {severity}
        </span>
        <span className="text-sm font-medium text-[#1a2332]">{label}</span>
      </div>
      <span className="text-xs text-[#8b95a5]">§ {reg}</span>
    </div>
  );
}
