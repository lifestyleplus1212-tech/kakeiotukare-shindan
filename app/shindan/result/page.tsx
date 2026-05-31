"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const types = [
  {
    id: 1, icon: "🌫️", name: "霧で見えない",
    short: "何が問題かが見えない・優先順位迷子",
    desc: "お金のことが「なんとなく不安」なのに、何が問題かがはっきり見えない状態です。収支は把握しているのに、どこから手をつければいいのかわからない。霧の中を歩いているような、そんな感覚が続いていませんか。",
    preview: "あなたの不安の正体は「見えないこと」そのものです。数字の問題より先に、まず「何が気になっているのか」を言葉にすることが、霧を晴らす第一歩になります。",
    advice: "まず「今一番気になっていること」を紙に1つだけ書いてみてください。頭の中にあるものを外に出すだけで、霧が少し晴れることがあります。",
    fpComment: "見えないこと自体は、問題じゃないんです。見ようとしているあなたは、もう一歩踏み出して前に進んでいます。霧は、少しずつ晴れていきます。",
  },
  {
    id: 2, icon: "⛈️", name: "嵐で身動き取れない",
    short: "一人で全部背負って疲弊している",
    desc: "家計のことを、ほぼ一人で背負ってきたのではないでしょうか。誰かに相談することもできず、家族にも理解されないまま、ずっと孤独に管理してきた。その重さが、今の疲れの正体かもしれません。",
    preview: "一人で嵐の中に立ち続けているような状態です。必要なのは「正しい知識」より先に、「一緒に考えてくれる誰か」かもしれません。",
    advice: "一人で抱えすぎています。まず「話せる場所を1つ作ること」が最優先です。家族でなくても、専門家でも構いません。",
    fpComment: "一人でがんばってきた時間、本当に長かったですね。もう一人で全部やらなくていいです。話せる場所が、きっとあります。",
  },
  {
    id: 3, icon: "☁️", name: "曇りでどんより",
    short: "なんとなく不安が晴れない",
    desc: "大きな問題があるわけじゃないけど、なんとなくすっきりしない。家計の雲が、ずっと頭の上に漂っている感じ。その「なんとなく」をそのままにしてきた時間が、じわじわと疲れを積み重ねているのかもしれません。",
    preview: "曇り空は、嵐より地味に消耗します。「大したことない」と思いながら放置してきたモヤモヤの正体を、一緒に言葉にしてみましょう。",
    advice: "「なんとなく不安」を放置しないことが大切です。月1回、5分だけ家計を眺める時間を作るだけで、曇りが少しずつ晴れていきます。",
    fpComment: "「大したことない」って思いながら、ずっと気になってきたんですよね。そのモヤモヤは、ちゃんと意味があるサインです。",
  },
  {
    id: 4, icon: "🌦️", name: "にわか雨でずぶぬれ",
    short: "突然の出費にいつも慌てる",
    desc: "貯金しようとしているのに、なぜか急な出費が重なって気づけば残高が心もとない。計画は立てるけど、予想外のことに何度も足をすくわれてきた。その繰り返しが、自信をなくさせているのかもしれません。",
    preview: "にわか雨は防げます。ただし「傘を持ち歩く習慣」が必要です。あなたの家計に合った備え方を、具体的に整理していきましょう。",
    advice: "「特別支出の予備費」として毎月少額でも分けて積み立てる習慣が、にわか雨への一番の備えになります。",
    fpComment: "急な出費に迷うのは、あなたのせいじゃないです。備え方を知らなかっただけ。知っていれば、大丈夫です。",
  },
  {
    id: 5, icon: "🌀", name: "台風で大荒れ",
    short: "家族の中心で消耗している",
    desc: "家計を回すことに、ほとんどのエネルギーを使い切っている状態です。家族のために頑張っているのに、誰にも気づかれない。「倒れられない」というプレッシャーが、ずっと続いていませんか。",
    preview: "台風の目の中にいる人は、自分が嵐の中にいることに気づきにくいものです。今のあなたに本当に必要なことを、一緒に整理しましょう。",
    advice: "まず自分を守ることを優先してください。家計管理を少し「サボる」勇気も、長く続けるためには必要です。",
    fpComment: "倒れないように、ずっと踏ん張ってきたんですね。その責任感は本物です。でも、自分を守ることも、家族を守ることと同じくらい大切です。",
  },
  {
    id: 6, icon: "🌧️", name: "梅雨でジメジメ",
    short: "見て見ぬふりが続いている",
    desc: "「後でやろう」が続いてきた状態です。見ないようにしているわけじゃないけど、なかなか動けない。梅雨のように、ジメジメとした重さが毎日続いている感覚はありませんか。",
    preview: "先送りは意志の弱さではなく、「どこから手をつけていいかわからない」サインです。最初の一歩を小さく設定することで、動き出せます。",
    advice: "「全部やろう」としないことが大切です。今日は通帳を1つ開くだけ、それだけでOKというくらい小さく始めてみてください。",
    fpComment: "先送りしてしまうのは、意志が弱いからじゃないです。どこから手をつければよくわからないだけ。一緒に、最初の一歩を小さく設定しましょう。",
  },
  {
    id: 7, icon: "⚡", name: "雷でフリーズ",
    short: "投資しなきゃと焦って空回り",
    desc: "「やらなきゃ」という焦りはあるのに、情報が多すぎて何も進んでいない状態です。NISAや保険、節約術…正しい情報を探せば探すほど、迷いが増えていく。その雷に打たれてフリーズしている感じ、ありませんか。",
    preview: "情報過多の時代、「知ること」より「絞ること」が大事です。あなたの状況に本当に必要な情報だけを選んで、整理していきましょう。",
    advice: "情報収集をいったん止めてください。今持っている情報だけで「まず1つだけ決める」ことが、フリーズを解除する鍵です。",
    fpComment: "情報が多すぎて、何も決められない状態になっているかも。「誰かが言ってる正解」を探すより、「今の自分に合った答え」を選ぶことの方が大事です。",
  },
  {
    id: 8, icon: "🌤️", name: "空梅雨でカラカラ",
    short: "頑張っているのに実感がない",
    desc: "節約も家計管理も、ちゃんとやっているのに手応えがない。努力しているのに何も変わっていない気がして、だんだん虚しくなってきている。その感覚は、方向性がずれているサインかもしれません。",
    preview: "頑張り方が間違っているわけではありません。ただ、向かっている方向が少しずれているだけかもしれません。あなたの努力が実る方向を、一緒に見つけましょう。",
    advice: "「節約」より「収入の使い道の最適化」に視点を変えてみてください。頑張る方向を少し変えるだけで、実感が変わることがあります。",
    fpComment: "頑張っているのに報われない感覚、本当につらいですよね。方向を少し変えるだけで、同じ努力が実り始めることがあります。一緒に見つけましょう。",
  },
];

