"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// Secret Spots Data - 8 Hidden Gems in Liuzhou with HIGH-RES IMAGES
const secretSpots = [
  {
    id: "firewood-kitchen",
    name: "Grandpa's Firewood Kitchen",
    nameZh: "阿公柴火厨房",
    category: "food",
    categoryZh: "美食秘境",
    image: "https://i.postimg.cc/gJz9SkcV/0b85781d-8938-4d43-977b-a076ed5aa75d.jpg",
    description: "An off-road village kitchen run by an old couple. Firewood stacked high, chickens running free, and a friendly Labrador welcoming guests.",
    descriptionZh: "一个由老夫妻经营的村舍厨房。高高的柴火堆，自由奔跑的鸡鸭，还有一只友善的拉布拉多犬迎接客人。",
    difficulty: "Easy",
    timeRequired: "1-2 hours",
    price: "¥188",
    priceUnit: "per person (package)",
    rating: 4.9,
    reviews: 128,
    tags: ["Farmhouse", "Firewood Cooking", "Labrador"],
    tagsZh: ["农家菜", "柴火烹饪", "拉布拉多"],
    location: "Liujiang Riverside, Liuzhou",
    bestSeason: "Year-round",
  },
  {
    id: "secret-balcony",
    name: "The Secret Balcony",
    nameZh: "秘密阳台",
    category: "food",
    categoryZh: "美食秘境",
    image: "https://i.postimg.cc/tJJKbSxW/263672a9-42e4-462b-9a16-5a8941f2cc41.jpg",
    description: "An unmarked 11th-floor apartment where a family serves home-cooked meals overlooking the Liujiang River. Reservation only.",
    descriptionZh: "一个位于11楼的隐秘公寓，一家人在这里提供俯瞰柳江的家常菜。仅限预约。",
    difficulty: "Easy",
    timeRequired: "1-2 hours",
    price: "¥128",
    priceUnit: "per person (package)",
    rating: 4.8,
    reviews: 89,
    tags: ["Home Kitchen", "River View", "Reservation Only"],
    tagsZh: ["家常菜", "江景", "需预约"],
    location: "Liujiang Riverside, Liuzhou",
    bestSeason: "Year-round",
  },
  {
    id: "dim-sum-courtyard",
    name: "Hidden Dim Sum Courtyard",
    nameZh: "隐秘点心庭院",
    category: "food",
    categoryZh: "美食秘境",
    image: "https://i.postimg.cc/3R8MSJrC/1e6e3e74-93a4-4606-b277-1ae756f784d6.jpg",
    description: "A courtyard dim sum restaurant tucked inside Longtan Park. Always packed with locals. Handmade dim sum served fresh.",
    descriptionZh: "隐藏在龙潭公园内的庭院点心餐厅。总是坐满本地人。新鲜手工制作的点心。",
    difficulty: "Easy",
    timeRequired: "1-2 hours",
    price: "¥50-80",
    priceUnit: "per person",
    rating: 4.7,
    reviews: 234,
    tags: ["Dim Sum", "Courtyard", "Local Favorite"],
    tagsZh: ["点心", "庭院", "本地人最爱"],
    location: "Longtan Park, Liuzhou",
    bestSeason: "Year-round",
  },
  {
    id: "little-altay",
    name: "Liuzhou's Little Altay",
    nameZh: "柳州小阿勒泰",
    category: "nature",
    categoryZh: "自然秘境",
    image: "https://i.postimg.cc/gjjCpSZ3/1788282c-c596-4d0e-8497-02b4e9f5af61.jpg",
    description: "A valley grassland with grazing cattle, a solitary tree, and a wooden cabin. Feels like a Windows XP wallpaper come to life.",
    descriptionZh: "一个山谷草原，有放牧的牛群、一棵孤树和一间木屋。感觉像是Windows XP壁纸活了过来。",
    difficulty: "Moderate",
    timeRequired: "Half day",
    price: "Free",
    priceUnit: "",
    rating: 4.9,
    reviews: 56,
    tags: ["Grassland", "Nature", "Photography"],
    tagsZh: ["草原", "自然", "摄影"],
    location: "Luzhai County, Liuzhou",
    bestSeason: "Spring, Autumn",
  },
  {
    id: "stone-forest",
    name: "Xiangshui Stone Forest",
    nameZh: "响水石林",
    category: "nature",
    categoryZh: "自然秘境",
    image: "https://i.postimg.cc/QCC2D4Td/0714bbb3-8688-474b-83d3-4f48d80f4865.jpg",
    description: "A billion-year-old stone forest of black iron-ore rocks. Looks like an alien landscape. Free entry.",
    descriptionZh: "亿万年形成的黑色铁矿石林。看起来像外星景观。免费进入。",
    difficulty: "Easy",
    timeRequired: "2-3 hours",
    price: "Free",
    priceUnit: "",
    rating: 4.8,
    reviews: 78,
    tags: ["Stone Forest", "Geology", "Unique Landscape"],
    tagsZh: ["石林", "地质", "独特景观"],
    location: "Luzhai County, Liuzhou",
    bestSeason: "Year-round",
  },
  {
    id: "huilongshan-sunset",
    name: "Huilongshan Park Sunset",
    nameZh: "回龙山日落",
    category: "photo",
    categoryZh: "摄影秘境",
    image: "https://i.postimg.cc/Bbbr3YKq/511ab6c0-7a22-4f67-89c9-9abd75a9e4f8.jpg",
    description: "The best sunset view overlooking Yaobu Ancient Town and the Liujiang River. A quiet park away from crowds.",
    descriptionZh: "俯瞰窑埠古镇和柳江的最佳日落景观。远离人群的宁静公园。",
    difficulty: "Easy",
    timeRequired: "30min - 1 hour",
    price: "Free",
    priceUnit: "",
    rating: 4.9,
    reviews: 112,
    tags: ["Sunset", "City View", "Photography"],
    tagsZh: ["日落", "城市景观", "摄影"],
    location: "Near Yaobu Ancient Town, Liuzhou",
    bestSeason: "Year-round",
  },
  {
    id: "bailian-cave",
    name: "Bailian Cave Museum",
    nameZh: "白莲洞洞穴博物馆",
    category: "cultural",
    categoryZh: "文化秘境",
    image: "https://i.postimg.cc/yxxMKQZZ/154936f1-68c5-4f4a-af1d-ef49a36c87ac.jpg",
    description: "A science museum inside a real cave! Features life-sized dinosaur models amidst the karst mountains.",
    descriptionZh: "一个建在真正洞穴内的科学博物馆！在喀斯特山脉中设有真人大小的恐龙模型。",
    difficulty: "Easy",
    timeRequired: "2-3 hours",
    price: "¥30",
    priceUnit: "admission",
    rating: 4.6,
    reviews: 145,
    tags: ["Cave Museum", "Dinosaurs", "Science"],
    tagsZh: ["洞穴博物馆", "恐龙", "科普"],
    location: "Liuzhou City",
    bestSeason: "Year-round",
  },
  {
    id: "xiangqiao-geopark",
    name: "Xiangqiao Karst Geopark",
    nameZh: "香桥喀斯特地质公园",
    category: "nature",
    categoryZh: "自然秘境",
    image: "https://i.postimg.cc/sf0FmrkJ/e1186e09-dfd2-461d-8969-6792035b34a3.jpg",
    description: "A massive natural limestone bridge over emerald water. Contains the secret Jiulong Cave that opens only 4 times daily.",
    descriptionZh: "一座巨大的天然石灰岩桥横跨碧绿的水面。内有每天仅开放4次的九龙洞秘境。",
    difficulty: "Moderate",
    timeRequired: "Half day",
    price: "¥60",
    priceUnit: "admission",
    rating: 4.9,
    reviews: 98,
    tags: ["Karst", "Natural Bridge", "Secret Cave"],
    tagsZh: ["喀斯特", "天生桥", "秘洞"],
    location: "Luzhai County, Liuzhou",
    bestSeason: "Spring, Autumn",
  },
];

