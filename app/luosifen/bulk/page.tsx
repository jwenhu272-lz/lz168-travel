"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// Bulk pricing data
const bulkPricingTiers = [
  { quantity: "25-99 packs", discount: "5%", unitPrice: "≈ ¥2.58", minOrder: "25 packs", leadTime: "3-5 days", shipping: "Express" },
  { quantity: "100-499 packs", discount: "10%", unitPrice: "≈ ¥2.45", minOrder: "100 packs", leadTime: "5-7 days", shipping: "Freight" },
  { quantity: "500-999 packs", discount: "15%", unitPrice: "≈ ¥2.31", minOrder: "500 packs", leadTime: "7-10 days", shipping: "Sea Freight" },
  { quantity: "1000+ packs", discount: "20-30%", unitPrice: "≈ ¥2.04-¥2.31", minOrder: "1000 packs", leadTime: "10-15 days", shipping: "Negotiable" },
];

const brandBulkOffers = [
  { brand: "螺霸王", minOrder: "100 packs", pricePerPack: "¥2.55", discount: "15%", special: "免费品牌包装" },
  { brand: "人类快乐", minOrder: "50 packs", pricePerPack: "¥12.90", discount: "10%", special: "煎蛋螺蛳粉专供" },
  { brand: "柳芳", minOrder: "200 packs", pricePerPack: "¥2.40", discount: "20%", special: "传统口味" },
  { brand: "陈龙", minOrder: "50盒", pricePerPack: "¥60/盒", discount: "15%", special: "礼盒装定制" },
  { brand: "李子柒", minOrder: "500 packs", pricePerPack: "¥2.80", discount: "12%", special: "网红品牌" },
];

function BulkPage() {
  const [language, setLanguage] = useState("中文");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", quantity: "", brand: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  const t = (zh, en) => language === "中文" ? zh : en;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐 <span className="text-xs ml-1">{language}</span></button>
              <Link href="/luosifen" className="text-orange-600 text-sm">← {t("返回", "Back")}</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">📦 {t("批量采购", "Bulk Purchase")}</h1>
          <p className="text-blue-100">{t("工厂直供 · 量大价优 · 全球配送", "Factory direct · Volume discounts · Global shipping")}</p>
        </div>

        {/* Pricing Tiers */}
        <h2 className="text-xl font-bold mb-4">{t("阶梯价格", "Volume Pricing Tiers")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {bulkPricingTiers.map((tier, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-blue-600">{tier.quantity}</div>
              <div className="text-green-600 font-bold mt-2">{tier.discount} OFF</div>
              <div className="text-gray-500 text-sm">{t("单价", "Unit Price")}: {tier.unitPrice}</div>
              <div className="text-gray-500 text-sm">{t("起订量", "MOQ")}: {tier.minOrder}</div>
              <div className="text-gray-500 text-sm">{t("交货期", "Lead Time")}: {tier.leadTime}</div>
            </div>
          ))}
        </div>

        {/* Brand Bulk Offers */}
        <h2 className="text-xl font-bold mb-4">{t("品牌批量报价", "Brand Bulk Offers")}</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr><th className="p-3 text-left">{t("品牌", "Brand")}</th><th className="p-3 text-left">{t("起订量", "MOQ")}</th><th className="p-3 text-left">{t("单价", "Unit Price")}</th><th className="p-3 text-left">{t("折扣", "Discount")}</th><th className="p-3 text-left">{t("特色", "Special")}</th></tr>
            </thead>
            <tbody>
              {brandBulkOffers.map((offer, idx) => (
                <tr key={idx} className="border-t"><td className="p-3 font-medium">{offer.brand}</td><td className="p-3">{offer.minOrder}</td><td className="p-3 text-orange-600 font-bold">{offer.pricePerPack}</td><td className="p-3 text-green-600">{offer.discount}</td><td className="p-3 text-gray-500">{offer.special}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t("批量采购询价", "Bulk Order Inquiry")}</h2>
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">{t("询价已提交！我们会尽快联系您。", "Inquiry submitted! We will contact you soon.")}</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t("姓名", "Name")} className="border rounded-lg px-4 py-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input type="text" placeholder={t("公司名称", "Company Name")} className="border rounded-lg px-4 py-2" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                <input type="email" placeholder={t("邮箱", "Email")} className="border rounded-lg px-4 py-2" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="tel" placeholder={t("电话", "Phone")} className="border rounded-lg px-4 py-2" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                <select className="border rounded-lg px-4 py-2" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} required>
                  <option value="">{t("预估采购量", "Estimated Quantity")}</option><option>25-99 packs</option><option>100-499 packs</option><option>500-999 packs</option><option>1000+ packs</option>
                </select>
                <select className="border rounded-lg px-4 py-2" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})}>
                  <option value="">{t("感兴趣的品牌", "Brand Interest")}</option>{brandBulkOffers.map(offer => (<option key={offer.brand}>{offer.brand}</option>))}
                </select>
              </div>
              <textarea placeholder={t("特殊要求", "Special Requirements")} rows={3} className="border rounded-lg px-4 py-2 w-full" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 w-full">{t("提交询价", "Submit Inquiry")}</button>
            </form>
          )}
        </div>
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default BulkPage;