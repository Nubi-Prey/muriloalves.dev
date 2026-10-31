import { ImageResponse } from "next/og";
import { ptDictionary } from "@/i18n/dictionaries/pt";
import { enDictionary } from "@/i18n/dictionaries/en";

export const alt =
  "Murilo Alves // Engenheiro de Software & Sistemas | Software & Systems Engineer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#121314",
          color: "#ede5d8",
          padding: "56px 64px",
          border: "4px solid #2e2f31",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Industrial Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #2e2f31",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: "#b83a20",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#ede5d8",
              }}
            >
              {ptDictionary.header.title}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              backgroundColor: "#1c1b1d",
              border: "2px solid #b83a20",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#ede5d8",
            }}
          >
            {enDictionary.hero.statusBadge}
          </div>
        </div>

        {/* Center Identity & Role */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#ede5d8",
              lineHeight: 1.05,
            }}
          >
            {ptDictionary.hero.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "30px",
              fontWeight: 600,
              color: "#b83a20",
            }}
          >
            {`${ptDictionary.hero.role} // ${enDictionary.hero.role}`}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#a8a29e",
              lineHeight: 1.4,
              maxWidth: "980px",
            }}
          >
            {enDictionary.hero.bio}
          </div>
        </div>

        {/* Bottom Stack Tags & Verification */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #2e2f31",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            {enDictionary.hero.tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  backgroundColor: "#1c1b1d",
                  border: "1px solid #3f3f46",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#ede5d8",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: 700,
              color: "#b83a20",
              letterSpacing: "0.04em",
            }}
          >
            github.com/Nubi-Prey
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
