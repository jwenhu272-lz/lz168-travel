"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// Complete brand data
const brandData = {
  luobawang: {
    name: "螺霸王", nameEn: "Luobawang",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand1-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand1-2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand1-4.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand1-8.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/bowl10.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/bowl7.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/eldely-woman2.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/factory10.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/gallery1.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/kid1.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/warehouse1.jpeg"],
    description: "柳州螺蛳粉龙头企业，拥有现代化工厂和博物馆。畅销全球30多个国家。",
    descriptionEn: "Leading Liuzhou Luosifen enterprise with modern factory and museum.",
    history: "成立于2012年，总部位于柳州鱼峰区。2016年建成全自动化生产线，2020年建成螺蛳粉博物馆。",
    origin: "柳州鱼峰区", founded: 2012, employees: 500, capacity: "100万包/天", rating: 4.9, reviews: 12890,
    products: [
      { name: "经典原味", price: 68, unit: "25包装", spicy: "🌶️🌶️" },
      { name: "特辣版", price: 72, unit: "25包装", spicy: "🌶️🌶️🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "25包", price: 68, unitPrice: 2.72 },
      { quantity: "100包", price: 255, unitPrice: 2.55 },
    ],
    certifications: ["ISO认证", "HACCP认证", "出口食品备案"],
  },
  humanhappy: {
    name: "人类快乐", nameEn: "Humanhappy",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand2-1jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/bowl10.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/couple1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/factory12.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/pack2.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/warehouse5.jpeg",],
    description: "2022年新锐品牌，首创预包装煎蛋螺蛳粉。月销300万+。",
    descriptionEn: "2022 innovative brand, first prepackaged fried egg luosifen.",
    history: "成立于2022年，总部位于柳南区。首创预包装煎蛋螺蛳粉，突破行业技术壁垒。",
    origin: "柳州柳南区", founded: 2022, employees: 150, capacity: "50万包/天", rating: 4.8, reviews: 34560,
    products: [
      { name: "煎蛋螺蛳粉", price: 13.9, unit: "单包", spicy: "🌶️🌶️" },
      { name: "豪华版", price: 18.9, unit: "单包", spicy: "🌶️🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "1包", price: 13.9, unitPrice: 13.9 },
      { quantity: "6包", price: 79.9, unitPrice: 13.32 },
    ],
    certifications: ["ISO认证", "HACCP认证"],
  },
  liufang: {
    name: "柳芳", nameEn: "Liufang",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand3-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand3-2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/bowl11.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/factory2.jpeg",
   "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/kid2.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/pack3.jpeg",
  "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/warehouse5.jpeg"],
    description: "柳州老牌螺蛳粉企业，传统工艺，地道风味。",
    descriptionEn: "Traditional Liuzhou Luosifen enterprise, authentic flavor.",
    history: "成立于2008年，总部位于柳北区。传统工艺传承者。",
    origin: "柳州柳北区", founded: 2008, employees: 200, capacity: "30万包/天", rating: 4.7, reviews: 8920,
    products: [
      { name: "经典原味", price: 55, unit: "20包装", spicy: "🌶️🌶️" },
      { name: "酸辣味", price: 58, unit: "20包装", spicy: "🌶️🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "20包", price: 55, unitPrice: 2.75 },
      { quantity: "100包", price: 260, unitPrice: 2.60 },
    ],
    certifications: ["ISO认证", "广西著名商标"],
  },
  chenglong: {
    name: "陈龙", nameEn: "Chenglong",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand4-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand4-2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand4-3.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand4-4.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand4-5jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand4-7.jpeg"],
    description: "福布斯500强合作伙伴，高端礼盒装螺蛳粉。",
    descriptionEn: "Fortune 500 partner, premium gift box luosifen.",
    history: "成立于2015年，总部位于城中区。高端礼品市场领导者。",
    origin: "柳州城中区", founded: 2015, employees: 100, capacity: "15万盒/天", rating: 4.6, reviews: 3450,
    products: [
      { name: "礼品盒装", price: 65.28, unit: "6包装", spicy: "🌶️🌶️" },
      { name: "商务装", price: 128, unit: "12包装", spicy: "🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "6盒", price: 65.28, unitPrice: 10.88 },
      { quantity: "50盒", price: 612, unitPrice: 10.20 },
    ],
    certifications: ["ISO认证", "出口备案"],
  },
  liziqi: {
    name: "李子柒", nameEn: "Liziqi",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand5-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/bowl4.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/elderlywoman1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/factory5.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/kid3.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/pack7.jpeg"],
    description: "现象级网红品牌，东方美学包装，品质稳定。",
    descriptionEn: "Phenomenal internet celebrity brand, oriental aesthetic packaging.",
    history: "成立于2019年，总部位于柳东新区。东方美学设计。",
    origin: "柳州柳东新区", founded: 2019, employees: 80, capacity: "40万包/天", rating: 4.8, reviews: 56780,
    products: [
      { name: "原味", price: 62.80, unit: "20包装", spicy: "🌶️🌶️" },
      { name: "加辣版", price: 65.80, unit: "20包装", spicy: "🌶️🌶️🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "20包", price: 62.80, unitPrice: 3.14 },
      { quantity: "100包", price: 295, unitPrice: 2.95 },
    ],
    certifications: ["ISO认证"],
  },
  haifuxiang: {
    name: "海福盛", nameEn: "Haifusheng",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand6-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand6-2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand6-3.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/factory9.jpeg"],
    description: "冲泡型螺蛳粉专家，方便快捷。",
    descriptionEn: "Brewed luosifen expert, convenient and fast.",
    history: "成立于2016年，总部位于柳江区。冲泡型螺蛳粉开创者。",
    origin: "柳州柳江区", founded: 2016, employees: 120, capacity: "60万杯/天", rating: 4.4, reviews: 12340,
    products: [
      { name: "冲泡桶装", price: 39.9, unit: "6桶装", spicy: "🌶️🌶️" },
      { name: "杯装", price: 29.9, unit: "6杯装", spicy: "🌶️" },
    ],
    bulkOptions: [
      { quantity: "6桶", price: 39.9, unitPrice: 6.65 },
      { quantity: "50桶", price: 312, unitPrice: 6.24 },
    ],
    certifications: ["ISO认证"],
  },
  zhongliu: {
    name: "中柳", nameEn: "Zhongliu",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand7-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand7-2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand7-3.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand7-4.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand7-5.jpeg"],
    description: "专注出口品质，拥有国际食品安全认证。",
    descriptionEn: "Export-quality focus, international food safety certified.",
    history: "成立于2010年，总部位于阳和工业区。出口欧美市场。",
    origin: "柳州阳和工业区", founded: 2010, employees: 300, capacity: "80万包/天", rating: 4.7, reviews: 5670,
    products: [
      { name: "出口版", price: 72, unit: "30包装", spicy: "🌶️🌶️" },
      { name: "国际版", price: 75, unit: "30包装", spicy: "🌶️🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "30包", price: 72, unitPrice: 2.40 },
      { quantity: "500包", price: 1150, unitPrice: 2.30 },
    ],
    certifications: ["ISO", "HACCP", "FDA", "欧盟认证"],
  },
  shiweixian: {
    name: "食为先", nameEn: "Shiweixian",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand8-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand8-2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand8-4.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/bowl9.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/bowl6.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/pack4.jpeg",
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/pack6.jpeg"],
    description: "性价比之王，日产能超50万包。",
    descriptionEn: "Best value, daily production capacity exceeds 500,000 packs.",
    history: "成立于2014年，总部位于鹿寨县。大众市场领导者。",
    origin: "柳州鹿寨县", founded: 2014, employees: 250, capacity: "50万包/天", rating: 4.3, reviews: 28900,
    products: [
      { name: "经济装", price: 45, unit: "20包装", spicy: "🌶️🌶️" },
      { name: "实惠装", price: 65, unit: "30包装", spicy: "🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "20包", price: 45, unitPrice: 2.25 },
      { quantity: "100包", price: 210, unitPrice: 2.10 },
    ],
    certifications: ["ISO认证"],
  },
  zhuangxiang: {
    name: "壮乡", nameEn: "Zhuangxiang",
    images: ["https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand9-1.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/brand9-2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/kid3.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/kid5.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/family2.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/pack7.jpeg", 
    "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Luoshifen/pack9.jpeg"],
    description: "民族特色品牌，融入壮族文化元素。",
    descriptionEn: "Ethnic brand with Zhuang cultural elements.",
    history: "成立于2018年，总部位于三江县。壮族文化传承者。",
    origin: "柳州三江县", founded: 2018, employees: 60, capacity: "20万包/天", rating: 4.6, reviews: 7890,
    products: [
      { name: "壮族风情", price: 62, unit: "25包装", spicy: "🌶️🌶️" },
      { name: "传统酸笋", price: 65, unit: "25包装", spicy: "🌶️🌶️🌶️" },
    ],
    bulkOptions: [
      { quantity: "25包", price: 62, unitPrice: 2.48 },
      { quantity: "100包", price: 240, unitPrice: 2.40 },
    ],
    certifications: ["ISO认证"],
  },
};

function BrandDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const brandId = params.id;
  const [language, setLanguage] = useState("中文");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBulk, setSelectedBulk] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const brand = brandData[brandId];

  // FIRST useEffect: Set default selected product and bulk option
  useEffect(() => {
    if (brand?.products?.length && !selectedProduct) setSelectedProduct(brand.products[0]);
    if (brand?.bulkOptions?.length && !selectedBulk) setSelectedBulk(brand.bulkOptions[0]);
  }, [brand]);

  // SECOND useEffect: Restore scroll position when coming back from detail page
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("luosifen_scroll_position");
    if (savedScrollPosition) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition),
          behavior: "instant"
        });
        sessionStorage.removeItem("luosifen_scroll_position");
      });
    }
  }, []);

  if (!brand) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Brand not found</h1>
          <Link href="/luosifen" className="text-orange-600 mt-4 inline-block">← Back</Link>
        </div>
      </main>
    );
  }

  const showNotification = (msg) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % brand.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + brand.images.length) % brand.images.length);

  const t = (zh, en) => language === "中文" ? zh : en;

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {showToast && <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm">Added to cart</div>}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={() => {}} onRegister={() => {}} language={language} />

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
        <Link 
          href="/luosifen" 
          className="text-orange-600 mb-4 inline-block"
          onClick={() => {
            // Save current scroll position before navigating back
            const currentScroll = window.scrollY;
            sessionStorage.setItem("luosifen_scroll_position", currentScroll.toString());
          }}
        >
          ← {t("返回", "Back")}
        </Link>

        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative h-96 bg-gray-100">
            <img src={brand.images[currentImageIndex]} alt={brand.name} className="w-full h-full object-cover" />
            {brand.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full">◀</button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full">▶</button>
              </>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold">{brand.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500">⭐ {brand.rating}</span>
              <span className="text-gray-400">({brand.reviews.toLocaleString()} reviews)</span>
            </div>
            <p className="text-gray-600 mt-3">{language === "中文" ? brand.description : brand.descriptionEn}</p>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("品牌故事", "Brand Story")}</h2>
          <p className="text-gray-700">{language === "中文" ? brand.history : brand.historyEn}</p>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div><div className="text-2xl">📅</div><div className="font-bold">{brand.founded}</div><div className="text-xs text-gray-500">{t("成立", "Founded")}</div></div>
            <div><div className="text-2xl">👥</div><div className="font-bold">{brand.employees}+</div><div className="text-xs text-gray-500">{t("员工", "Employees")}</div></div>
            <div><div className="text-2xl">🏭</div><div className="font-bold">{brand.capacity}</div><div className="text-xs text-gray-500">{t("日产能", "Capacity")}</div></div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("产品系列", "Products")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.products.map((product, idx) => (
              <div key={idx} className={`border rounded-xl p-4 cursor-pointer ${selectedProduct?.name === product.name ? "border-orange-500 bg-orange-50" : "border-gray-200"}`} onClick={() => setSelectedProduct(product)}>
                <div className="flex justify-between">
                  <div><h3 className="font-bold">{product.name}</h3><div className="text-sm text-gray-500">{product.spicy}</div></div>
                  <div className="text-right"><div className="text-xl font-bold text-orange-600">¥{product.price}</div><div className="text-xs text-gray-400">/{product.unit}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bulk Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("批量采购", "Bulk Purchase")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {brand.bulkOptions.map((option, idx) => (
              <div key={idx} className={`border rounded-xl p-3 text-center cursor-pointer ${selectedBulk?.quantity === option.quantity ? "border-orange-500 bg-orange-50" : "border-gray-200"}`} onClick={() => setSelectedBulk(option)}>
                <div className="font-bold">{option.quantity}</div>
                <div className="text-orange-600 font-bold">¥{option.price}</div>
                <div className="text-xs text-gray-500">≈ ¥{option.unitPrice}/{t("包", "pack")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("资质认证", "Certifications")}</h2>
          <div className="flex flex-wrap gap-2">
            {brand.certifications.map((cert, idx) => (
              <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">✓ {cert}</span>
            ))}
          </div>
        </div>

        {/* Order */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div><h3 className="text-xl font-bold">{t("立即订购", "Order Now")}</h3><p className="text-orange-100 text-sm">{t("工厂直供 · 一件代发", "Factory direct · Dropshipping")}</p></div>
            <div className="flex gap-3">
              <div className="bg-white rounded-lg px-3 py-1 flex items-center gap-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-600 font-bold px-2">-</button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-600 font-bold px-2">+</button>
              </div>
              <button onClick={() => showNotification("Added to cart")} className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium">🛒 {t("加入购物车", "Add to Cart")}</button>
            </div>
          </div>
        </div>
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default BrandDetailPage;