const questionTexts = [
  "収支を把握しているのに不安が消えない",
  "収入が増えれば解決すると思っている",
  "節約しているのに貯金が増える実感がない",
  "お金の優先順位がわからない",
  "投資・保険の見直しで何から始めるかわからない",
  "家計の問題を先送りにしがちだ",
  "なんとかなると思いながらなんとかなっていない",
  "家計管理を始めては挫折したことがある",
  "お金の不安を相談できる人がいない",
  "FP相談の敷居が高くて動けていない",
  "家計を気にしているのは自分だけだと感じる",
  "お金の話を家族とするとうまくいかない",
  "自分が倒れたら家計が回らなくなると思う",
  "やりくりしているのに誰にも認めてもらえない",
  "このまま何も変わらないかもしれないと思う",
  "正しい情報が多すぎて誰を信じればいいかわからない",
];

type ReportData = {
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  s5: string;
  s_fp: string;
  s6: string;
};

function determineType(answers: number[]): number {
  const a1 = answers.slice(0, 5).reduce((s, v) => s + v, 0);
  const a2 = answers.slice(5, 10).reduce((s, v) => s + v, 0);
  const a3 = answers.slice(10, 16).reduce((s, v) => s + v, 0);
  const n1 = a1 / 25;
  const n2 = a2 / 25;
  const n3 = a3 / 30;
  if (n2 >= 0.6 && n3 >= 0.6) return 2;
  if (n3 >= 0.7) return 5;
  if (n2 >= 0.7) return 6;
  if (n1 >= 0.6 && n2 >= 0.6) return 7;
  if (n1 >= 0.6) {
    if (answers[2] >= 4) return 8;
    if (answers[3] >= 4) return 1;
    return 4;
  }
  return 3;
}

