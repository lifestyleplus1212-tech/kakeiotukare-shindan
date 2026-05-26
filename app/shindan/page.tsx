"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
    { axis: "軸① 疲れの原因", text: "毎月の収支を把握しているのに、なぜか不安が消えない。", comments: ["きちんと把握できて、不安もない。それは理想的な状態です。", "少し気になることはある、くらいでしょうか。", "わかっているのに晴れないモヤモヤ、ありますよね。", "把握しているのに不安が消えないのは、数字の問題じゃないかもしれません。", "ずっとそのモヤモヤを抱えてきたんですね。一人で抱え込まないでください。"] },
    { axis: "軸① 疲れの原因", text: "収入が増えれば、家計の問題は解決すると思っている。", comments: ["収入以外の視点でも考えられているんですね。", "少しそう感じることもあるくらいでしょうか。", "収入が増えれば…って思いたくなりますよね。", "収入への期待が大きい分、今がしんどいかもしれません。", "その気持ち、すごくよくわかります。でも原因は別にあるかも。"] },
    { axis: "軸① 疲れの原因", text: "節約しているのに、貯蓄が増えている実感がない。", comments: ["貯蓄の手応えを感じられているんですね。", "少し物足りなさを感じることもあるくらいでしょうか。", "頑張っているのに実感がないのは、つらいですよね。", "節約疲れになっていないか、少し心配です。", "ずっと頑張ってきたのに報われない感じ、受け取りました。"] },
    { axis: "軸① 疲れの原因", text: "何にお金を使うべきか、優先順位がわからない。", comments: ["優先順位が整理できているんですね。", "少し迷うこともあるくらいでしょうか。", "何を削ればいいか、本当に悩みますよね。", "判断の連続で、疲れてきていませんか。", "毎日選択の連続で、消耗しているかもしれません。"] },
    { axis: "軸① 疲れの原因", text: "投資や保険を見直したいが、何から始めればいいかわからない。", comments: ["方向性が見えているんですね。", "少し手がつけられない感じもあるくらいでしょうか。", "情報が多すぎて、どれが正しいかわかりませんよね。", "焦りと迷いが重なっている状態かもしれません。", "情報の海で溺れそうになっている感じ、伝わります。"] },
    { axis: "軸② 行動パターン", text: "家計の問題を、後で考えようと先送りにしがちだ。", comments: ["先送りせずに向き合えているんですね。", "少し先送りしてしまうこともあるくらいでしょうか。", "「後でいいか」って思いたくなりますよね。", "先送りが続くと、どんどん重くなってしまいますよね。", "ずっと見ないふりをしてきた分、疲れも積み重なっていそうです。"] },
    { axis: "軸② 行動パターン", text: "「なんとかなるだろう」と思いながら、なんとかなっていない。", comments: ["しっかり現実と向き合えているんですね。", "少しそういう気持ちになることもあるくらいでしょうか。", "「なんとかなる」って思いたい気持ち、わかります。", "その言葉で自分を支えてきたんですね。", "「なんとかなる」と信じながら、内心ずっと不安だったんですね。"] },
    { axis: "軸② 行動パターン", text: "家計管理アプリや家計簿を、挫折したことがある、または使ったことがない。", comments: ["継続できているんですね。それは本当にすごいことです。", "少し続かなかった経験もあるくらいでしょうか。","始めてみたけど続かない、または踏み出せない…そういう方はとても多いです。","何度か試みてきたんですね。うまくいかなくても、気にしてきた証拠です。", "使えていない自分を責めなくて大丈夫です。始め方さえ変えれば、変わります。"]},
    { axis: "軸② 行動パターン", text: "お金の不安を感じたとき、誰にも相談できない。", comments: ["相談できる環境があるんですね。それは大きな支えになります。", "相談できる人がいることもあるくらいでしょうか。", "なかなか相談できる人がいない、という方はとても多いです。", "一人で抱えてきた時間、長かったんですね。その重さ、受け取りました。", "誰にも言えないまま、ずっと一人で考えてきたんですね。もうここにいます。"] },
    { axis: "軸② 行動パターン", text: "FPやお金の専門家に相談したいが、敷居が高く、費用も気になって動けていない。", comments: ["専門家との距離が近いんですね。", "少し躊躇することもあるくらいでしょうか。", "「売り込まれそう」って思いますよね。その感覚は正しいです。", "踏み出せない理由、ちゃんとあると思います。", "ずっと気になりながら動けなかった、その気持ちわかります。"] },
    { axis: "軸③ 家族・環境要因", text: "家計のことを気にしているのは、家族の中で自分だけだと感じる。", comments: ["家族で共有できているんですね。心強いです。", "少し温度差を感じることもあるくらいでしょうか。", "一人で気にしている感覚、ありますよね。", "孤独に管理している重さ、伝わります。", "ずっと一人で背負ってきたんですね。その重さ、受け取りました。"] },
    { axis: "軸③ 家族・環境要因", text: "お金の話を家族とすると、ケンカになるか話が進まない。", comments: ["家族とオープンに話せているんですね。", "少し難しいと感じることもあるくらいでしょうか。", "お金の話って、どうしてこじれやすいんでしょうね。", "毎回うまくいかないと、話すこと自体が怖くなりますよね。", "話すたびに傷ついてきたんですね。その疲れ、感じます。"] },
    { axis: "軸③ 家族・環境要因", text: "自分が倒れたら、家計が回らなくなると思う。", comments: ["サポート体制が整っているんですね。", "少し不安を感じることもあるくらいでしょうか。", "その責任感、家族への愛情の裏返しだと思います。", "一人で支えているプレッシャー、相当なものですね。", "「倒れられない」という緊張が、ずっと続いているんですね。"] },
    { axis: "軸③ 家族・環境要因", text: "毎日やりくりしているのに、誰にも認めてもらえていない気がする。", comments: ["認めてもらえている実感があるんですね。", "少し物足りなさを感じることもあるくらいでしょうか。", "見えない努力って、なかなか気づいてもらえないですよね。", "その頑張り、ちゃんと価値があります。", "誰にも気づかれないまま続けてきたんですね。本当によく頑張っています。"] },
    { axis: "軸③ 家族・環境要因", text: "このまま何も変わらないかもしれない、と思うことがある。", comments: ["前向きに取り組めているんですね。", "少しそう感じることもあるくらいでしょうか。", "変わらないかも、という不安はとても自然な気持ちです。", "その諦めに近い感覚、長く抱えてきたんですね。", "「変われないかも」という重さ、ずっと一人で持ってきたんですね。"] },
    { axis: "軸③ 家族・環境要因", text: "「これが正解」という情報が多すぎて、誰を信じればいいかわからない。", comments: ["情報を整理できているんですね。", "少し迷うこともあるくらいでしょうか。", "情報が多すぎて、逆に不安になりますよね。", "何が正しいかわからなくて、疲れてきていませんか。", "情報の波に飲まれて、もう考えたくないという気持ち、わかります。"] },
];

