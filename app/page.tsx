"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100svh", background: "#b8dff0", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 600, minHeight: "100svh", background: "#c8e8f5", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* 雲（上） */}
        <div style={{ position: "absolute", top: 18, left: 12, zIndex: 0 }}>
          <div style={{ width: 110, height: 36, background: "#fff", borderRadius: 40, opacity: 0.85, position: "relative" }}>
            <div style={{ position: "absolute", width: 52, height: 52, background: "#fff", borderRadius: "50%", top: -28, left: 16 }} />
            <div style={{ position: "absolute", width: 38, height: 38, background: "#fff", borderRadius: "50%", top: -20, left: 52 }} />
          </div>
        </div>
        <div style={{ position: "absolute", top: 36, right: 10, zIndex: 0 }}>
          <div style={{ width: 88, height: 28, background: "#fff", borderRadius: 40, opacity: 0.75, position: "relative" }}>
            <div style={{ position: "absolute", width: 40, height: 40, background: "#fff", borderRadius: "50%", top: -22, left: 12 }} />
            <div style={{ position: "absolute", width: 28, height: 28, background: "#fff", borderRadius: "50%", top: -16, left: 40 }} />
          </div>
        </div>

        {/* 雲（下） */}
        <div style={{ position: "absolute", bottom: 50, right: 12, zIndex: 0 }}>
          <div style={{ width: 100, height: 32, background: "#fff", borderRadius: 40, opacity: 0.85, position: "relative" }}>
            <div style={{ position: "absolute", width: 46, height: 46, background: "#fff", borderRadius: "50%", top: -26, left: 14 }} />
            <div style={{ position: "absolute", width: 32, height: 32, background: "#fff", borderRadius: "50%", top: -18, left: 48 }} />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: 8, zIndex: 0 }}>
          <div style={{ width: 74, height: 24, background: "#fff", borderRadius: 40, opacity: 0.7, position: "relative" }}>
            <div style={{ position: "absolute", width: 34, height: 34, background: "#fff", borderRadius: "50%", top: -18, left: 10 }} />
            <div style={{ position: "absolute", width: 24, height: 24, background: "#fff", borderRadius: "50%", top: -13, left: 34 }} />
          </div>
        </div>

        {/* コンテンツ */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 28px 40px", position: "relative", zIndex: 1 }}>

          {/* ヒーロー */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🌤️</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#12303f", lineHeight: 1.6, marginBottom: 10 }}>
              家計のお疲れ診断
            </h1>
            <p style={{ fontSize: 13, color: "#5a9ab8", marginBottom: 16 }}>福田FP監修 × AI分析</p>
            <p style={{ fontSize: 14, color: "#2e6a88", lineHeight: 1.75 }}>
              16問に答えるだけで、あなたの<br />「家計疲れのタイプ」がわかります。
            </p>
          </div>

          {/* 共感セクション */}
          <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 16, padding: "20px", marginBottom: 24, border: "0.5px solid rgba(200,230,245,0.9)" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#3a7a9c", marginBottom: 14 }}>こんな気持ち、ありませんか？</p>
            {[
              "毎月やりくりしているのに、なぜか不安が消えない",
              "節約しているのに、貯金が増えている実感がない",
              "何から手をつければいいのか、わからない",
              "お金の話を、誰にも相談できていない",
              "このまま何も変わらないかもしれない、と思う",
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 13, color: "#7F77DD", marginTop: 1 }}>✓</span>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#2e6a88" }}>{text}</p>
              </div>
            ))}
          </div>

          {/* CTAボタン */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
                  (window as any).gtag("event", "shindan_start");
                }
                router.push("/shindan");
              }}
              style={{ padding: "16px 48px", borderRadius: 50, border: "none", background: "#7F77DD", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(127,119,221,0.35)" }}
            >
              無料で診断する →
            </button>
            <p style={{ fontSize: 13, color: "#3a7a9c", marginTop: 12, fontWeight: 600 }}>約90秒・無料・売り込みなし</p>
          </div>

          {/* 監修者紹介 */}
          <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 16, padding: "16px 20px", marginTop: 24, border: "0.5px solid rgba(200,230,245,0.9)" }}>
            <p style={{ fontSize: 11, color: "#5a9ab8", marginBottom: 8, letterSpacing: "0.06em" }}>👤 監修者について</p>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#2e6a88" }}>
              福田FP（AFP認定ファイナンシャルプランナー）。「我慢より、選択を。」をモットーに、お金のモヤモヤを一緒に整理することを大切にしています。
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}