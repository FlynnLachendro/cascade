import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cascade — GxP Change Impact Analyzer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a3a6b 0%, #0f2440 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#1a3a6b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "white",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#94a3b8",
              letterSpacing: "0.05em",
            }}
          >
            CASCADE
          </span>
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.15,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          See how one change ripples through your entire GxP system
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            marginTop: "24px",
            lineHeight: 1.5,
            maxWidth: "750px",
          }}
        >
          Model regulated manufacturing workflows, simulate a process change,
          and trace cascading impacts with AI-powered regulatory analysis.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          {["21 CFR", "ICH Q10", "EU GMP Annex 11"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #2d4a6b",
                color: "#94a3b8",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