function getHighlightedQuestions(answers: number[]): string[] {
  return answers
    .map((v, i) => ({ v, i }))
    .filter((a) => a.v >= 4)
    .sort((a, b) => b.v - a.v)
    .slice(0, 2)
    .map((a) => questionTexts[a.i]);
}

function ResultContent() {
  const params = useSearchParams();
  const raw = params.get("a") ?? "";
  const answers = raw.split(",").map(Number);
  const typeId = determineType(answers);
  const type = types.find((t) => t.id === typeId) ?? types[2];
  const highlights = getHighlightedQuestions(answers);

  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const paid = params.get("paid");

  useEffect(() => {
    if (paid === "true" && !report) {
      handleGetReport();
    }
  }, []);

  const loadingMessages = [
    "あなたの回答を分析しています...",
    "不安のパターンを読み取っています...",
    "16問のデータを照らし合わせています...",
    "福田FPのメソッドと組み合わせています...",
    "レポートを仕上げています...",
  ];

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answers.join(","), typeId }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleGetReport = async () => {
    setLoading(true);
    let msgIndex = 0;
    setLoadingMessage(loadingMessages[0]);
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[msgIndex]);
    }, 3000);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, typeName: type.name, typeShort: type.short }),
      });
      const data = await res.json();
      setReport(data.report as ReportData);
    } catch (e) {
      console.error(e);
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
      clearInterval(msgInterval);
    }
  };

  const handleDownloadPDF = async () => {
    if (!report) return;
    const element = document.getElementById("report-content");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#c8e8f5",
    });

    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 0;
    while (y < imgHeight) {
      if (y > 0) doc.addPage();
      doc.addImage(imgData, "PNG", 0, -y, imgWidth, imgHeight);
      y += pageHeight;
    }

    doc.save(`家計のお疲れ診断_レポート_${type.name}.pdf`);
  };

  const sections = report
    ? [
      { title: "① タイプの深掘り", icon: "🔍", content: report.s1 },
      { title: "② 回答パターン分析", icon: "📊", content: report.s2 },
      { title: "③ 不安の根本原因", icon: "🌱", content: report.s3 },
      { title: "④ 今すぐやるべきこと", icon: "✅", content: report.s4 },
      { title: "⑤ 家計の目安・50-30-20ルール", icon: "💡", content: report.s5 },
      { title: "⑥ 次のステップ", icon: "👣", content: report.s6 },
    ]
    : [];

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

        {/* ヘッダー */}
        <div style={{ background: "rgba(255,255,255,0.45)", borderBottom: "0.5px solid rgba(180,210,230,0.5)", padding: "18px 22px 14px", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#3a7a9c" }}>家計のお疲れ診断　結果</span>
        </div>

        {/* コンテンツ */}
        <div style={{ flex: 1, padding: "28px 22px 24px", position: "relative", zIndex: 1, overflowY: "auto" }}>

          {/* タイプ発表 */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 72, marginBottom: 12, lineHeight: 1 }}>{type.icon}</div>
            <div style={{ fontSize: 11, color: "#5a9ab8", letterSpacing: "0.08em", marginBottom: 6 }}>あなたのタイプは</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#12303f", marginBottom: 6 }}>{type.name}</div>
            <div style={{ fontSize: 13, color: "#5a9ab8" }}>{type.short}</div>
          </div>

          {/* 説明 */}
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "16px", marginBottom: 16, border: "0.5px solid rgba(200,230,245,0.9)" }}>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#2e6a88" }}>{type.desc}</p>
          </div>

          {/* 特に気になっていること */}
          {highlights.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "16px", marginBottom: 16, border: "0.5px solid rgba(200,230,245,0.9)" }}>
              <div style={{ fontSize: 11, color: "#5a9ab8", marginBottom: 10, letterSpacing: "0.06em" }}>📊 特に気になっていること</div>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: i < highlights.length - 1 ? 8 : 0 }}>
                  <span style={{ fontSize: 12, color: "#7F77DD", fontWeight: 700, marginTop: 1 }}>▶</span>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "#2e6a88" }}>{h}</p>
                </div>
              ))}
            </div>
          )}

          {/* アドバイス */}
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "16px", marginBottom: 16, border: "0.5px solid rgba(200,230,245,0.9)" }}>
            <div style={{ fontSize: 11, color: "#5a9ab8", marginBottom: 8, letterSpacing: "0.06em" }}>💡 まず試してほしいこと</div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#2e6a88" }}>{type.advice}</p>
          </div>

          {/* 福田FPコメント */}
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "16px", marginBottom: 16, border: "0.5px solid rgba(127,119,221,0.25)" }}>
            <div style={{ fontSize: 11, color: "#7F77DD", marginBottom: 8, letterSpacing: "0.06em" }}>👤 福田FPより</div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#2e6a88", fontStyle: "italic" }}>{type.fpComment}</p>
          </div>

        {/* レポートエリア */}
          {report ? (
            <>
              <div id="report-content" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#5a9ab8", marginBottom: 12, letterSpacing: "0.06em" }}>📄 あなただけの詳細レポート</div>

                {sections.map((section, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "16px", marginBottom: 12, border: "0.5px solid rgba(200,230,245,0.9)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 18 }}>{section.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#3a7a9c" }}>{section.title}</span>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: "#2e6a88" }}>{section.content}</p>
                  </div>
                ))}

                {/* 福田FPより（レポート内） */}
                <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "16px", marginBottom: 12, border: "0.5px solid rgba(127,119,221,0.25)" }}>
                  <div style={{ fontSize: 11, color: "#7F77DD", marginBottom: 8, letterSpacing: "0.06em" }}>👤 福田FPからあなたへ</div>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "#2e6a88", fontStyle: "italic" }}>{report.s_fp}</p>
                </div>
              </div>

              {/* PDFダウンロード */}
              <button
                onClick={handleDownloadPDF}
                style={{ width: "100%", padding: "13px", borderRadius: 10, border: "0.5px solid rgba(58,122,156,0.4)", background: "rgba(255,255,255,0.8)", color: "#3a7a9c", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 12 }}
              >
                📥 レポートをPDFで保存する
              </button>
            </>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "16px", marginBottom: 16, border: "0.5px solid rgba(200,230,245,0.9)", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 11, color: "#5a9ab8", marginBottom: 8, letterSpacing: "0.06em" }}>📄 詳細レポート（冒頭）</div>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "#2e6a88" }}>{type.preview}</p>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, rgba(240,250,255,0.95))", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 10 }}>
                <span style={{ fontSize: 18 }}>🔒</span>
              </div>
            <div style={{ height: 30 }} />
          </div>
          )}

          {/* もう一度診断する */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <button
              onClick={() => window.location.href = "/shindan"}
              style={{ background: "none", border: "none", color: "#3a7a9c", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
            >
              🔄 もう一度診断する
            </button>
          </div>

          {/* 出口ボタン */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {!report && (
              <button
                onClick={handleCheckout}
                disabled={loading}
                style={{ padding: "14px", borderRadius: 10, border: "none", background: loading ? "#aaa" : "#7F77DD", color: "#fff", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "処理中..." : "📄 詳細レポートを読む（500円）"}
              </button>
            )}
            {loading && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <style>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                  }
                  .float-icon { animation: float 2s ease-in-out infinite; display: inline-block; }
                `}</style>
                <div className="float-icon" style={{ fontSize: 40, marginBottom: 12 }}>🌤️</div>
                <p style={{ fontSize: 13, color: "#3a7a9c", lineHeight: 1.75 }}>{loadingMessage}</p>
              </div>
            )}
            <button
              onClick={() => window.open("https://moyasapo.com/", "_blank")}
              style={{ padding: "14px", borderRadius: 10, border: "0.5px solid rgba(180,210,230,0.9)", background: "rgba(255,255,255,0.6)", color: "#3a7a9c", fontSize: 14, cursor: "pointer" }}
            >
              💬 モヤサポ+を試してみる
            </button>
            <button
              onClick={() => window.open("https://www.lifestyleplus-fp.com/personal-services/", "_blank")}
              style={{ padding: "14px", borderRadius: 10, border: "0.5px solid rgba(180,210,230,0.9)", background: "rgba(255,255,255,0.6)", color: "#3a7a9c", fontSize: 14, cursor: "pointer" }}
            >
              👤 FP相談を詳しく見る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}