import Image from "next/image";

const slogans = [
  ["簡單設計", "#用溫度淬煉品牌", "用溝通建構設計", "靈感來自土地"],
  ["簡單設計", "溫度淬煉品牌", "用溝通建構設計", "靈感來自土地"],
];

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-end bg-white overflow-hidden">
      {/* 左上標題 */}
      <h1 className="absolute left-8 top-8 text-3xl md:text-5xl font-black">
        Liam Design
      </h1>
      {/* 右上副標題 */}
      <div className="absolute right-8 top-8 text-base md:text-xl font-bold text-right">
        Design that listens.<br className="hidden md:block" />
        Design that grows
      </div>
      {/* 底部標語 */}
      <div className="w-full flex flex-col items-center gap-y-2 mb-24 md:mb-32">
        {slogans.map((row, i) => (
          <div
            key={i}
            className={`flex flex-wrap justify-center gap-x-6 md:gap-x-12 font-bold text-lg md:text-2xl tracking-wider`}
            style={{
              marginLeft: i % 2 === 0 ? 0 : "2rem",
            }}
          >
            {row.map((text, j) => (
              <span key={j}>{text}</span>
            ))}
          </div>
        ))}
      </div>
      {/* 底部中央動畫人物 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-48 pointer-events-none select-none">
        <Image
          src="/runner.gif"
          alt="runner"
          width={192}
          height={192}
          priority
        />
      </div>
    </section>
  );
} 