"use client";

import { useState, useEffect } from "react";
import { getPredefinedChanges } from "@/lib/templates/car-t-manufacturing";
import { ChangeCategory, type PredefinedChange } from "@/types";

const CATEGORY_OPTIONS: { value: ChangeCategory; label: string; plain: string; filing: string }[] = [
  {
    value: ChangeCategory.MINOR,
    label: "Minor",
    plain: "Small tweak, still within the already-approved range",
    filing: "Annual Report",
  },
  {
    value: ChangeCategory.MODERATE,
    label: "Moderate",
    plain: "Could affect product quality — needs evaluation",
    filing: "CBE-30",
  },
  {
    value: ChangeCategory.MAJOR,
    label: "Major",
    plain: "Fundamental change — FDA must approve before you proceed",
    filing: "Prior Approval (PAS)",
  },
];

interface ChangeSelectorProps {
  nodeId: string;
  nodeLabel: string;
  isOpen: boolean;
  onConfirm: (change: { id: string; label: string; description: string; changeCategory?: ChangeCategory }) => void;
  onCancel: () => void;
}

export function ChangeSelector({
  nodeId,
  nodeLabel,
  isOpen,
  onConfirm,
  onCancel,
}: ChangeSelectorProps) {
  const predefined = getPredefinedChanges(nodeId);
  const hasPredefined = predefined.length > 0;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [category, setCategory] = useState<ChangeCategory | null>(null);

  // Auto-select category from predefined change's defaultCategory
  const selectedChange = predefined.find((c) => c.id === selectedId);
  useEffect(() => {
    if (selectedChange?.defaultCategory) {
      setCategory(selectedChange.defaultCategory);
    }
  }, [selectedChange?.defaultCategory]);

  // Reset state when panel opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedId(null);
      setCustomText("");
      setCategory(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasStep1 = hasPredefined ? selectedId !== null : customText.trim() !== "";
  const canConfirm = hasStep1 && category !== null;

  const handleConfirm = () => {
    if (!category) return;
    if (hasPredefined && selectedId) {
      const change = predefined.find((c) => c.id === selectedId);
      if (change) onConfirm({ ...change, changeCategory: category });
    } else if (!hasPredefined && customText.trim()) {
      onConfirm({
        id: "custom",
        label: customText.trim(),
        description: customText.trim(),
        changeCategory: category,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-[#1a2332]">
          Simulate Change on <span className="text-[#1a3a6b]">{nodeLabel}</span>
        </h3>
        <p className="mt-1 text-[13px] text-[#5a6577]">
          Choose what&apos;s changing and how significant it is. The cascade engine uses both to determine which documents, systems, and filings are affected.
        </p>

        {/* Step 1 */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1a3a6b] text-[10px] font-bold text-white">1</span>
            <p className="text-sm font-semibold text-[#1a2332]">What&apos;s changing?</p>
          </div>
          <div className="ml-7 mt-2 space-y-2">
            {hasPredefined ? (
              predefined.map((change) => (
                <button
                  key={change.id}
                  onClick={() => setSelectedId(change.id)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition-all ${
                    selectedId === change.id
                      ? "border-[#1a3a6b] bg-[#f0f3f8] ring-1 ring-[#1a3a6b]"
                      : "border-[#e2e6ea] hover:border-[#c8cdd4] hover:bg-[#f9fafb]"
                  }`}
                >
                  <p className="text-sm font-medium text-[#1a2332]">
                    {change.label}
                  </p>
                  <p className="mt-0.5 text-xs text-[#5a6577]">
                    {change.description}
                  </p>
                </button>
              ))
            ) : (
              <div>
                <label className="text-sm font-medium text-[#1a2332]">
                  Describe the change
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g., Change mixing speed from 200 RPM to 350 RPM"
                  className="mt-1.5 h-24 w-full resize-none rounded-lg border border-[#e2e6ea] px-3 py-2 text-sm text-[#1a2332] placeholder:text-[#8b95a5] focus:border-[#1a3a6b] focus:outline-none focus:ring-1 focus:ring-[#1a3a6b]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Step 2 — category picker */}
        <div className={`mt-5 transition-opacity duration-200 ${hasStep1 ? "opacity-100" : "pointer-events-none opacity-40"}`}>
          <div className="flex items-center gap-2">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${hasStep1 ? "bg-[#1a3a6b]" : "bg-[#c8cdd4]"}`}>2</span>
            <p className="text-sm font-semibold text-[#1a2332]">How significant is this change?</p>
          </div>
          <p className="ml-7 mt-1 text-[11px] leading-relaxed text-[#8b95a5]">
            The same physical change can have different regulatory consequences depending on its scope.
            The FDA classifies changes into three categories — this determines what paperwork is required.
          </p>
          <div className="ml-7 mt-2.5 flex gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCategory(opt.value)}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-left transition-all ${
                  category === opt.value
                    ? "border-[#1a3a6b] bg-[#f0f3f8] ring-1 ring-[#1a3a6b]"
                    : "border-[#e2e6ea] hover:border-[#c8cdd4] hover:bg-[#f9fafb]"
                }`}
              >
                <p className="text-xs font-semibold text-[#1a2332]">
                  {opt.label}
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-[#5a6577]">
                  {opt.plain}
                </p>
                <p className="mt-1 text-[9px] font-medium text-[#1a3a6b]">
                  {opt.filing}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#5a6577] transition-colors hover:bg-[#f4f5f7]"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="rounded-lg bg-[#1a3a6b] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#152e55] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Run Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
