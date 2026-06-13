import { differenceInCalendarDays } from "date-fns";
import { CHALLENGE_START } from "./challenge";

/**
 * 30 daily quotes, indexed by days elapsed since `CHALLENGE_START` (with a
 * 7am Netherlands-time reset, see `getTodaysQuoteIndex`). Quote 30 (index 29)
 * is the challenge finale, shown on the last day.
 */
export const QUOTES: string[] = [
  "你不需要完美，你只需要今天比昨天好一点。加油！",
  "海伦·凯勒又聋又盲，却学会了说话、阅读和写作。她说：\"虽然世界充满苦难，但也充满了克服苦难的力量。\" 加油！",
  "相信自己，你比你想的更有力量。加油！",
  "《圣经》中的约伯失去了一切——财富、家人、健康——却从未放弃对神的信心。最终，他所失去的都加倍归还。坚持到底。加油！",
  "你选择了开始，这已经是最难的一步。加油！",
  "每一次坚持，都是对自己的承诺。加油！",
  "大卫面对巨人歌利亚，手中只有一块石头，心中却有无比的勇气。你面对的挑战，也不比他的更大。加油！",
  "不是因为看见才相信，而是因为相信才看见。加油！",
  "生命中最美的风景，是努力后的蜕变。加油！",
  "尼克·胡哲天生没有四肢，却环游世界演讲，激励了数百万人。他说：\"如果我能做到，你也可以。\" 加油！",
  "只要方向对了，慢一点也没关系。加油！",
  "《圣经》中以利亚精疲力竭地倒在树下，说\"我不想活了\"。但神派天使来，给他食物和水，对他说：\"起来，你当走的路甚远。\" 加油！",
  "你不是一个人在战斗，我们都在为你喝彩。加油！",
  "维克多·弗兰克在纳粹集中营里失去了一切，却在心中保留了一样东西：选择自己态度的自由。他说：\"人可以被夺走一切，除了最后的自由。\" 加油！",
  "再难也要微笑，再累也要前行。加油！",
  "塞尔玛·拉格洛夫是第一位获得诺贝尔文学奖的女性，她患有小儿麻痹症，双腿残疾，却用文字走遍了整个世界。身体的边界，从来都不是灵魂的边界。加油！",
  "你是妈妈，你是战士，你无所不能。加油！",
  "史蒂芬·霍金全身瘫痪，只能眨眼说话，却写出了改变人类对宇宙理解的著作。他说：\"无论生活多么艰难，你总能做些什么并且成功。\" 加油！",
  "累了就休息，但不要放弃。加油！",
  "弗洛伦斯·查德威克试图横渡卡塔利娜海峡，在距离终点仅一英里处放弃了——因为大雾让她看不见岸边。两个月后她再次尝试，这次她在心中记住了海岸线。她成功了。永远不要因为看不见终点而停下。加油！",
  "你有一个爱你的小Daniel，为他也为自己努力。加油！",
  "埃里克·利德尔在1924年巴黎奥运会上拒绝在安息日比赛，被人嘲笑没有荣誉感。他改跑其他项目，依然赢得金牌。他说：\"神造我奔跑是有目的的。\" 坚守你的信念，结果自会证明一切。加油！",
  "不要低估自己，你比你知道的更厉害。加油！",
  "玛丽·居里是历史上唯一一位在两个不同科学领域赢得诺贝尔奖的人。她在贫穷、歧视和丈夫去世的痛苦中，从未停止实验。她说：\"生活中没有什么可怕的，只有需要去理解的。\" 加油！",
  "你已经走了这么远，不要放弃。加油！",
  "苏珊·波伊尔四十七岁才第一次站上舞台，被所有人用眼神嘲笑。开口的那一刻，全场寂静，然后是雷鸣般的掌声。她等了四十七年，但她没有放弃那个梦。加油！",
  "特蕾莎修女在日记中承认，她在内心感受不到神的同在长达五十年。但她每天仍然起床，仍然去服事，仍然去爱。信念不是感觉，是选择。加油！",
  "坚持一个月，收获一辈子的骄傲。加油！",
  "爱迪生发明灯泡失败了一千次。记者问他感觉如何，他说：\"我没有失败一千次，我只是发现了一千种行不通的方法。\" 你每一天的坚持，都是在缩小那个数字。加油！",
  "三十天前你做了一个决定，今天你证明了你说到做到。这不只是身体的胜利，更是意志的胜利。为你自己骄傲吧。加油！",
];

export const FINALE_INDEX = QUOTES.length - 1;

const ROLLOVER_TIMEZONE = "Europe/Amsterdam";
const ROLLOVER_HOUR = 7;

/** The calendar date and hour for `date`, as observed in `timeZone`. */
function getZonedDateParts(date: Date, timeZone: string): { calendarDate: Date; hour: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const hour = get("hour");
  return {
    calendarDate: new Date(get("year"), get("month") - 1, get("day")),
    hour: hour === 24 ? 0 : hour,
  };
}

/**
 * Picks today's quote index (0-29). Quotes roll over at 7:00 AM Netherlands
 * time (Europe/Amsterdam), regardless of the viewer's own timezone, so
 * before then the previous day's quote is still shown.
 */
export function getTodaysQuoteIndex(now: Date): number {
  const today = getZonedDateParts(now, ROLLOVER_TIMEZONE);
  const start = getZonedDateParts(CHALLENGE_START, ROLLOVER_TIMEZONE);

  let dayIndex = differenceInCalendarDays(today.calendarDate, start.calendarDate);
  if (today.hour < ROLLOVER_HOUR) {
    dayIndex -= 1;
  }
  return Math.min(QUOTES.length - 1, Math.max(0, dayIndex));
}

/** Splits Chinese text into word-level segments for stagger animation. */
export function splitIntoWords(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return text.split(/(\s+)/).filter(Boolean);
}
