"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// Complete Luosifen Brands Data - 10 Major Manufacturers
const luosifenBrands = [
  {
    id: "luobawang",
    name: "螺霸王",
    nameEn: "Luobawang",
    logo: "https://placehold.co/400x400/1a1a2e/white?text=LBW",
    image: "https://placehold.co/600x400/e94560/white?text=Luobawang+Hero",
    description: "柳州螺蛳粉龙头企业，拥有现代化工厂和博物馆。畅销全球30多个国家，日产超百万包。",
    descriptionEn: "Leading Liuzhou Luosifen enterprise with modern factory and museum. Sold in 30+ countries.",
    types: ["原味辣", "特辣", "小龙虾味", "干捞"],
    price: 68,
    priceUnit: "25包装",
    rating: 4.9,
    reviews: 12890,
    tags: ["龙头企业", "出口全球", "博物馆"],
    origin: "柳州鱼峰区",
    founded: 2012,
    capacity: "100万包/天",
  },
  {
    id: "humanhappy",
    name: "人类快乐",
    nameEn: "Humanhappy",
    logo: "https://placehold.co/400x400/0f3460/white?text=HH",
    image: "https://placehold.co/600x400/f5a623/white?text=Humanhappy+Hero",
    description: "2022年新锐品牌，首创预包装煎蛋螺蛳粉。月销300万+，谭健次代言。",
    descriptionEn: "2022 innovative brand, first to create prepackaged fried egg luosifen. 3M+ monthly sales.",
    types: ["煎蛋螺蛳粉", "原味", "加料版"],
    price: 13.9,
    priceUnit: "单包",
    rating: 4.8,
    reviews: 34560,
    tags: ["新锐品牌", "煎蛋螺蛳粉", "明星代言"],
    origin: "柳州柳南区",
    founded: 2022,
    capacity: "50万包/天",
  },
  {
    id: "liufang",
    name: "柳芳",
    nameEn: "Liufang",
    logo: "https://placehold.co/400x400/2c3e50/white?text=LF",
    image: "https://placehold.co/600x400/27ae60/white?text=Liufang+Hero",
    description: "柳州老牌螺蛳粉企业，传统工艺，地道风味。深受本地人喜爱。",
    descriptionEn: "Traditional Liuzhou Luosifen enterprise, authentic flavor loved by locals.",
    types: ["经典原味", "酸辣味", "加臭加辣"],
    price: 55,
    priceUnit: "20包装",
    rating: 4.7,
    reviews: 8920,
    tags: ["老牌企业", "传统工艺", "本地口碑"],
    origin: "柳州柳北区",
    founded: 2008,
    capacity: "30万包/天",
  },
  {
    id: "chenglong",
    name: "陈龙",
    nameEn: "Chenglong Brand",
    logo: "https://placehold.co/400x400/8e44ad/white?text=CL",
    image: "https://placehold.co/600x400/e67e22/white?text=Chenglong+Hero",
    description: "福布斯500强合作伙伴，高端礼盒装螺蛳粉，适合送礼。",
    descriptionEn: "Fortune 500 partner, premium gift box luosifen perfect for gifting.",
    types: ["礼品盒装", "家庭装", "商务装"],
    price: 65.28,
    priceUnit: "6包装(礼盒)",
    rating: 4.6,
    reviews: 3450,
    tags: ["高端礼盒", "福布斯500强", "送礼首选"],
    origin: "柳州城中区",
    founded: 2015,
    capacity: "15万盒/天",
  },
  {
    id: "liziqi",
    name: "李子柒",
    nameEn: "Liziqi",
    logo: "https://placehold.co/400x400/2d6a4f/white?text=LZQ",
    image: "https://placehold.co/600x400/6c4a32/white?text=Liziqi+Hero",
    description: "现象级网红品牌，东方美学包装，品质稳定。",
    descriptionEn: "Phenomenal internet celebrity brand, oriental aesthetic packaging, stable quality.",
    types: ["原味", "酸辣味", "加辣版"],
    price: 62.80,
    priceUnit: "20包装",
    rating: 4.8,
    reviews: 56780,
    tags: ["网红品牌", "东方美学", "品质稳定"],
    origin: "柳州柳东新区",
    founded: 2019,
    capacity: "40万包/天",
  },
  {
    id: "weinian",
    name: "微念",
    nameEn: "Weinian",
    logo: "https://placehold.co/400x400/1a5276/white?text=WN",
    image: "https://placehold.co/600x400/2874a6/white?text=Weinian+Hero",
    description: "行业标准制定者之一，参与制定QB/T2652-2025米粉标准。",
    descriptionEn: "Industry standard setter, participated in QB/T2652-2025 rice noodle standard.",
    types: ["标准装", "豪华装", "地方特色"],
    price: 58,
    priceUnit: "25包装",
    rating: 4.5,
    reviews: 2340,
    tags: ["标准制定者", "行业标杆", "品质保障"],
    origin: "柳州高新区",
    founded: 2017,
    capacity: "25万包/天",
  },
  {
    id: "haifuxiang",
    name: "海福盛",
    nameEn: "Haifusheng",
    logo: "https://placehold.co/400x400/2471a3/white?text=HFS",
    image: "https://placehold.co/600x400/3498db/white?text=Haifuxiang+Hero",
    description: "冲泡型螺蛳粉专家，方便快捷，适合办公室/旅行。",
    descriptionEn: "Brewed luosifen expert, convenient and fast, perfect for office/travel.",
    types: ["冲泡桶装", "杯装", "便携装"],
    price: 39.9,
    priceUnit: "6桶装",
    rating: 4.4,
    reviews: 12340,
    tags: ["冲泡型", "便携", "办公室首选"],
    origin: "柳州柳江区",
    founded: 2016,
    capacity: "60万杯/天",
  },
  {
    id: "zhongliu",
    name: "中柳",
    nameEn: "Zhongliu",
    logo: "https://placehold.co/400x400/138d75/white?text=ZL",
    image: "https://placehold.co/600x400/27ae60/white?text=Zhongliu+Hero",
    description: "专注出口品质，拥有国际食品安全认证，远销欧美。",
    descriptionEn: "Export-quality focus, international food safety certified, sold in Europe/US.",
    types: ["出口版", "国际版", "家庭装"],
    price: 72,
    priceUnit: "30包装",
    rating: 4.7,
    reviews: 5670,
    tags: ["出口品质", "国际认证", "海外热销"],
    origin: "柳州阳和工业区",
    founded: 2010,
    capacity: "80万包/天",
  },
  {
    id: "shiweixian",
    name: "食为先",
    nameEn: "Shiweixian",
    logo: "https://placehold.co/400x400/c0392b/white?text=SWX",
    image: "https://placehold.co/600x400/e74c3c/white?text=Shiweixian+Hero",
    description: "性价比之王，日产能超50万包，主打大众市场。",
    descriptionEn: "Best value, daily production capacity exceeds 500,000 packs.",
    types: ["经济装", "实惠装", "大份量"],
    price: 45,
    priceUnit: "20包装",
    rating: 4.3,
    reviews: 28900,
    tags: ["性价比高", "大众市场", "日销爆款"],
    origin: "柳州鹿寨县",
    founded: 2014,
    capacity: "50万包/天",
  },
  {
    id: "zhuangxiang",
    name: "壮乡",
    nameEn: "Zhuangxiang",
    logo: "https://placehold.co/400x400/7d3c98/white?text=ZX",
    image: "https://placehold.co/600x400/9b59b6/white?text=Zhuangxiang+Hero",
    description: "民族特色品牌，融入壮族文化元素，特色酸笋风味。",
    descriptionEn: "Ethnic brand with Zhuang cultural elements, distinctive flavor.",
    types: ["壮族风情", "传统酸笋", "特色装"],
    price: 62,
    priceUnit: "25包装",
    rating: 4.6,
    reviews: 7890,
    tags: ["民族特色", "文化元素", "酸笋风味"],
    origin: "柳州三江县",
    founded: 2018,
    capacity: "20万包/天",
  },
];

