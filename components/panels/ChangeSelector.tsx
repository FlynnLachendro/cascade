"use client";

import { useState } from "react";
import { getPredefinedChanges } from "@/lib/templates/car-t-manufacturing";
import type { PredefinedChange } from "@/types";

interface ChangeSelectorProps {
  nodeId: string;
  nodeLabel: string;
  isOpen: boolean;
  onConfirm: (change: PredefinedChange | { id: string; label: string; description: string }) => void;
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

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (hasPredefined && selectedId) {
      const change = predefined.find((c) => c.id === selectedId);
      if (change) onConfirm(change);
    } else if (!hasPredefined && customText.trim()) {
      onConfirm({
        id: "custom",
        label: customText.trim(),
        description: customText.trim(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-[#1a2332]">
          Simulate Change
        </h3>
        <p className="mt-1 text-sm text-[#5a6577]">
          Select a change to simulate on <strong>{nodeLabel}</strong>
        </p>

        <div className="mt-4 space-y-2">
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

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#5a6577] transition-colors hover:bg-[#f4f5f7]"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={hasPredefined ? !selectedId : !customText.trim()}
            className="rounded-lg bg-[#1a3a6b] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#152e55] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Run Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
