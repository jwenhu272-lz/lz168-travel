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
    images: ["https://i.postimg.cc/jSGQqYsM/fb3d8be6-9c78-46fb-9560-48a65afd141a.jpg", "https://i.postimg.cc/7YC5HBKN/2d447cdb-2bbb-45de-86a4-e3b06540b681.jpg", "https://i.postimg.cc/fRmkXVnz/294f8c66-5d39-4a49-840b-f573552da73e.jpg", "https://i.postimg.cc/K8B4L1Sh/281f7653-efb5-4128-bb5c-f6169c8f3cc5.jpg", "https://i.postimg.cc/WbDdN95d/0bdf4a1d-3c5d-4383-b520-4e8e67062926.jpg"],
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
    images: ["https://i.postimg.cc/FH2gFX9D/bd553d56-ded2-4cd9-9183-bb24f1b26cdd.jpg", "https://i.postimg.cc/kXV2JjTT/6d4e54ff-0c97-402e-a016-75c92d9f006b.jpg", "https://i.postimg.cc/zX9VVnMN/63bd8e6f-9631-4049-a3b5-332239f16c0a.jpg", "https://i.postimg.cc/28q1kH02/4bb1cbe6-e457-4557-9c97-b23c4738b4cd.jpg"],
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
    images: ["https://i.postimg.cc/CxWHMpFv/ca93d604-fc1f-4105-aaba-3f73ec67ada1.jpg", "https://i.postimg.cc/k5CGy7qb/a24cbab8-83ab-4223-a84c-900f0e77716e.jpg", "https://i.postimg.cc/HkXj5rDD/98b808ce-ed60-4be3-8e51-8617bfb05648.jpg", "https://i.postimg.cc/SxCj8n0B/84e69559-1f2d-44b1-835c-e4ea9a7ce3b1.jpg"],
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
    images: ["https://i.postimg.cc/XvgJHtYR/ef4796d1-95fb-41ed-949f-a8430fe40a46.jpg", "https://i.postimg.cc/LsVXCG87/e38619bb-9d1b-4d5d-84de-586d8988b111.jpg", "https://i.postimg.cc/KY5zqC8d/dd6e0579-f121-46f7-b5d3-230b4e258c27.jpg"],
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
    images: ["https://i.postimg.cc/XYTcN6VH/897a89ee-7884-4183-a523-1bc6eceab134.jpg", "https://i.postimg.cc/9rhm1B5X/0f053196-2672-42c4-aaa2-a43731a67c81.jpg", "https://i.postimg.cc/rwxzWDXw/308ac038-71d3-44de-afb7-8df9f41f7e17.jpg", "https://i.postimg.cc/13w468hx/103c7cc1-6d34-4be7-9f91-7c423f4f1741.jpg"],
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
    images: ["https://i.postimg.cc/q7yczDqz/1ab706e7-07d4-4917-a09d-8f6a79ae655a.jpg", "https://i.postimg.cc/NjmLTKqr/50400c54-e8fc-4f3e-afe3-941cb3bca096.jpg", "https://i.postimg.cc/52LjvXdt/506f598d-4902-4e30-9b31-1bf910043585.jpg"],
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
    images: ["https://i.postimg.cc/QdRkNZ8D/7031a00b-409e-4033-91cf-1cc94962d7b1.jpg", "https://i.postimg.cc/QMDCqjhn/c4a4869a-2e9d-420b-992d-2ee4c3db4fce.jpg", "https://i.postimg.cc/Jh80QRMY/bad2be39-63c8-445d-8494-8b593c0e7d41.jpg"],
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
    images: ["https://i.postimg.cc/YCJf2Brp/69591221-c003-403c-90a6-5e1744dfa6b1.jpg", "https://i.postimg.cc/tgzTS84D/d7e52113-d48d-4603-bf56-9cd65a9ceec3.jpg", "https://i.postimg.cc/ZK1CCrQs/19f55f17-c4f2-4d2d-bd29-f65fc8924d25.jpg", "https://i.postimg.cc/zX9VVnMN/63bd8e6f-9631-4049-a3b5-332239f16c0a.jpg", "https://i.postimg.cc/QxBF86fS/3d82c13d-1466-43c9-bff8-c8483a0f5a51.jpg"],
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
    images: ["https://i.postimg.cc/BndcZfS6/56de1f87-212c-496d-b0c0-50d0e4785510.jpg", "https://i.postimg.cc/q7rqGp45/caadd2f1-dc92-47e1-88d1-9eadea3e4b57.jpg", "https://i.postimg.cc/KYbj5mxD/b3b84f93-4ef2-4283-9601-bf69d4769515.jpg", "https://i.postimg.cc/kXV2JjTT/6d4e54ff-0c97-402e-a016-75c92d9f006b.jpg", "https://i.postimg.cc/7YC5HBKN/2d447cdb-2bbb-45de-86a4-e3b06540b681.jpg", "https://i.postimg.cc/QMDCqjh9/411643d4-1049-4030-b15a-8e2af7c23c8d.jpg", "https://i.postimg.cc/SNwJJW50/36c92f15-bc95-4b2e-bfbb-e09cbcfdcf3d.jpg"],
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