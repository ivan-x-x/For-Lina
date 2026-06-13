export interface DailyGreeting {
  /** Chinese name of the language, used in the subtitle. */
  language: string;
  /** The greeting + her name, in the target language. */
  greeting: string;
  /** Romanized pronunciation, used in the subtitle. */
  pronunciation: string;
}

/**
 * 30 daily greetings, indexed by `dayOfYear % 30`.
 */
export const LANGUAGES: DailyGreeting[] = [
  { language: "中文", greeting: "早上好，Lina", pronunciation: "Zǎo shàng hǎo" },
  { language: "法语", greeting: "Bonjour, Lina", pronunciation: "Bon-zhoor" },
  { language: "日语", greeting: "おはよう、リナ", pronunciation: "O-ha-yō" },
  { language: "阿拉伯语", greeting: "صباح الخير، لينا", pronunciation: "Sa-bāh al-khayr" },
  { language: "斯瓦希里语", greeting: "Habari za asubuhi, Lina", pronunciation: "Ha-ba-ri za a-su-bu-hi" },
  { language: "韩语", greeting: "좋은 아침이에요, 리나", pronunciation: "Jo-heun a-chim-ie-yo" },
  { language: "意大利语", greeting: "Buongiorno, Lina", pronunciation: "Bwon-jor-no" },
  { language: "葡萄牙语", greeting: "Bom dia, Lina", pronunciation: "Bom jee-ah" },
  { language: "印地语", greeting: "शुभ प्रभात, लिना", pronunciation: "Shubh pra-bhāt" },
  { language: "希腊语", greeting: "Καλημέρα, Λίνα", pronunciation: "Ka-li-ME-ra" },
  { language: "荷兰语", greeting: "Goedemorgen, Lina", pronunciation: "Khoo-duh-mor-khun" },
  { language: "他加禄语", greeting: "Magandang umaga, Lina", pronunciation: "Ma-gan-dang oo-ma-ga" },
  { language: "俄语", greeting: "Доброе утро, Лина", pronunciation: "Dob-ro-ye oo-tro" },
  { language: "土耳其语", greeting: "Günaydın, Lina", pronunciation: "Gü-nay-dın" },
  { language: "夏威夷语", greeting: "Aloha kakahiaka, Lina", pronunciation: "A-lo-ha ka-ka-hia-ka" },
  { language: "祖鲁语", greeting: "Sawubona, Lina", pronunciation: "Sa-woo-bo-na" },
  { language: "波斯语", greeting: "صبح بخیر، لینا", pronunciation: "Sobh be-kheyr" },
  { language: "泰语", greeting: "สวัสดีตอนเช้า ลีนา", pronunciation: "Sa-wàt-dee ton cháo" },
  { language: "阿姆哈拉语", greeting: "እንደምን አደርሽ, ሊና", pronunciation: "In-de-men a-dersh" },
  { language: "马来语", greeting: "Selamat pagi, Lina", pronunciation: "Se-la-mat pa-gi" },
  { language: "德语", greeting: "Guten Morgen, Lina", pronunciation: "Goo-ten mor-gen" },
  { language: "越南语", greeting: "Chào buổi sáng, Lina", pronunciation: "Chow boo-ee sang" },
  { language: "波兰语", greeting: "Dzień dobry, Lina", pronunciation: "Jen dob-ree" },
  { language: "乌克兰语", greeting: "Доброго ранку, Ліна", pronunciation: "Dob-ro-ho ran-ku" },
  { language: "乌尔都语", greeting: "صبح بخیر، لینا", pronunciation: "Sub-ha bak-her" },
  { language: "孟加拉语", greeting: "শুভ সকাল, লিনা", pronunciation: "Shub-ho so-kal" },
  { language: "冰岛语", greeting: "Góðan daginn, Lina", pronunciation: "Goh-than da-yin" },
  { language: "世界语", greeting: "Bonan matenon, Lina", pronunciation: "Bo-nan ma-te-non" },
  { language: "约鲁巴语", greeting: "Ẹ káàárọ̀, Lina", pronunciation: "Eh kah-ah-ro" },
  { language: "芬兰语", greeting: "Hyvää huomenta, Lina", pronunciation: "Hü-vää hoo-o-men-ta" },
];

/**
 * Splits a string into grapheme clusters so multi-byte / combining
 * characters (Arabic, Devanagari, Thai, etc.) animate as whole units.
 */
export function splitGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}
