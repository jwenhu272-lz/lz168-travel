"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

function CreatePostPage() {
  const { user, login, register } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState("中文");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  const t = (zh, en) => language === "中文" ? zh : en;

  // Redirect to login if not authenticated
  if (typeof window !== "undefined" && !user) {
    return (
      <main className="min-h-screen bg-gray-100">
        <LoginModal 
          isOpen={true} 
          onClose={() => router.push("/")} 
          onLogin={login} 
          onRegister={register} 
          language={language} 
        />
      </main>
    );
  }

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls.length === 0 ? [""] : newUrls);
  };

  const updateImageUrl = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(t("请输入标题", "Please enter a title"));
      return;
    }
    if (!description.trim()) {
      alert(t("请输入内容", "Please enter content"));
      return;
    }

    setIsSubmitting(true);

    // Filter out empty image URLs
    const validImages = imageUrls.filter(url => url.trim() !== "");

    // Create new post object
    const newPost = {
      id: Date.now(),
      username: user.name || "用户",
      usernameEn: user.name || "User",
      avatar: "👤",
      images: validImages.length > 0 ? validImages : ["https://picsum.photos/id/104/600/400"],
      title: title,
      titleEn: title,
      description: description,
      descriptionEn: description,
      location: location || "柳州",
      locationEn: location || "Liuzhou",
      tags: ["用户分享"],
      tagsEn: ["User Share"],
      likes: 0,
      comments: 0,
      saves: 0,
      shares: 0,
      timeAgo: t("刚刚", "Just now"),
      timeAgoEn: "Just now",
    };

    // Save to localStorage (mock - in production, this would be an API call)
    const existingPosts = JSON.parse(localStorage.getItem("user_posts") || "[]");
    existingPosts.unshift(newPost);
    localStorage.setItem("user_posts", JSON.stringify(existingPosts));

    alert(t("发布成功！", "Post published successfully!"));
    router.push("/community");
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={login} onRegister={register} language={language} />

      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 md:gap-4 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐 <span className="text-xs ml-1 hidden md:inline">{language}</span></button>
              <div className="flex items-center gap-2">
                <span className="text-lg">👤</span>
                <span className="text-sm font-medium hidden md:inline">{user?.name?.split(' ')[0] || user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link href="/community" className="text-blue-600 mb-4 inline-block">
          ← {t("返回社区", "Back to Community")}
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">{t("发布新动态", "Create New Post")}</h1>
            <p className="text-gray-500 text-sm mt-1">{t("分享你的旅行故事和美食体验", "Share your travel stories and food experiences")}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block font-medium mb-2">{t("标题", "Title")} <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("输入标题...", "Enter title...")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={100}
              />
              <p className="text-right text-xs text-gray-400 mt-1">{title.length}/100</p>
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-2">{t("内容", "Content")} <span className="text-red-500">*</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("分享你的体验...", "Share your experience...")}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                maxLength={500}
              />
              <p className="text-right text-xs text-gray-400 mt-1">{description.length}/500</p>
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium mb-2">{t("地点", "Location")}</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("例如: 青云螺蛳粉总店", "e.g., Qingyun Luosifen Main Shop")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image URLs */}
            <div>
              <label className="block font-medium mb-2">{t("图片链接", "Image URLs")}</label>
              <p className="text-xs text-gray-400 mb-2">{t("支持图床链接 (imgur, postimg, picsum)", "Supports image hosting URLs")}</p>
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                    placeholder={`${t("图片链接", "Image URL")} ${index + 1}`}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
              >
                + {t("添加更多图片", "Add more images")}
              </button>
            </div>

            {/* Preview Section */}
            {title && description && (
              <div className="border-t pt-4 mt-4">
                <p className="font-medium mb-3">{t("预览", "Preview")}</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{description.substring(0, 100)}...</p>
                  {location && <p className="text-xs text-gray-400 mt-2">📍 {location}</p>}
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/community")}
                className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                {t("取消", "Cancel")}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? t("发布中...", "Publishing...") : t("发布", "Publish")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </main>
  );
}

export default function CreatePostWrapper() {
  return (
    <AuthProvider>
      <CreatePostPage />
    </AuthProvider>
  );
}