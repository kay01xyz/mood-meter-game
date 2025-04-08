import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./components/ui/card";

const emotionTags = [
  "快樂 (Happy)", "甜蜜 (Sweet)", "熱情 (Passionate)", "感動 (Touched)",
  "自豪 (Proud)", "幸福 (Blessed)", "興奮 (Excited)", "難過 (Sad)",
  "心痛 (Heartbroken)", "委屈 (Wronged)", "內疚 (Guilty)", "失望 (Disappointed)",
  "憂鬱 (Depressed)", "沮喪 (Frustrated)", "後悔 (Regretful)", "絕望 (Desperate)",
  "無奈 (Helpless)", "寂寞 (Lonely)", "自卑 (Inferior)", "迷惘 (Confused)",
  "厭倦 (Weary)", "空虛 (Empty)", "麻木 (Numb)", "心淡 (Apathetic)",
  "困擾 (Troubled)", "無助 (Powerless)", "驚訝 (Surprised)", "尷尬 (Embarrassed)",
  "害怕 (Afraid)", "擔心 (Worried)", "不安 (Uneasy)", "期待 (Anticipating)",
  "焦急 (Anxious)", "孤單 (Alone)", "緊張 (Nervous)", "不忿 (Resentful)",
  "暴躁 (Irritable)", "妒忌 (Jealous)", "生氣 (Angry)", "沉悶 (Dull)",
  "厭惡 (Disgusted)", "滿足 (Content)", "輕鬆 (Relaxed)", "平靜 (Calm)",
  "釋懷 (Relieved)", "欣慰 (Comforted)", "不滿 (Dissatisfied)", "安心 (At Ease)",
  "挫敗 (Defeated)", "驚喜 (Delighted)"
];

export default function MoodMeterGame() {
  const [tags, setTags] = useState(emotionTags);
  const [placed, setPlaced] = useState([]);

  const handleDrop = (e) => {
    const tag = e.dataTransfer.getData("text/plain");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 40;
    const y = e.clientY - rect.top - 20;

    const alreadyPlaced = placed.find((t) => t.tag === tag);
    if (alreadyPlaced) {
      setPlaced(placed.map((t) => (t.tag === tag ? { ...t, x, y } : t)));
    } else {
      setPlaced([...placed, { tag, x, y }]);
      setTags(tags.filter((t) => t !== tag));
    }
  };

  const handleReset = () => {
    setPlaced([]);
    setTags(emotionTags);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">情緒坐標 | Mood Meter</h1>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset All
      </button>

      {/* Responsive Mood Meter Grid */}
      <div
        className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] border-2 border-black mb-6"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Background Quadrants */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-100"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-100"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-100"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-100"></div>

        {/* Axis Lines */}
        <div className="absolute w-full h-px bg-black top-1/2 left-0"></div>
        <div className="absolute h-full w-px bg-black left-1/2 top-0"></div>

        {/* Labels */}
        <div className="absolute top-2 left-2 text-[10px] sm:text-xs font-semibold">高能量 / 負向</div>
        <div className="absolute top-2 right-2 text-[10px] sm:text-xs font-semibold">高能量 / 正向</div>
        <div className="absolute bottom-2 left-2 text-[10px] sm:text-xs font-semibold">低能量 / 負向</div>
        <div className="absolute bottom-2 right-2 text-[10px] sm:text-xs font-semibold">低能量 / 正向</div>

        {/* Placed Tags (Repositionable) */}
        {placed.map(({ tag, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute z-10"
            style={{ x, y }}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => {
              const rect = e.target.offsetParent.getBoundingClientRect();
              const newX = info.point.x - rect.left - 40;
              const newY = info.point.y - rect.top - 20;

              setPlaced((prev) =>
                prev.map((t, i) =>
                  i === index ? { ...t, x: newX, y: newY } : t
                )
              );
            }}
          >
            <Card className="text-xs sm:text-sm p-1 px-2 text-center bg-white shadow-md cursor-move whitespace-nowrap">
              {tag}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Unplaced Emotion Tags */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-5xl px-4">
        {tags.map((tag, idx) => (
          <Card
            key={idx}
            className="cursor-move text-center text-xs sm:text-sm p-2 hover:bg-gray-100"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", tag)}
          >
            {tag}
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs sm:text-sm text-gray-500 text-center px-4">
        拖動情緒詞，根據能量與愉悅程度放在你覺得合適的位置。你也可以重新移動已放置的情緒。
      </p>
    </div>
  );
}

