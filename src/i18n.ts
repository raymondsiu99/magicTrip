import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "app_title": "TripFlow",
      "dashboard": "Dashboard",
      "itinerary": "Itinerary",
      "map": "Map",
      "notes": "Notes",
      "next_adventure": "Next Adventure",
      "days": "Days",
      "its_time": "It's Time!",
      "trip_subtitle": "Japan & South Korea 2026",
      "budget_tracker": "Budget Tracker",
      "remaining": "Remaining",
      "spent": "Spent",
      "total": "Total",
      "add_expense": "Add Expense",
      "amount": "Amount (CND$)",
      "description": "Description",
      "quick_links": "Quick Links",
      "accommodations": "Accommodations",
      "hotels_booked": "4 Hotels Booked",
      "flights": "Flights",
      "flights_desc": "Kansai → Fukuoka, Busan → Tokyo",
      "ferry_tickets": "Ferry Tickets",
      "ferry_desc": "Camellia Line (Fukuoka → Busan)",
      "watch_video": "Watch Video",
      "google_maps": "Google Maps",
      "no_video_selected": "No video selected",
      "paste_url": "Paste YouTube URL here...",
      "load": "Load",
      "quick_search": "Quick YouTube Search",
      "add_new_activity": "Add new activity...",
      "no_mapped_locations": "No mapped locations for this day.",
      "packing_list": "Packing List",
      "journal": "Journal",
      "essentials": "Essentials & Gear",
      "empty_packing": "Your packing list is empty.",
      "add_item": "Add item (e.g. Passport, JR Pass)...",
      "add": "Add",
      "travel_journal": "Travel Journal",
      "journal_placeholder": "Write your thoughts, reminders, or daily diary here...",
      "export_pdf": "Export PDF",
      "backup_data": "Backup Data"
    }
  },
  zh: {
    translation: {
      "app_title": "TripFlow",
      "dashboard": "儀表板",
      "itinerary": "行程",
      "map": "地圖",
      "notes": "筆記",
      "next_adventure": "下一趟旅程",
      "days": "天",
      "its_time": "出發囉！",
      "trip_subtitle": "日本與韓國 2026",
      "budget_tracker": "預算追蹤",
      "remaining": "剩餘",
      "spent": "已花費",
      "total": "總計",
      "add_expense": "新增花費",
      "amount": "金額 (加幣)",
      "description": "描述",
      "quick_links": "快速連結",
      "accommodations": "住宿",
      "hotels_booked": "已預訂 4 間飯店",
      "flights": "航班",
      "flights_desc": "關西 → 福岡, 釜山 → 東京",
      "ferry_tickets": "渡輪船票",
      "ferry_desc": "Camellia Line (福岡 → 釜山)",
      "watch_video": "觀看影片",
      "google_maps": "Google地圖",
      "no_video_selected": "未選擇影片",
      "paste_url": "在此貼上 YouTube 網址...",
      "load": "載入",
      "quick_search": "快速 YouTube 搜尋",
      "add_new_activity": "新增活動...",
      "no_mapped_locations": "這天沒有標記的地點。",
      "packing_list": "行李清單",
      "journal": "日記",
      "essentials": "必需品與裝備",
      "empty_packing": "您的行李清單是空的。",
      "add_item": "新增物品 (如：護照, JR Pass)...",
      "add": "新增",
      "travel_journal": "旅遊日記",
      "journal_placeholder": "在此寫下您的想法、提醒或每日日記...",
      "export_pdf": "匯出 PDF",
      "backup_data": "備份資料"
    }
  }
};

const savedLanguage = localStorage.getItem('tripflow-lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
