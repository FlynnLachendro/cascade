import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <img src="/cascade-logo.png" alt="Cascade" className="h-6 w-6" />
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
      <section className="mx-auto max-w-3xl px-8 pb-20 pt-24 text-center">
        <div className="mb-6 inline-block rounded-full bg-[#f0f3f8] px-3.5 py-1 text-xs font-medium text-[#1a3a6b]">
          GxP Change Impact Analyzer
        </div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#1a2332] sm:text-5xl">
          See how one change ripples through your entire GxP system
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[#5a6577]">
          Model regulated manufacturing workflows, simulate a process change, and
          instantly trace the cascade of impacts across SOPs, training records,
          validation protocols, and regulatory submissions.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/editor?template=car-t"
            className="rounded-lg bg-[#1a3a6b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#152e55]"
          >
            Try the Demo
          </Link>
          <Link
            href="/editor"
            className="rounded-lg border border-[#1a3a6b] bg-white px-6 py-3 text-sm font-semibold text-[#1a3a6b] shadow-sm transition-colors hover:bg-[#f0f3f8]"
          >
            Build Your Own
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-[#e2e6ea] bg-[#f4f5f7] px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#8b95a5]">
            How It Works
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <Step
              number="01"
              title="Build Your Workflow"
              description="Drag and connect GxP nodes — process steps, SOPs, training records, batch records, equipment qualifications, validation protocols, CAPAs, and regulatory submissions — to model your manufacturing dependencies."
            />
            <Step
              number="02"
              title="Simulate a Change"
              description="Select any process step and define a change — a temperature adjustment, a reagent substitution, a protocol modification. The system traces every downstream dependency that's affected."
            />
            <Step
              number="03"
              title="See the Impact"
              description="Watch the cascade propagate through your workflow in real-time. Each impacted node receives an AI-generated regulatory analysis with specific citations from 21 CFR, ICH Q10, EU GMP Annex 11, and more."
            />
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#1a2332]">
            Because in regulated manufacturing, no change exists in isolation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5a6577]">
            In GxP environments, a single process parameter change can trigger
            SOP revisions, operator retraining, batch record updates, equipment
            re-qualification, process revalidation, and regulatory filing
            amendments. Cascade makes these hidden dependencies visible — so
            nothing falls through the cracks.
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

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="text-xs font-bold text-[#1a3a6b]/30">{number}</span>
      <h3 className="mt-2 text-base font-semibold text-[#1a2332]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5a6577]">
        {description}
      </p>
    </div>
  );
}
