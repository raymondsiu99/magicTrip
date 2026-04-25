export interface BilingualString {
  en: string;
  zh: string;
}

export interface POI {
  id: number;
  name: BilingualString;
  city: BilingualString;
  lat: number;
  lng: number;
  desc: BilingualString;
  youtubeSearchQuery: string;
}

export interface DayItinerary {
  date: string;
  title: BilingualString;
  city: BilingualString;
  hotel?: BilingualString;
  pois: number[];
  customItems: (string | BilingualString)[];
}

export const pois: POI[] = [
  // Tokyo
  { id: 1, name: { en: "Ueno Park", zh: "上野公園" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.7138, lng: 139.7772, desc: { en: "Early autumn foliage stroll", zh: "早秋賞楓漫步" }, youtubeSearchQuery: "Ueno Park Tokyo autumn foliage" },
  { id: 2, name: { en: "Meiji Shrine", zh: "明治神宮" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.6762, lng: 139.6993, desc: { en: "Shinto shrine in forest", zh: "森林中的神道教神社" }, youtubeSearchQuery: "Meiji Shrine Tokyo" },
  { id: 3, name: { en: "Senso-ji Temple", zh: "淺草寺" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.7147, lng: 139.7967, desc: { en: "Ancient temple Asakusa", zh: "歷史悠久的淺草寺" }, youtubeSearchQuery: "Senso-ji Temple Tokyo" },
  { id: 4, name: { en: "Shinjuku Gyoen", zh: "新宿御苑" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.6851, lng: 139.7100, desc: { en: "Beautiful national garden", zh: "美麗的國家花園" }, youtubeSearchQuery: "Shinjuku Gyoen autumn" },
  { id: 5, name: { en: "Hakone Ropeway", zh: "箱根空中纜車" }, city: { en: "Hakone", zh: "箱根" }, lat: 35.2415, lng: 139.0152, desc: { en: "Mt Fuji views & onsen", zh: "富士山景與溫泉" }, youtubeSearchQuery: "Hakone ropeway Mt Fuji" },
  { id: 6, name: { en: "Rikugien Garden", zh: "六義園" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.7331, lng: 139.7466, desc: { en: "Traditional Japanese garden", zh: "傳統日本庭園" }, youtubeSearchQuery: "Rikugien Garden Tokyo" },
  { id: 7, name: { en: "Tokyo Skytree", zh: "東京晴空塔" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.7100, lng: 139.8107, desc: { en: "Tallest tower in Japan", zh: "日本最高塔" }, youtubeSearchQuery: "Tokyo Skytree views" },
  { id: 8, name: { en: "Omotesando", zh: "表參道" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.6661, lng: 139.7104, desc: { en: "Shopping and ginkgo trees", zh: "購物與銀杏大道" }, youtubeSearchQuery: "Omotesando Tokyo" },
  { id: 9, name: { en: "Yoyogi Park", zh: "代代木公園" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.6717, lng: 139.6949, desc: { en: "Large city park", zh: "大型城市公園" }, youtubeSearchQuery: "Yoyogi Park Tokyo" },
  { id: 10, name: { en: "Imperial Palace East Gardens", zh: "皇居東御苑" }, city: { en: "Tokyo", zh: "東京" }, lat: 35.6865, lng: 139.7538, desc: { en: "Historic palace gardens", zh: "歷史悠久的皇居庭園" }, youtubeSearchQuery: "Imperial Palace East Gardens" },
  
  // Kyoto & Kansai
  { id: 11, name: { en: "Fushimi Inari Shrine", zh: "伏見稻荷大社" }, city: { en: "Kyoto", zh: "京都" }, lat: 34.9671, lng: 135.7726, desc: { en: "Thousands of torii gates", zh: "千本鳥居" }, youtubeSearchQuery: "Fushimi Inari Kyoto" },
  { id: 12, name: { en: "Arashiyama Bamboo Grove", zh: "嵐山竹林" }, city: { en: "Kyoto", zh: "京都" }, lat: 35.0097, lng: 135.6776, desc: { en: "Peak autumn bamboo & monkey park", zh: "秋季竹林與猴子公園" }, youtubeSearchQuery: "Arashiyama Bamboo Grove autumn" },
  { id: 13, name: { en: "Kinkaku-ji", zh: "金閣寺" }, city: { en: "Kyoto", zh: "京都" }, lat: 35.0397, lng: 135.7292, desc: { en: "Golden temple reflection", zh: "金閣寺倒影" }, youtubeSearchQuery: "Kinkaku-ji Kyoto" },
  { id: 14, name: { en: "Nara Deer Park", zh: "奈良鹿公園" }, city: { en: "Nara", zh: "奈良" }, lat: 34.6850, lng: 135.8430, desc: { en: "Friendly deer and big Buddha", zh: "友善的鹿與大佛" }, youtubeSearchQuery: "Nara Deer Park Japan" },
  { id: 15, name: { en: "Kiyomizu-dera", zh: "清水寺" }, city: { en: "Kyoto", zh: "京都" }, lat: 34.9948, lng: 135.7850, desc: { en: "Wooden stage with city views", zh: "俯瞰市區的木造舞台" }, youtubeSearchQuery: "Kiyomizu-dera autumn" },
  { id: 16, name: { en: "Dotonbori", zh: "道頓堀" }, city: { en: "Osaka", zh: "大阪" }, lat: 34.6687, lng: 135.5013, desc: { en: "Osaka food crawl and neon lights", zh: "大阪美食與霓虹燈" }, youtubeSearchQuery: "Dotonbori Osaka street food" },
  { id: 17, name: { en: "Nijo Castle", zh: "二条城" }, city: { en: "Kyoto", zh: "京都" }, lat: 35.0142, lng: 135.7482, desc: { en: "Historic castle with nightingale floors", zh: "擁有鸝鳴地板的歷史城堡" }, youtubeSearchQuery: "Nijo Castle Kyoto" },
  { id: 18, name: { en: "Nishiki Market", zh: "錦市場" }, city: { en: "Kyoto", zh: "京都" }, lat: 35.0048, lng: 135.7645, desc: { en: "Kyoto's kitchen", zh: "京都的廚房" }, youtubeSearchQuery: "Nishiki Market Kyoto" },
  { id: 19, name: { en: "Tenryu-ji Temple", zh: "天龍寺" }, city: { en: "Kyoto", zh: "京都" }, lat: 35.0156, lng: 135.6738, desc: { en: "Zen temple with a beautiful garden", zh: "擁有美麗庭園的禪寺" }, youtubeSearchQuery: "Tenryu-ji Temple" },

  // Fukuoka
  { id: 20, name: { en: "Canal City Hakata", zh: "博多運河城" }, city: { en: "Fukuoka", zh: "福岡" }, lat: 33.5897, lng: 130.4107, desc: { en: "Large shopping and entertainment complex", zh: "大型購物娛樂中心" }, youtubeSearchQuery: "Canal City Hakata Fukuoka" },
  { id: 21, name: { en: "Dazaifu Tenmangu", zh: "太宰府天滿宮" }, city: { en: "Fukuoka", zh: "福岡" }, lat: 33.5215, lng: 130.5348, desc: { en: "Important Shinto shrine", zh: "重要神道教神社" }, youtubeSearchQuery: "Dazaifu Tenmangu Fukuoka" },
  { id: 22, name: { en: "Ohori Park", zh: "大濠公園" }, city: { en: "Fukuoka", zh: "福岡" }, lat: 33.5855, lng: 130.3768, desc: { en: "Large city park with a pond", zh: "大型湖畔公園" }, youtubeSearchQuery: "Ohori Park Fukuoka" },
  { id: 23, name: { en: "Beppu Hells", zh: "別府地獄溫泉" }, city: { en: "Beppu", zh: "別府" }, lat: 33.3155, lng: 131.4728, desc: { en: "Hot spring hells tour", zh: "地獄溫泉巡禮" }, youtubeSearchQuery: "Beppu Hells hot springs" },
  { id: 24, name: { en: "Fukuoka Castle Ruins", zh: "福岡城跡" }, city: { en: "Fukuoka", zh: "福岡" }, lat: 33.5847, lng: 130.3831, desc: { en: "Historic castle ruins in Maizuru Park", zh: "舞鶴公園內的歷史城跡" }, youtubeSearchQuery: "Fukuoka Castle Ruins" },

  // Busan
  { id: 25, name: { en: "Gwangalli Beach", zh: "廣安里海水浴場" }, city: { en: "Busan", zh: "釜山" }, lat: 35.1563, lng: 129.1188, desc: { en: "Sunset beach & bridge views", zh: "夕陽海灘與跨海大橋美景" }, youtubeSearchQuery: "Gwangalli Beach Busan sunset" },
  { id: 26, name: { en: "Haedong Yonggungsa", zh: "海東龍宮寺" }, city: { en: "Busan", zh: "釜山" }, lat: 35.0963, lng: 129.1098, desc: { en: "Seaside cliff temple", zh: "海濱懸崖寺廟" }, youtubeSearchQuery: "Haedong Yonggungsa Temple Busan" },
  { id: 27, name: { en: "Gamcheon Culture Village", zh: "甘川洞文化村" }, city: { en: "Busan", zh: "釜山" }, lat: 35.0974, lng: 129.0106, desc: { en: "Colorful hillside houses", zh: "色彩繽紛的山坡聚落" }, youtubeSearchQuery: "Gamcheon Culture Village Busan" },
  { id: 28, name: { en: "Jagalchi Fish Market", zh: "札嘎其市場" }, city: { en: "Busan", zh: "釜山" }, lat: 35.0967, lng: 129.0305, desc: { en: "Largest seafood market in Korea", zh: "韓國最大海鮮市場" }, youtubeSearchQuery: "Jagalchi Fish Market Busan" },
  { id: 29, name: { en: "Gyeongju", zh: "慶州" }, city: { en: "Gyeongju", zh: "慶州" }, lat: 35.8562, lng: 129.2247, desc: { en: "Museum without walls", zh: "沒有屋頂的博物館" }, youtubeSearchQuery: "Gyeongju day trip" },
];

export const defaultItinerary: DayItinerary[] = [
  { date: "2026-10-30", title: { en: "Arrival & Settling In", zh: "抵達與安頓" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [1], customItems: [{ en: "Settle into hotel", zh: "入住飯店" }, { en: "Hotel onsen", zh: "飯店溫泉" }] },
  { date: "2026-10-31", title: { en: "Shrines & Temples", zh: "神社與寺廟" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [2, 9, 3], customItems: [{ en: "Nakamise snacks", zh: "仲見世商店街小吃" }] },
  { date: "2026-11-01", title: { en: "Gardens & Cafes", zh: "花園與咖啡廳" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [4], customItems: [{ en: "Harajuku café hopping", zh: "原宿咖啡廳巡禮" }] },
  { date: "2026-11-02", title: { en: "Hakone Day Trip", zh: "箱根一日遊" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [5], customItems: [{ en: "Onsen foot bath", zh: "溫泉足湯" }] },
  { date: "2026-11-03", title: { en: "Imperial Gardens", zh: "皇居花園" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [6, 10], customItems: [] },
  { date: "2026-11-04", title: { en: "Skytree & Relax", zh: "晴空塔與放鬆" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [7], customItems: [{ en: "Onsen focus", zh: "享受溫泉" }] },
  { date: "2026-11-05", title: { en: "Omotesando Stroll", zh: "表參道漫步" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [8], customItems: [{ en: "Meiji Jingu Gaien ginkgo avenue", zh: "明治神宮外苑銀杏大道" }] },
  { date: "2026-11-06", title: { en: "Free Day", zh: "自由活動" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [], customItems: [{ en: "Revisit favourite park or onsen day", zh: "重返喜愛的公園或溫泉日" }] },
  { date: "2026-11-07", title: { en: "Prep for Kyoto", zh: "準備前往京都" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [], customItems: [{ en: "Light morning", zh: "輕鬆的早晨" }, { en: "Prep for Shinkansen to Kyoto", zh: "準備搭乘新幹線前往京都" }] },
  
  { date: "2026-11-08", title: { en: "Travel to Kyoto", zh: "前往京都" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [11], customItems: [{ en: "Shinkansen Tokyo → Kyoto morning", zh: "早晨搭乘新幹線 東京→京都" }, { en: "Gion evening stroll", zh: "祇園夜間漫步" }] },
  { date: "2026-11-09", title: { en: "Bamboo Grove", zh: "竹林小徑" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [12, 19], customItems: [] },
  { date: "2026-11-10", title: { en: "Golden Pavilion", zh: "金閣寺" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [13], customItems: [{ en: "Ryoan-ji rock garden", zh: "龍安寺石庭" }, { en: "Philosopher’s Path", zh: "哲學之道" }] },
  { date: "2026-11-11", title: { en: "Nara Day Trip", zh: "奈良一日遊" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [14], customItems: [{ en: "Todai-ji Temple", zh: "東大寺" }] },
  { date: "2026-11-12", title: { en: "Old Streets", zh: "古老街道" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [15], customItems: [{ en: "Sannenzaka/Ninenzaka old streets", zh: "產寧坂/二年坂老街" }] },
  { date: "2026-11-13", title: { en: "Rest Day", zh: "休息日" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Ryokan", zh: "日式旅館" }, pois: [], customItems: [{ en: "Special ryokan night", zh: "特別的日式旅館之夜" }, { en: "Private onsen + kaiseki dinner", zh: "私人溫泉與懷石料理" }] },
  { date: "2026-11-14", title: { en: "Osaka Day Trip", zh: "大阪一日遊" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [16], customItems: [{ en: "Dotonbori food crawl", zh: "道頓堀美食巡禮" }] },
  { date: "2026-11-15", title: { en: "Free Day", zh: "自由活動" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [], customItems: [{ en: "Sunrise temple or full onsen day", zh: "清晨寺廟或全日溫泉" }] },
  { date: "2026-11-16", title: { en: "Market & Castle", zh: "市場與城堡" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [17, 18], customItems: [] },
  { date: "2026-11-17", title: { en: "Buffer Day", zh: "緩衝日" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [], customItems: [{ en: "Any missed POI or total relaxation", zh: "補齊錯過的景點或徹底放鬆" }] },
  { date: "2026-11-18", title: { en: "Prep for Fukuoka", zh: "準備前往福岡" }, city: { en: "Kyoto", zh: "京都" }, hotel: { en: "Hotel Granvia Kyoto", zh: "京都格蘭比亞大酒店" }, pois: [], customItems: [{ en: "Morning free", zh: "早晨自由活動" }, { en: "Prep for flight to Fukuoka", zh: "準備搭機前往福岡" }] },

  { date: "2026-11-19", title: { en: "Travel to Fukuoka", zh: "前往福岡" }, city: { en: "Fukuoka", zh: "福岡" }, hotel: { en: "Miyako Hotel Hakata", zh: "博多都酒店" }, pois: [20], customItems: [{ en: "Flight Kansai → Fukuoka", zh: "航班 關西→福岡" }, { en: "Evening yatai ramen stalls", zh: "夜晚屋台拉麵" }] },
  { date: "2026-11-20", title: { en: "Shrine Visit", zh: "神社參拜" }, city: { en: "Fukuoka", zh: "福岡" }, hotel: { en: "Miyako Hotel Hakata", zh: "博多都酒店" }, pois: [21], customItems: [] },
  { date: "2026-11-21", title: { en: "Park & Castle", zh: "公園與城堡" }, city: { en: "Fukuoka", zh: "福岡" }, hotel: { en: "Miyako Hotel Hakata", zh: "博多都酒店" }, pois: [22, 24], customItems: [] },
  { date: "2026-11-22", title: { en: "Beppu Day Trip", zh: "別府一日遊" }, city: { en: "Fukuoka", zh: "福岡" }, hotel: { en: "Miyako Hotel Hakata", zh: "博多都酒店" }, pois: [23], customItems: [{ en: "Beppu onsen day trip ('hells' + foot bath)", zh: "別府溫泉一日遊 (地獄溫泉+足湯)" }] },
  { date: "2026-11-23", title: { en: "Free Day", zh: "自由活動" }, city: { en: "Fukuoka", zh: "福岡" }, hotel: { en: "Miyako Hotel Hakata", zh: "博多都酒店" }, pois: [], customItems: [{ en: "Repeat yatai or canal area", zh: "再訪屋台或運河區" }] },
  { date: "2026-11-24", title: { en: "Buffer Day", zh: "緩衝日" }, city: { en: "Fukuoka", zh: "福岡" }, hotel: { en: "Miyako Hotel Hakata", zh: "博多都酒店" }, pois: [], customItems: [{ en: "Pack & port prep for ferry", zh: "打包與準備搭乘渡輪" }] },
  { date: "2026-11-25", title: { en: "Ferry to Busan", zh: "搭乘渡輪前往釜山" }, city: { en: "Fukuoka", zh: "福岡" }, hotel: { en: "Overnight Ferry", zh: "夜間渡輪" }, pois: [], customItems: [{ en: "Camellia Line Hakata Port (Fukuoka) → Busan (depart ~20:00)", zh: "Camellia Line 博多港(福岡) → 釜山 (約20:00出發)" }] },

  { date: "2026-11-26", title: { en: "Arrive in Busan", zh: "抵達釜山" }, city: { en: "Busan", zh: "釜山" }, hotel: { en: "Kent Hotel Gwangalli", zh: "廣安里肯特飯店" }, pois: [25], customItems: [{ en: "Arrive Busan ~08:00", zh: "約08:00抵達釜山" }, { en: "Evening seafood", zh: "享用海鮮晚餐" }] },
  { date: "2026-11-27", title: { en: "Seaside Temple", zh: "海濱寺廟" }, city: { en: "Busan", zh: "釜山" }, hotel: { en: "Kent Hotel Gwangalli", zh: "廣安里肯特飯店" }, pois: [26], customItems: [] },
  { date: "2026-11-28", title: { en: "Culture & Market", zh: "文化村與市場" }, city: { en: "Busan", zh: "釜山" }, hotel: { en: "Kent Hotel Gwangalli", zh: "廣安里肯特飯店" }, pois: [27, 28], customItems: [] },
  { date: "2026-11-29", title: { en: "Free Day", zh: "自由活動" }, city: { en: "Busan", zh: "釜山" }, hotel: { en: "Kent Hotel Gwangalli", zh: "廣安里肯特飯店" }, pois: [29], customItems: [{ en: "Optional Gyeongju day trip or full beach/onsen rest day", zh: "自選慶州一日遊或海灘/溫泉放鬆日" }] },
  { date: "2026-11-30", title: { en: "Return to Tokyo", zh: "返回東京" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "Mitsui Garden Hotel Ueno", zh: "上野三井花園飯店" }, pois: [], customItems: [{ en: "Morning beach walk", zh: "早晨海灘散步" }, { en: "Afternoon flight Busan → Tokyo", zh: "下午航班 釜山→東京" }, { en: "Relaxed evening", zh: "輕鬆的夜晚" }] },
  { date: "2026-12-01", title: { en: "Departure", zh: "賦歸" }, city: { en: "Tokyo", zh: "東京" }, hotel: { en: "None", zh: "無" }, pois: [], customItems: [{ en: "Free morning/afternoon", zh: "早晨/下午自由活動" }, { en: "Airport transfer 4–5 hrs before flight", zh: "航班起飛前4-5小時前往機場" }] },
];

export const initialBudget = 8000;
