"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

const benefits = [
  { icon: "💰", title: "更低价格", titleEn: "Lower Prices", desc: "享受批发专享折扣价", descEn: "Exclusive wholesale discounts" },
  { icon: "📦", title: "一件代发", titleEn: "Dropshipping", desc: "无需库存，我们代发", descEn: "No inventory needed" },
  { icon: "🚚", title: "快速配送", titleEn: "Fast Shipping", desc: "全国3-5天送达", descEn: "3-5 days national delivery" },
  { icon: "🎁", title: "营销支持", titleEn: "Marketing Support", desc: "提供宣传素材", descEn: "Marketing materials provided" },
  { icon: "📊", title: "数据分析", titleEn: "Data Analytics", desc: "销售数据实时查看", descEn: "Real-time sales data" },
  { icon: "🤝", title: "专属客服", titleEn: "Dedicated Support", desc: "1对1客户经理", descEn: "1-on-1 account manager" },
];

const requirements = [
  { text: "具有合法经营资质（营业执照）", textEn: "Valid business license" },
  { text: "有固定的经营场所（实体店/仓库/办公室）", textEn: "Fixed business location (store/warehouse/office)" },
  { text: "首次订单金额不低于2000元", textEn: "First order minimum ¥2000" },
  { text: "遵守市场定价规范", textEn: "Follow pricing guidelines" },
];

function WholesalePage() {
  const [language, setLanguage] = useState("中文");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", businessType: "", city: "", experience: "" });
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
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 mb-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">🤝 {t("成为批发合作伙伴", "Become a Wholesale Partner")}</h1>
          <p className="text-green-100">{t("加入青云螺蛳粉分销网络，共享百亿市场机遇", "Join Qingyun Luosifen distribution network, share in 10-billion market opportunity")}</p>
        </div>

        {/* Benefits */}
        <h2 className="text-xl font-bold mb-4">{t("合作伙伴权益", "Partner Benefits")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-md">
              <div className="text-3xl mb-2">{benefit.icon}</div>
              <div className="font-bold text-sm">{t(benefit.title, benefit.titleEn)}</div>
              <div className="text-xs text-gray-500 mt-1">{t(benefit.desc, benefit.descEn)}</div>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{t("合作要求", "Requirements")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-2"><span className="text-green-600">✓</span><span>{t(req.text, req.textEn)}</span></div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t("申请成为批发商", "Apply for Wholesaler")}</h2>
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">{t("申请已提交！我们会尽快审核并与您联系。", "Application submitted! We will review and contact you soon.")}</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t("联系人姓名", "Contact Name")} className="border rounded-lg px-4 py-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input type="text" placeholder={t("公司名称", "Company Name")} className="border rounded-lg px-4 py-2" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} required />
                <input type="email" placeholder={t("邮箱", "Email")} className="border rounded-lg px-4 py-2" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="tel" placeholder={t("电话", "Phone")} className="border rounded-lg px-4 py-2" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                <select className="border rounded-lg px-4 py-2" value={formData.businessType} onChange={(e) => setFormData({...formData, businessType: e.target.value})} required>
                  <option value="">{t("业务类型", "Business Type")}</option><option>实体店/Retail Store</option><option>电商/Online Store</option><option>餐饮/Restaurant</option><option>批发/Wholesaler</option><option>其他/Other</option>
                </select>
                <input type="text" placeholder={t("所在城市", "City")} className="border rounded-lg px-4 py-2" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
              </div>
              <textarea placeholder={t("销售经验或资源优势", "Sales experience or资源优势")} rows={3} className="border rounded-lg px-4 py-2 w-full" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})}></textarea>
              <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 w-full">{t("提交申请", "Submit Application")}</button>
            </form>
          )}
        </div>
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default WholesalePage;