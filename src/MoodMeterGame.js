import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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

  const handlePlace = (tag, x, y) => {
    setPlaced([...placed, { tag, x, y }]);
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">情緒坐標 | Mood Meter</h1>
      <div className="relative w-[600px] h-[600px] border-2 border-gray-300">
        <div className="absolute w-1 h-full bg-black left-1/2 top-0"></div>
        <div className="absolute h-1 w-full bg-black top-1/2 left-0"></div>

        {placed.map(({ tag, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute bg-yellow-100 p-1 rounded shadow text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x, y }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {tag}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 max-w-4xl">
        {tags.map((tag, idx) => (
          <Card
            key={idx}
            onClick={() => handlePlace(tag, Math.random() * 500 - 250, Math.random() * 500 - 250)}
            className="cursor-pointer text-center p-2 hover:bg-gray-100"
          >
            {tag}
          </Card>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-500">點選一個情緒詞，將其放置在你認為適合的位置（高/低能量，正/負面）。</p>
    </div>
  );
}
