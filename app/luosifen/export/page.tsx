"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

const exportCountries = [
  { flag: "🇺🇸", country: "United States", region: "North America", leadTime: "15-25 days", moq: "500 packs" },
  { flag: "🇨🇦", country: "Canada", region: "North America", leadTime: "15-25 days", moq: "500 packs" },
  { flag: "🇬🇧", country: "United Kingdom", region: "Europe", leadTime: "20-30 days", moq: "500 packs" },
  { flag: "🇩🇪", country: "Germany", region: "Europe", leadTime: "20-30 days", moq: "500 packs" },
  { flag: "🇫🇷", country: "France", region: "Europe", leadTime: "20-30 days", moq: "500 packs" },
  { flag: "🇦🇺", country: "Australia", region: "Oceania", leadTime: "15-25 days", moq: "500 packs" },
  { flag: "🇯🇵", country: "Japan", region: "Asia", leadTime: "7-14 days", moq: "300 packs" },
  { flag: "🇰🇷", country: "South Korea", region: "Asia", leadTime: "7-14 days", moq: "300 packs" },
  { flag: "🇸🇬", country: "Singapore", region: "Asia", leadTime: "7-14 days", moq: "300 packs" },
  { flag: "🇲🇾", country: "Malaysia", region: "Asia", leadTime: "7-14 days", moq: "300 packs" },
];

const certifications = [
  { name: "ISO 22000", desc: "食品安全管理体系", descEn: "Food Safety Management" },
  { name: "HACCP", desc: "危害分析与关键控制点", descEn: "Hazard Analysis Critical Control Point" },
  { name: "FDA", desc: "美国食品药品监督管理局注册", descEn: "US FDA Registered" },
  { name: "EU Organic", desc: "欧盟有机认证", descEn: "EU Organic Certification" },
  { name: "Halal", desc: "清真认证", descEn: "Halal Certification" },
];

function ExportPage() {
  const [language, setLanguage] = useState("中文");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", country: "", quantity: "", message: "" });
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">🌏 {t("出口服务", "Export Service")}</h1>
          <p className="text-purple-100">{t("将柳州螺蛳粉销往全球 · 一站式出口解决方案", "Sell Liuzhou Luosifen worldwide · One-stop export solutions")}</p>
        </div>

        {/* Export Markets */}
        <h2 className="text-xl font-bold mb-4">{t("出口国家和地区", "Export Markets")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {exportCountries.map((country, idx) => (
            <div key={idx} className="bg-white rounded-xl p-3 text-center shadow-md">
              <div className="text-2xl">{country.flag}</div>
              <div className="font-medium text-sm">{country.country}</div>
              <div className="text-xs text-gray-500">{t("交货期", "Lead Time")}: {country.leadTime}</div>
              <div className="text-xs text-gray-500">MOQ: {country.moq}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{t("国际认证", "International Certifications")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 text-center">
                <div className="font-bold text-sm">{cert.name}</div>
                <div className="text-xs text-gray-500">{t(cert.desc, cert.descEn)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Process */}
        <h2 className="text-xl font-bold mb-4">{t("出口流程", "Export Process")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center"><div className="text-3xl mb-2">1️⃣</div><div className="font-bold">{t("询价", "Inquiry")}</div><div className="text-xs text-gray-500">{t("提交出口需求", "Submit export需求")}</div></div>
          <div className="bg-white rounded-xl p-4 text-center"><div className="text-3xl mb-2">2️⃣</div><div className="font-bold">{t("报价", "Quote")}</div><div className="text-xs text-gray-500">{t("提供FOB/CIF价格", "FOB/CIF pricing")}</div></div>
          <div className="bg-white rounded-xl p-4 text-center"><div className="text-3xl mb-2">3️⃣</div><div className="font-bold">{t("生产", "Production")}</div><div className="text-xs text-gray-500">{t("备货生产", "Prepare production")}</div></div>
          <div className="bg-white rounded-xl p-4 text-center"><div className="text-3xl mb-2">4️⃣</div><div className="font-bold">{t("发货", "Shipping")}</div><div className="text-xs text-gray-500">{t("国际物流", "International logistics")}</div></div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t("出口询价", "Export Inquiry")}</h2>
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">{t("询价已提交！出口专员会尽快联系您。", "Inquiry submitted! Export specialist will contact you soon.")}</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t("姓名", "Name")} className="border rounded-lg px-4 py-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input type="text" placeholder={t("公司名称", "Company Name")} className="border rounded-lg px-4 py-2" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                <input type="email" placeholder={t("邮箱", "Email")} className="border rounded-lg px-4 py-2" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="tel" placeholder={t("电话", "Phone")} className="border rounded-lg px-4 py-2" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                <select className="border rounded-lg px-4 py-2" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} required>
                  <option value="">{t("目标国家", "Target Country")}</option>{exportCountries.map(c => (<option key={c.country}>{c.country}</option>))}
                </select>
                <select className="border rounded-lg px-4 py-2" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} required>
                  <option value="">{t("预计采购量", "Estimated Quantity")}</option><option>500-999 packs</option><option>1000-4999 packs</option><option>5000+ packs</option>
                </select>
              </div>
              <textarea placeholder={t("特殊要求（如OEM定制、品牌包装等）", "Special requirements (OEM, custom packaging, etc.)")} rows={3} className="border rounded-lg px-4 py-2 w-full" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 w-full">{t("提交出口询价", "Submit Export Inquiry")}</button>
            </form>
          )}
        </div>
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default ExportPage;