export default function ShindanPage() {
    const [currentQ, setCurrentQ] = useState(0);
    const router = useRouter();

    const handleFinish = () => {
        router.push(`/shindan/result?a=${answers.join(",")}`);
    };
    const [answers, setAnswers] = useState<number[]>(Array(16).fill(1));

    const q = questions[currentQ];
    const value = answers[currentQ];
    const progress = ((currentQ + 1) / 16) * 100;

    const handleSlider = (v: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQ] = v;
        setAnswers(newAnswers);
    };

    const emojis = [
        { icon: "😌", label: "全くない" },
        { icon: "🙂", label: "あまりない" },
        { icon: "😐", label: "どちらとも" },
        { icon: "😔", label: "わりとある" },
        { icon: "😩", label: "非常にある" },
    ];

    return (
        // 全体の背景・中央寄せ
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
                <div style={{ position: "absolute", top: 80, left: 60, zIndex: 0 }}>
                    <div style={{ width: 64, height: 20, background: "#fff", borderRadius: 40, opacity: 0.65, position: "relative" }}>
                        <div style={{ position: "absolute", width: 28, height: 28, background: "#fff", borderRadius: "50%", top: -16, left: 8 }} />
                        <div style={{ position: "absolute", width: 20, height: 20, background: "#fff", borderRadius: "50%", top: -12, left: 28 }} />
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#3a7a9c" }}>家計のお疲れ診断</span>
                        <span style={{ fontSize: 12, color: "#5a9ab8" }}>Q{currentQ + 1} / 16</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(180,220,240,0.5)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${progress}%`, background: "#7F77DD", borderRadius: 2, transition: "width 0.4s ease" }} />
                    </div>
                </div>

                {/* コンテンツ */}
                <div style={{ flex: 1, padding: "24px 22px 20px", position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 11, color: "#5a9ab8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                        {q.axis}
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.65, color: "#12303f", fontWeight: 500, marginBottom: 28 }}>
                        {q.text}
                    </p>

                    {/* 絵文字 + ラベル */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        {emojis.map((e, i) => {
                            const active = value === i + 1;
                            return (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 52 }}>
                                    <span style={{
                                        fontSize: 22,
                                        opacity: active ? 1 : 0.3,
                                        transform: active ? "scale(1.25)" : "scale(1)",
                                        transition: "all 0.2s ease",
                                        display: "block"
                                    }}>
                                        {e.icon}
                                    </span>
                                    <span style={{
                                        fontSize: active ? 11 : 9,
                                        fontWeight: active ? 700 : 400,
                                        color: active ? "#2e6a88" : "#8bbdd4",
                                        textAlign: "center",
                                        lineHeight: 1.3,
                                        transition: "all 0.2s ease",
                                    }}>
                                        {e.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* スライダー */}
                    <input
                        type="range" min={1} max={5} step={1} value={value}
                        onChange={(e) => handleSlider(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#7F77DD", margin: "4px 0 0" }}
                    />

                    {/* 共感コメント */}
                    <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "14px 16px", margin: "18px 0 24px", minHeight: 68, display: "flex", alignItems: "center", border: "0.5px solid rgba(200,230,245,0.9)" }}>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#2e6a88" }}>
                            {q.comments[value - 1]}
                        </p>
                    </div>

                    {/* ナビゲーション */}
                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            onClick={() => setCurrentQ((prev) => Math.max(0, prev - 1))}
                            disabled={currentQ === 0}
                            style={{ flex: 1, padding: 12, borderRadius: 8, border: "0.5px solid rgba(180,210,230,0.9)", background: "rgba(255,255,255,0.5)", fontSize: 14, color: "#5a9ab8", cursor: currentQ === 0 ? "not-allowed" : "pointer", opacity: currentQ === 0 ? 0.4 : 1 }}
                        >
                            ← 戻る
                        </button>
                        <button
                            onClick={() => currentQ === 15 ? handleFinish() : setCurrentQ((prev) => Math.min(15, prev + 1))}
                            style={{ flex: 2, padding: 12, borderRadius: 8, border: "none", background: "#7F77DD", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
                        >
                            {currentQ === 15 ? "結果を見る →" : "次へ →"}
                        </button>
                    </div>
                </div>

                {/* ドットナビ */}
                <div style={{ display: "flex", justifyContent: "center", gap: 5, padding: "10px 0 20px", position: "relative", zIndex: 1 }}>
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === currentQ ? "#7F77DD" : "rgba(180,220,240,0.8)" }} />
                    ))}
                </div>
            </div>
        </div>
    );
}