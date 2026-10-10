import { ImageResponse } from "next/og";

import { getDictionary, hasLocale } from "@/dictionaries";
import { i18n } from "@/i18n.config";

export const alt = "Vinícius Simon – vncius.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(
    hasLocale(locale) ? locale : i18n.defaultLocale,
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0b0b0b",
        color: "#eeeeee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            background: "#34d399",
          }}
        />
        <div style={{ fontSize: 32, color: "#a1a1a1" }}>vncius.dev</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -2 }}>
          Vinícius Simon
        </div>
        <div style={{ fontSize: 44, color: "#a1a1a1" }}>{dict.role}</div>
      </div>
    </div>,
    size,
  );
}
