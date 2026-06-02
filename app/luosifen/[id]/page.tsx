"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// Complete brand data (same structure as main page)
const luosifenBrands = [
  {
    id: "luobawang",
    name: "螺霸王",
    nameEn: "Luobawang",
    logo: "https://placehold.co/400x400/1a1a2e/white?text=LBW",
    heroImage: "https://placehold.co/1200x500/e94560/white?text=Luobawang+Hero",
    images: [
      "https://placehold.co/800x500/e94560/white?text=Product+Original",
      "https://placehold.co/800x500/c0392b/white?text=Product+Extra+Spicy",
      "https://placehold.co/800x500/f39c12/white?text=Factory+Line",
      "https://placehold.co/800x500/27ae60/white?text=Workers+Packaging",
      "https://placehold.co/800x500/2980b9/white?text=Happy+Customers",
    ],
    description: "柳州螺蛳粉龙头企业，拥有现代化工厂和螺蛳粉博物馆。畅销全球30多个国家，日产超百万包。",
    descriptionEn: "Leading Liuzhou Luosifen enterprise with modern factory and Luosifen museum. Sold in 30+ countries.",
    history: "成立于2012年，总部位于柳州鱼峰区。螺霸王是柳州螺蛳粉产业化的先行者，2016年建成全自动化生产线，2020年建成螺蛳粉博物馆，成为柳州工业旅游新地标。",
    historyEn: "Founded in 2012. Pioneer in Luosifen industrialization. Built fully automated production line in 2016, opened Luosifen Museum in 2020.",
    products: [
      { name: "经典原味", nameEn: "Classic Original", weight: "280g", price: 68, unit: "25包装", spicy: "🌶️🌶️", description: "招牌口味，地道柳州风味" },
      { name: "特辣版", nameEn: "Extra Spicy", weight: "280g", price: 72, unit: "25包装", spicy: "🌶️🌶️🌶️🌶️", description: "辣度升级，挑战味蕾" },
      { name: "小龙虾味", nameEn: "Crayfish Flavor", weight: "320g", price: 78, unit: "20包装", spicy: "🌶️🌶️🌶️", description: "创新口味，虾味浓郁" },
      { name: "干捞螺蛳粉", nameEn: "Dry Luosifen", weight: "300g", price: 65, unit: "20包装", spicy: "🌶️🌶️", description: "无汤版，酱料浓郁" },
    ],
    bulkOptions: [
      { type: "家庭装", quantity: "25包", price: 68, unitPrice: 2.72, description: "标准家庭分享装" },
      { type: "批发装", quantity: "100包", price: 255, unitPrice: 2.55, description: "适合小型商家" },
      { type: "出口装", quantity: "500包", price: 1200, unitPrice: 2.40, description: "外贸标准箱" },
      { type: "定制礼盒", quantity: "定制", price: "询价", unitPrice: null, description: "企业礼品定制" },
    ],
    certifications: ["ISO认证", "HACCP认证", "出口食品备案", "广西著名商标"],
    tags: ["龙头企业", "出口全球", "螺蛳粉博物馆", "日销百万包"],
    origin: "柳州鱼峰区",
    founded: 2012,
    employees: 500,
    capacity: "100万包/天",
    website: "https://www.luobawang.com",
    rating: 4.9,
    reviews: 12890,
    factoryTour: true,
  },
  {
    id: "humanhappy",
    name: "人类快乐",
    nameEn: "Humanhappy",
    logo: "https://placehold.co/400x400/0f3460/white?text=HH",
    heroImage: "https://placehold.co/1200x500/f5a623/white?text=Humanhappy+Hero",
    images: [
      "https://placehold.co/800x500/f5a623/white?text=Fried+Egg+Product",
      "https://placehold.co/800x500/e67e22/white?text=Deluxe+Edition",
      "https://placehold.co/800x500/d35400/white?text=Production+Line",
      "https://placehold.co/800x500/2ecc71/white?text=Customer+Reviews",
    ],
    description: "2022年新锐品牌，首创预包装煎蛋螺蛳粉。月销300万+，谭健次代言。",
    descriptionEn: "2022 innovative brand, first to create prepackaged fried egg luosifen. 3M+ monthly sales.",
    history: "成立于2022年，总部位于柳南区。人类快乐团队深耕螺蛳粉爱好者需求，首创预包装煎蛋螺蛳粉，突破行业技术壁垒。",
    historyEn: "Founded in 2022. Pioneered prepackaged fried egg luosifen, breaking industry technical barriers.",
    products: [
      { name: "煎蛋螺蛳粉", nameEn: "Fried Egg Luosifen", weight: "350g", price: 13.9, unit: "单包", spicy: "🌶️🌶️", description: "首创煎蛋，吸汤爆汁" },
      { name: "豪华版", nameEn: "Deluxe Edition", weight: "380g", price: 18.9, unit: "单包", spicy: "🌶️🌶️🌶️", description: "加量腐竹+双倍酸笋" },
      { name: "家庭装", nameEn: "Family Pack", weight: "350g×6", price: 79.9, unit: "6包装", spicy: "🌶️🌶️", description: "经济实惠" },
    ],
    bulkOptions: [
      { type: "零售装", quantity: "1包", price: 13.9, unitPrice: 13.9, description: "单包尝鲜" },
      { type: "家庭装", quantity: "6包", price: 79.9, unitPrice: 13.32, description: "家庭分享" },
      { type: "批发装", quantity: "50包", price: 645, unitPrice: 12.9, description: "小店批发" },
    ],
    certifications: ["ISO认证", "HACCP认证"],
    tags: ["新锐品牌", "煎蛋螺蛳粉", "明星代言", "月销300万"],
    origin: "柳州柳南区",
    founded: 2022,
    employees: 150,
    capacity: "50万包/天",
    rating: 4.8,
    reviews: 34560,
    factoryTour: false,
  },
  // Add remaining 8 brands following the same pattern
  // For brevity, include placeholder for other brands or copy from main page
];

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
  const [toastMessage, setToastMessage] = useState("");

  const brand = luosifenBrands.find(b => b.id === brandId);

  useEffect(() => {
    if (brand?.products?.length && !selectedProduct) setSelectedProduct(brand.products[0]);
    if (brand?.bulkOptions?.length && !selectedBulk) setSelectedBulk(brand.bulkOptions[0]);
  }, [brand, selectedProduct, selectedBulk]);

  if (!brand) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Brand not found</h1>
          <Link href="/luosifen" className="text-orange-600 mt-4 inline-block">← Back to Brands</Link>
        </div>
      </main>
    );
  }

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % brand.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + brand.images.length) % brand.images.length);

  const handleAddToCart = () => {
    if (!user) { showNotification("请先登录"); setShowLoginModal(true); return; }
    showNotification(`已添加 ${selectedProduct?.name} ${quantity}件到购物车`);
  };

  const handleBuyNow = () => {
    if (!user) { showNotification("请先登录"); setShowLoginModal(true); return; }
    showNotification("正在跳转到结算页面...");
  };

  const t = (zh, en) => language === "中文" ? zh : en;

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {showToast && (<div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-fade-in-out">{toastMessage}</div>)}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={() => {}} onRegister={() => {}} language={language} />

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
        <Link href="/luosifen" className="text-orange-600 mb-4 inline-block">← {t("返回品牌列表", "Back to Brands")}</Link>

        {/* Image Gallery Carousel */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative h-96 bg-gray-100">
            <img src={brand.images[currentImageIndex]} alt={brand.name} className="w-full h-full object-cover" />
            {brand.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full">◀</button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full">▶</button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {brand.images.map((_, idx) => (<div key={idx} className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === idx ? "bg-white" : "bg-white bg-opacity-50"}`} />))}
                </div>
              </>
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{brand.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-yellow-400">{"⭐".repeat(Math.floor(brand.rating))}</div>
                  <span className="text-sm text-gray-500">{brand.rating} ({brand.reviews.toLocaleString()} {t("评价", "reviews")})</span>
                </div>
                <p className="text-gray-600 mt-3 max-w-2xl">{language === "中文" ? brand.description : brand.descriptionEn}</p>
              </div>
              <div className="bg-orange-100 px-4 py-2 rounded-full text-orange-700 text-sm font-medium">📍 {brand.origin}</div>
            </div>
          </div>
        </div>

        {/* Company History */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("品牌故事", "Brand Story")}</h2>
          <p className="text-gray-700 leading-relaxed">{language === "中文" ? brand.history : brand.historyEn}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center"><div className="text-2xl">📅</div><div className="font-bold">{brand.founded}</div><div className="text-xs text-gray-500">{t("成立年份", "Founded")}</div></div>
            <div className="text-center"><div className="text-2xl">👥</div><div className="font-bold">{brand.employees}+</div><div className="text-xs text-gray-500">{t("员工人数", "Employees")}</div></div>
            <div className="text-center"><div className="text-2xl">🏭</div><div className="font-bold">{brand.capacity}</div><div className="text-xs text-gray-500">{t("日产能", "Daily Capacity")}</div></div>
            <div className="text-center"><div className="text-2xl">🏆</div><div className="font-bold">{brand.rating}</div><div className="text-xs text-gray-500">{t("用户评分", "Rating")}</div></div>
          </div>
        </div>

        {/* Product Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("产品系列", "Product Series")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.products?.map((product, idx) => (
              <div key={idx} className={`border rounded-xl p-4 cursor-pointer transition ${selectedProduct?.name === product.name ? "border-orange-500 bg-orange-50" : "border-gray-200"}`} onClick={() => setSelectedProduct(product)}>
                <div className="flex justify-between items-start">
                  <div><h3 className="font-bold">{t(product.name, product.nameEn)}</h3><p className="text-sm text-gray-500">{product.description}</p><div className="flex items-center gap-2 mt-1"><span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{product.weight}</span><span className="text-xs">{product.spicy}</span></div></div>
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
            {brand.bulkOptions?.map((option, idx) => (
              <div key={idx} className={`border rounded-xl p-3 text-center cursor-pointer transition ${selectedBulk?.quantity === option.quantity ? "border-orange-500 bg-orange-50" : "border-gray-200"}`} onClick={() => setSelectedBulk(option)}>
                <div className="font-bold text-lg">{option.quantity}</div>
                <div className="text-orange-600 font-bold">{typeof option.price === 'number' ? `¥${option.price}` : option.price}</div>
                {option.unitPrice && <div className="text-xs text-gray-400">≈ ¥{option.unitPrice}/{t("包", "pack")}</div>}
                <div className="text-xs text-gray-500 mt-1">{option.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("资质认证", "Certifications")}</h2>
          <div className="flex flex-wrap gap-2">{brand.certifications?.map((cert, idx) => (<span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">✓ {cert}</span>))}</div>
        </div>

        {/* Order Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div><h3 className="text-xl font-bold">{t("立即订购", "Order Now")}</h3><p className="text-orange-100 text-sm mt-1">{t("源头工厂直供 · 一件代发 · 全国配送", "Factory direct · Dropshipping · National shipping")}</p></div>
            <div className="flex gap-3">
              <div className="bg-white rounded-lg px-3 py-1 flex items-center gap-2"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-600 font-bold text-lg px-2">-</button><span className="w-8 text-center font-medium">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="text-gray-600 font-bold text-lg px-2">+</button></div>
              <button onClick={handleAddToCart} className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100">🛒 {t("加入购物车", "Add to Cart")}</button>
              <button onClick={handleBuyNow} className="bg-yellow-400 text-orange-800 px-6 py-2 rounded-full font-medium hover:bg-yellow-300">⚡ {t("立即购买", "Buy Now")}</button>
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