// Filter categories
const filterCategories = [
  { id: "all", label: "全部品牌", labelEn: "All Brands", icon: "🏭" },
  { id: "premium", label: "高端礼盒", labelEn: "Premium", icon: "🎁" },
  { id: "budget", label: "性价比", labelEn: "Budget", icon: "💰" },
  { id: "export", label: "出口品质", labelEn: "Export", icon: "🌏" },
  { id: "convenient", label: "便携冲泡", labelEn: "Convenient", icon: "🥤" },
  { id: "traditional", label: "传统老牌", labelEn: "Traditional", icon: "🏛️" },
];

function LuosifenPage() {
  const { user } = useAuth();
  const [language, setLanguage] = useState("中文");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [gridColumns, setGridColumns] = useState(2);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const savedGrid = localStorage.getItem("luosifen_grid_layout");
    if (savedGrid) setGridColumns(parseInt(savedGrid));
  }, []);

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  const toggleGridLayout = () => {
    const newLayout = gridColumns === 2 ? 1 : 2;
    setGridColumns(newLayout);
    localStorage.setItem("luosifen_grid_layout", newLayout.toString());
  };

  let filteredBrands = luosifenBrands.filter(brand => {
    const matchesSearch = searchQuery === "" ||
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === "中文" ? brand.description : brand.descriptionEn).toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter !== "all") {
      if (activeFilter === "premium") matchesFilter = brand.id === "chenglong" || brand.id === "liziqi";
      else if (activeFilter === "budget") matchesFilter = brand.id === "shiweixian" || brand.id === "haifuxiang";
      else if (activeFilter === "export") matchesFilter = brand.id === "zhongliu" || brand.id === "luobawang";
      else if (activeFilter === "convenient") matchesFilter = brand.id === "haifuxiang";
      else if (activeFilter === "traditional") matchesFilter = brand.id === "liufang" || brand.id === "zhuangxiang";
    }
    return matchesSearch && matchesFilter;
  });

  if (sortBy === "rating") filteredBrands.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "price") filteredBrands.sort((a, b) => a.price - b.price);
  else if (sortBy === "name") filteredBrands.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "reviews") filteredBrands.sort((a, b) => b.reviews - a.reviews);

  const t = (zh, en) => language === "中文" ? zh : en;

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={() => {}} onRegister={() => {}} language={language} />

      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 md:gap-4 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐 <span className="text-xs ml-1 hidden md:inline">{language}</span></button>
              <Link href="/profile" className="text-xl hover:text-blue-600">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                🍜 {t("柳州螺蛳粉品牌集合", "Liuzhou Luosifen Brands")}
              </h1>
              <p className="text-orange-100 mt-2">
                {t("一站式了解柳州所有螺蛳粉品牌 · 源头工厂直销", "One-stop for all Liuzhou Luosifen brands · Direct from factories")}
              </p>
              <div className="flex gap-3 mt-3 text-sm">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🏭 {luosifenBrands.length}+ {t("品牌", "Brands")}</span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">📦 {t("源头直供", "Factory Direct")}</span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🌏 {t("全球配送", "Global Shipping")}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/luosifen/bulk">
                <button className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                  📦 {t("批量采购", "Bulk Order")}
                </button>
              </Link>
              <Link href="/luosifen/wholesale">
                <button className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                  🤝 {t("成为批发商", "Become Wholesaler")}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <div className="bg-white rounded-full shadow-sm p-1 flex items-center">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("搜索品牌...", "Search brands...")} 
                className="flex-1 px-4 py-2 rounded-full outline-none text-sm"
              />
              <button className="bg-gray-100 p-2 rounded-full px-4 text-sm">🔍</button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded-full border border-gray-300 bg-white">
              🔧 {t("筛选", "Filters")}
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-full border border-gray-300 bg-white text-sm">
              <option value="default">{t("默认排序", "Default")}</option>
              <option value="rating">{t("评分最高", "Highest Rated")}</option>
              <option value="price">{t("价格最低", "Lowest Price")}</option>
              <option value="reviews">{t("最受欢迎", "Most Popular")}</option>
              <option value="name">{t("名称排序", "By Name")}</option>
            </select>
            <button onClick={toggleGridLayout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition px-3 py-2 rounded-full border border-gray-300 bg-white">
              {gridColumns === 2 ? <><span>📋</span> {t("一列", "1 Col")}</> : <><span>⊞</span> {t("两列", "2 Cols")}</>}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <h3 className="font-medium mb-3">{t("按类型筛选", "Filter by Type")}</h3>
            <div className="flex flex-wrap gap-2">
              {filterCategories.map(cat => (
                <button key={cat.id} onClick={() => setActiveFilter(cat.id)} className={`px-4 py-2 rounded-full text-sm transition ${
                  activeFilter === cat.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                  {cat.icon} {t(cat.label, cat.labelEn)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">{t("找到", "Found")} {filteredBrands.length} {t("个品牌", "brands")}</div>

        {/* Brands Grid */}
        {filteredBrands.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-400 text-lg">{t("暂无相关品牌", "No brands found")}</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${gridColumns === 2 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"}`}>
            {filteredBrands.map((brand) => (
              <Link href={`/luosifen/${brand.id}`} key={brand.id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-40 bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
                    <div className="text-6xl">🍜</div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">⭐ {brand.rating}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{brand.name}</h3>
                      <span className="text-orange-600 font-bold">¥{brand.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-2">{language === "中文" ? brand.description : brand.descriptionEn}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {brand.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>📍 {brand.origin}</span>
                      <span>🏭 {brand.capacity}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Sub-page Navigation Cards */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">{t("采购服务", "Purchase Services")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/luosifen/bulk" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:shadow-lg transition">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="text-lg font-bold">{t("批量采购", "Bulk Purchase")}</h3>
              <p className="text-blue-100 text-sm mt-1">{t("工厂直供 · 量大优惠", "Factory direct · Volume discounts")}</p>
            </Link>
            <Link href="/luosifen/wholesale" className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white hover:shadow-lg transition">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-lg font-bold">{t("批发合作", "Wholesale Partnership")}</h3>
              <p className="text-green-100 text-sm mt-1">{t("成为代理商 · 长期合作", "Become distributor · Long-term partnership")}</p>
            </Link>
            <Link href="/luosifen/export" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition">
              <div className="text-4xl mb-3">🌏</div>
              <h3 className="text-lg font-bold">{t("出口服务", "Export Service")}</h3>
              <p className="text-purple-100 text-sm mt-1">{t("全球配送 · 国际认证", "Global shipping · International certified")}</p>
            </Link>
          </div>
        </div>
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default LuosifenPage;