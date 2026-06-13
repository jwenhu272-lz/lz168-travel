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
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand1-1.jpeg",
    description: "柳州螺蛳粉龙头企业，拥有现代化工厂和博物馆。畅销全球30多个国家，日产超百万包。",
    descriptionEn: "Leading Liuzhou Luosifen enterprise with modern factory and museum. Sold in 30+ countries.",
    price: 68,
    priceUnit: "25包装",
    rating: 4.9,
    reviews: 12890,
    tags: ["龙头企业", "出口全球", "博物馆"],
    origin: "柳州鱼峰区",
    capacity: "100万包/天",
  },
  {
    id: "humanhappy",
    name: "人类快乐",
    nameEn: "Humanhappy",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand2-1jpeg",
    description: "2022年新锐品牌，首创预包装煎蛋螺蛳粉。月销300万+，谭健次代言。",
    descriptionEn: "2022 innovative brand, first to create prepackaged fried egg luosifen. 3M+ monthly sales.",
    price: 13.9,
    priceUnit: "单包",
    rating: 4.8,
    reviews: 34560,
    tags: ["新锐品牌", "煎蛋螺蛳粉", "明星代言"],
    origin: "柳州柳南区",
    capacity: "50万包/天",
  },
  {
    id: "liufang",
    name: "柳芳",
    nameEn: "Liufang",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand3-1.jpeg",
    description: "柳州老牌螺蛳粉企业，传统工艺，地道风味。深受本地人喜爱。",
    descriptionEn: "Traditional Liuzhou Luosifen enterprise, authentic flavor loved by locals.",
    price: 55,
    priceUnit: "20包装",
    rating: 4.7,
    reviews: 8920,
    tags: ["老牌企业", "传统工艺", "本地口碑"],
    origin: "柳州柳北区",
    capacity: "30万包/天",
  },
  {
    id: "chenglong",
    name: "陈龙",
    nameEn: "Chenglong",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand4-1.jpeg",
    description: "福布斯500强合作伙伴，高端礼盒装螺蛳粉，适合送礼。",
    descriptionEn: "Fortune 500 partner, premium gift box luosifen perfect for gifting.",
    price: 65.28,
    priceUnit: "6包装(礼盒)",
    rating: 4.6,
    reviews: 3450,
    tags: ["高端礼盒", "送礼首选"],
    origin: "柳州城中区",
    capacity: "15万盒/天",
  },
  {
    id: "liziqi",
    name: "李子柒",
    nameEn: "Liziqi",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand5-1.jpeg",
    description: "现象级网红品牌，东方美学包装，品质稳定。",
    descriptionEn: "Phenomenal internet celebrity brand, oriental aesthetic packaging, stable quality.",
    price: 62.80,
    priceUnit: "20包装",
    rating: 4.8,
    reviews: 56780,
    tags: ["网红品牌", "东方美学"],
    origin: "柳州柳东新区",
    capacity: "40万包/天",
  },
  {
    id: "haifuxiang",
    name: "海福盛",
    nameEn: "Haifusheng",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand6-2.jpeg",
    description: "冲泡型螺蛳粉专家，方便快捷，适合办公室/旅行。",
    descriptionEn: "Brewed luosifen expert, convenient and fast, perfect for office/travel.",
    price: 39.9,
    priceUnit: "6桶装",
    rating: 4.4,
    reviews: 12340,
    tags: ["冲泡型", "便携"],
    origin: "柳州柳江区",
    capacity: "60万杯/天",
  },
  {
    id: "zhongliu",
    name: "中柳",
    nameEn: "Zhongliu",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand7-1.jpeg",
    description: "专注出口品质，拥有国际食品安全认证，远销欧美。",
    descriptionEn: "Export-quality focus, international food safety certified, sold in Europe/US.",
    price: 72,
    priceUnit: "30包装",
    rating: 4.7,
    reviews: 5670,
    tags: ["出口品质", "国际认证"],
    origin: "柳州阳和工业区",
    capacity: "80万包/天",
  },
  {
    id: "shiweixian",
    name: "食为先",
    nameEn: "Shiweixian",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand8-1.jpeg",
    description: "性价比之王，日产能超50万包，主打大众市场。",
    descriptionEn: "Best value, daily production capacity exceeds 500,000 packs.",
    price: 45,
    priceUnit: "20包装",
    rating: 4.3,
    reviews: 28900,
    tags: ["性价比高", "大众市场"],
    origin: "柳州鹿寨县",
    capacity: "50万包/天",
  },
  {
    id: "zhuangxiang",
    name: "壮乡",
    nameEn: "Zhuangxiang",
    image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand9-1.jpeg",
    description: "民族特色品牌，融入壮族文化元素，特色酸笋风味。",
    descriptionEn: "Ethnic brand with Zhuang cultural elements, distinctive flavor.",
    price: 62,
    priceUnit: "25包装",
    rating: 4.6,
    reviews: 7890,
    tags: ["民族特色", "文化元素"],
    origin: "柳州三江县",
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
];

