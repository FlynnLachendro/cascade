"use client";

import { SEVERITY_COLORS, type Severity } from "@/types";
import { cn } from "@/lib/utils";

export interface ImpactCard {
  nodeId: string;
  nodeLabel: string;
  severity: Severity;
  explanation?: string;
  regulationReference?: string;
  recommendedAction?: string;
  severityJustification?: string;
  error?: string;
  loading?: boolean;
}

interface SimulationPanelProps {
  isOpen: boolean;
  changeDescription: string;
  triggerNodeLabel: string;
  impacts: ImpactCard[];
  isComplete: boolean;
  onClose: () => void;
  onExport: () => void;
}

export function SimulationPanel({
  isOpen,
  changeDescription,
  triggerNodeLabel,
  impacts,
  isComplete,
  onClose,
  onExport,
}: SimulationPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="flex w-[380px] flex-col border-l border-[#e2e6ea] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e2e6ea] px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-[#1a2332]">
            Impact Analysis
          </h3>
          <p className="mt-0.5 text-[11px] text-[#5a6577]">
            {isComplete
              ? `${impacts.length} node${impacts.length !== 1 ? "s" : ""} impacted`
              : "Analyzing..."}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {isComplete && impacts.length > 0 && (
            <button
              onClick={onExport}
              className="rounded-md bg-[#f4f5f7] px-2.5 py-1 text-[11px] font-medium text-[#1a2332] transition-colors hover:bg-[#e2e6ea]"
            >
              Export .md
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#8b95a5] transition-colors hover:bg-[#f4f5f7] hover:text-[#5a6577]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Change description */}
      <div className="border-b border-[#e2e6ea] bg-[#f4f5f7] px-4 py-2.5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#1a3a6b]">
          Change
        </p>
        <p className="mt-0.5 text-xs text-[#1a2332]">{changeDescription}</p>
        <p className="mt-0.5 text-[10px] text-[#5a6577]">
          on {triggerNodeLabel}
        </p>
      </div>

      {/* Impact cards */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-2.5">
          {impacts.map((impact) => (
            <ImpactCardComponent key={impact.nodeId} impact={impact} />
          ))}
          {!isComplete && (
            <div className="flex items-center gap-2 py-3">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1a3a6b]" />
              <span className="text-xs text-[#8b95a5]">
                Analyzing downstream impacts...
              </span>
            </div>
          )}
          {isComplete && impacts.length === 0 && (
            <div className="py-6 text-center">
              <p className="text-sm text-[#8b95a5]">
                No downstream dependencies found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImpactCardComponent({ impact }: { impact: ImpactCard }) {
  const severityStyle = SEVERITY_COLORS[impact.severity];

  return (
    <div
      className="rounded-lg border-l-3 bg-white p-3 shadow-sm transition-all duration-300"
      style={{
        borderLeftColor: severityStyle.border,
        backgroundColor: `${severityStyle.bg}80`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
            severityStyle.badge
          )}
        >
          {impact.severity}
        </span>
        <span className="text-xs font-semibold text-[#1a2332]">
          {impact.nodeLabel}
        </span>
      </div>

      {impact.loading && (
        <div className="mt-2 space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>
      )}

      {impact.error && (
        <p className="mt-2 text-xs text-red-600">{impact.error}</p>
      )}

      {impact.explanation && (
        <div className="mt-2 space-y-2">
          <p className="text-[11px] leading-relaxed text-[#5a6577]">
            {impact.explanation}
          </p>

          {impact.regulationReference && (
            <div className="flex items-start gap-1.5">
              <span className="mt-px text-[10px] text-[#8b95a5]">§</span>
              <span className="text-[11px] font-medium text-[#1a2332]">
                {impact.regulationReference}
              </span>
            </div>
          )}

          {impact.recommendedAction && (
            <div className="rounded bg-[#f4f5f7] px-2 py-1.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#8b95a5]">
                Recommended Action
              </p>
              <p className="mt-0.5 text-[11px] text-[#5a6577]">
                {impact.recommendedAction}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
