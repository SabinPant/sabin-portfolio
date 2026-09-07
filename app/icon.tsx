import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      // A favicon cannot follow the theme, so it uses the lit signal amber
      // with dark ink: the pairing that stays legible against both a light
      // and a dark browser chrome at 16px.
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 6,
          background: "#e08a16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0c1014",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        SP
      </div>
    ),
    { ...size },
  );
}