function LuosifenPage() {
  const [language, setLanguage] = useState("中文");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [gridColumns, setGridColumns] = useState(2);
  const [showFilters, setShowFilters] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Load saved grid preference
  useEffect(() => {
    const savedGrid = localStorage.getItem("luosifen_grid_layout");
    if (savedGrid) {
      setGridColumns(parseInt(savedGrid));
    }
  }, []);

  // Restore scroll position when coming BACK from detail page (CORRECT)
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("luosifen_list_scroll_position");
    if (savedScrollPosition) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition),
          behavior: "instant"
        });
        sessionStorage.removeItem("luosifen_list_scroll_position");
      });
    }
  }, []);

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  
  const toggleGridLayout = () => {
    const newLayout = gridColumns === 2 ? 1 : 2;
    setGridColumns(newLayout);
    localStorage.setItem("luosifen_grid_layout", newLayout.toString());
  };

  const handleImageError = (brandId) => {
    setImageErrors(prev => ({ ...prev, [brandId]: true }));
  };

  // Save scroll position BEFORE leaving to detail page (CORRECT)
  const handleBrandClick = () => {
    sessionStorage.setItem("luosifen_list_scroll_position", window.scrollY.toString());
  };

  let filteredBrands = luosifenBrands.filter(brand => {
    const matchesSearch = searchQuery === "" || brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = true;
    if (activeFilter === "premium") matchesFilter = brand.id === "chenglong" || brand.id === "liziqi";
    else if (activeFilter === "budget") matchesFilter = brand.id === "shiweixian" || brand.id === "haifuxiang";
    else if (activeFilter === "export") matchesFilter = brand.id === "zhongliu" || brand.id === "luobawang";
    else if (activeFilter === "convenient") matchesFilter = brand.id === "haifuxiang";
    return matchesSearch && matchesFilter;
  });

  if (sortBy === "rating") filteredBrands.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "price") filteredBrands.sort((a, b) => a.price - b.price);
  else if (sortBy === "reviews") filteredBrands.sort((a, b) => b.reviews - a.reviews);

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
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 mb-6 text-white">
          <h1 className="text-3xl font-bold">🍜 {t("柳州螺蛳粉品牌集合", "Liuzhou Luosifen Brands")}</h1>
          <p className="text-orange-100 mt-2">{t("一站式了解柳州所有螺蛳粉品牌", "One-stop for all Liuzhou Luosifen brands")}</p>
          <div className="flex gap-3 mt-3">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🏭 {luosifenBrands.length}+ {t("品牌", "Brands")}</span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">📦 {t("源头直供", "Factory Direct")}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder={t("搜索品牌...", "Search brands...")} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className="px-4 py-2 rounded-full border bg-white text-sm hover:bg-gray-50 transition"
            >
              🔧 {t("筛选", "Filter")}
            </button>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="px-4 py-2 rounded-full border bg-white text-sm cursor-pointer"
            >
              <option value="default">{t("默认", "Default")}</option>
              <option value="rating">{t("评分最高", "Top Rated")}</option>
              <option value="price">{t("价格最低", "Price Low")}</option>
              <option value="reviews">{t("最受欢迎", "Popular")}</option>
            </select>
            <button 
              onClick={toggleGridLayout} 
              className="px-4 py-2 rounded-full border bg-white text-sm hover:bg-gray-50 transition"
            >
              {gridColumns === 2 ? (
                <>{t("一列", "1 Col")}</>
              ) : (
                <>{t("两列", "2 Cols")}</>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-2 shadow-sm">
            {filterCategories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveFilter(cat.id)} 
                className={`px-4 py-2 rounded-full text-sm transition ${
                  activeFilter === cat.id 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.icon} {t(cat.label, cat.labelEn)}
              </button>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          {t("找到", "Found")} {filteredBrands.length} {t("个品牌", "brands")}
        </div>

        {/* Brands Grid */}
        <div className={`grid gap-5 ${gridColumns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {filteredBrands.map((brand) => (
            <Link 
              key={brand.id} 
              href={`/luosifen/${brand.id}`}
              onClick={handleBrandClick}  // Saves scroll position before leaving
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="h-44 bg-gradient-to-r from-orange-100 to-red-100 overflow-hidden">
                  {!imageErrors[brand.id] ? (
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(brand.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-r from-orange-100 to-red-100">
                      🍜
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{brand.name}</h3>
                    <span className="text-orange-600 font-bold">¥{brand.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{brand.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {brand.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                    <span>⭐ {brand.rating}</span>
                    <span>📍 {brand.origin}</span>
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

export default LuosifenPage;