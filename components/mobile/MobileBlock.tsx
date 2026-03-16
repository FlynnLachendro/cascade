"use client";

export function MobileBlock() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-white px-8 text-center md:hidden">
      <img src="/cascade-logo.png" alt="Cascade" className="mb-6 h-20 w-20" />
      <h1 className="mb-3 text-xl font-bold tracking-tight text-[#1a2332]">
        Desktop Only
      </h1>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#5a6577]">
        Cascade is an interactive graph tool built for desktop. Please visit on
        a larger screen to explore regulated workflow simulations.
      </p>
      <p className="text-xs text-slate-400">
        Built by{" "}
        <a
          href="https://www.linkedin.com/in/flynnlachendro/"
          className="underline underline-offset-2 hover:text-slate-600"
        >
          Flynn Lachendro
        </a>
      </p>
    </div>
  );
}