// Filter categories
const filterCategories = [
  { id: "all", label: "全部", labelEn: "All", icon: "🔍" },
  { id: "food", label: "美食秘境", labelEn: "Secret Food", icon: "🍜" },
  { id: "nature", label: "自然秘境", labelEn: "Nature", icon: "🏔️" },
  { id: "cultural", label: "文化秘境", labelEn: "Cultural", icon: "🏛️" },
  { id: "photo", label: "摄影秘境", labelEn: "Photo", icon: "📸" },
];

function SecretSpotsPage() {
  const [language, setLanguage] = useState("中文");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [gridColumns, setGridColumns] = useState(2);
  const [showFilters, setShowFilters] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const savedGrid = localStorage.getItem("secret_spots_grid_layout");
    if (savedGrid) setGridColumns(parseInt(savedGrid));
  }, []);

  // Restore scroll position when coming back from detail page
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("secret_spots_scroll_position");
    if (savedScrollPosition) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition),
          behavior: "instant"
        });
        sessionStorage.removeItem("secret_spots_scroll_position");
      });
    }
  }, []);

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  
  const toggleGridLayout = () => {
    const newLayout = gridColumns === 2 ? 1 : 2;
    setGridColumns(newLayout);
    localStorage.setItem("secret_spots_grid_layout", newLayout.toString());
  };

  const handleSpotClick = () => {
    sessionStorage.setItem("secret_spots_scroll_position", window.scrollY.toString());
  };

  const handleImageError = (spotId) => {
    setImageErrors(prev => ({ ...prev, [spotId]: true }));
  };

  let filteredSpots = secretSpots.filter(spot => {
    const matchesSearch = searchQuery === "" || 
      (language === "中文" ? spot.nameZh : spot.name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || spot.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (sortBy === "rating") filteredSpots.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "price") filteredSpots.sort((a, b) => {
    const priceA = parseFloat(a.price.replace('¥', '')) || 0;
    const priceB = parseFloat(b.price.replace('¥', '')) || 0;
    return priceA - priceB;
  });

  const t = (zh, en) => language === "中文" ? zh : en;

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐</button>
              <Link href="/cart" className="text-xl">🛒</Link>
              <Link href="/profile" className="text-xl">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-6 text-white">
          <h1 className="text-3xl font-bold">🔮 {t("柳州秘境", "Liuzhou Secret Spots")}</h1>
          <p className="text-emerald-100 mt-2">{t("探寻柳州隐藏的宝藏 · 本地人私藏推荐", "Discover Liuzhou's hidden treasures · Local secrets revealed")}</p>
          <div className="flex gap-3 mt-3">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🔍 {secretSpots.length}+ {t("秘境", "Secret Spots")}</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🍜 {t("美食秘境", "Secret Food")}</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">📸 {t("摄影秘境", "Photo Spots")}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder={t("搜索秘境...", "Search secret spots...")} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 rounded-full border bg-white text-sm hover:bg-gray-50">
              🔧 {t("筛选", "Filter")}
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-full border bg-white text-sm">
              <option value="default">{t("默认", "Default")}</option>
              <option value="rating">{t("评分最高", "Top Rated")}</option>
              <option value="price">{t("价格最低", "Price Low")}</option>
            </select>
            <button onClick={toggleGridLayout} className="px-4 py-2 rounded-full border bg-white text-sm">
              {gridColumns === 2 ? t("一列", "1 Col") : t("两列", "2 Cols")}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-2 shadow-sm">
            {filterCategories.map(cat => (
              <button key={cat.id} onClick={() => setActiveFilter(cat.id)} className={`px-4 py-2 rounded-full text-sm transition ${
                activeFilter === cat.id ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
                {cat.icon} {t(cat.label, cat.labelEn)}
              </button>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">{t("找到", "Found")} {filteredSpots.length} {t("个秘境", "secret spots")}</div>

        {/* Spots Grid */}
        <div className={`grid gap-5 ${gridColumns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {filteredSpots.map((spot) => (
            <Link key={spot.id} href={`/tour/secret/${spot.id}`} onClick={handleSpotClick}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {!imageErrors[spot.id] ? (
                    <img 
                      src={spot.image} 
                      alt={language === "中文" ? spot.nameZh : spot.name} 
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(spot.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-r from-emerald-100 to-teal-100">
                      🔮
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                    {t(spot.categoryZh, spot.category)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{language === "中文" ? spot.nameZh : spot.name}</h3>
                    <span className="text-emerald-600 font-bold">{spot.price !== "Free" ? spot.price : t("免费", "Free")}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{language === "中文" ? spot.descriptionZh : spot.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {spot.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{language === "中文" ? spot.tagsZh[idx] : tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                    <span>⭐ {spot.rating}</span>
                    <span>🕒 {t(spot.timeRequired, spot.timeRequired)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default SecretSpotsPage;