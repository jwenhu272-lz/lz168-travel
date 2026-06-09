"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";
import { AuthProvider } from "@/context/AuthContext";

// Community posts data
const communityPosts = [
  { id: 1, username: "柳州美食家", usernameEn: "Liuzhou Foodie", avatar: "🍜", category: "food", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Luosifen%20food%20review/community-post3-luosifen-food-review-1.jpeg", title: "青云螺蛳粉探店！正宗柳州味", titleEn: "Qingyun Luosifen Review!", likes: 1289, comments: 89, saves: 345, imagesCount: 2 },
  { id: 2, username: "旅游达人小周", usernameEn: "Travel Expert", avatar: "✈️", category: "travel", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Qingyun%20viewpoint/community-post6-qingyun-viewpoint-1.jpeg", title: "青云景区最美打卡点推荐", titleEn: "Best Photo Spots", likes: 2345, comments: 156, saves: 678, imagesCount: 2 },
  { id: 3, username: "青云商户管家", usernameEn: "Qingyun Merchant", avatar: "🏨", category: "hotel", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Boutique%20hotel%20room/community-post1-boutique-hotel-room-1.jpeg", title: "青云精品酒店限时特惠！", titleEn: "Hotel Limited Offer!", likes: 567, comments: 34, saves: 123, imagesCount: 3 },
  { id: 4, username: "柳州摄影狮", usernameEn: "Liuzhou Photographer", avatar: "📷", category: "photo", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Traditional%20architecture/community-post8-traditional-architecture-1.jpeg", title: "青云夜景绝美拍摄攻略", titleEn: "Night Photography Guide", likes: 3421, comments: 278, saves: 901, imagesCount: 2 },
  { id: 5, username: "螺蛳粉公主", usernameEn: "Luosifen Princess", avatar: "👸", category: "food", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20close-up/community-post4-night-market-close-up-1.jpeg", title: "柳州夜市必吃清单🔥", titleEn: "Night Market Must-Eat🔥", likes: 1876, comments: 145, saves: 432, imagesCount: 3 },
  { id: 6, username: "青云官方", usernameEn: "Qingyun Official", avatar: "🎫", category: "travel", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20scene/community-post4-night-market-scene-1.jpeg", title: "青云景区新活动来啦！", titleEn: "New Events at Qingyun!", likes: 987, comments: 56, saves: 234, imagesCount: 2 },
  { id: 7, username: "自驾游阿强", usernameEn: "Road Trip A Qiang", avatar: "🚗", category: "travel", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Scenic%20mountain%20road/community-post7-scenic-mountain-road-1.jpeg", title: "柳州周边自驾游路线推荐", titleEn: "Road Trip Routes", likes: 654, comments: 43, saves: 187, imagesCount: 2 },
  { id: 8, username: "美食探店小分队", usernameEn: "Food Explorer Team", avatar: "🍲", category: "food", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Dim%20sum%20morning%20tea/community-post2-dimsum-morning-tea-1.jpeg", title: "青云早茶文化体验", titleEn: "Morning Tea Experience", likes: 2341, comments: 167, saves: 543, imagesCount: 2 },
  { id: 9, username: "柳州文旅", usernameEn: "Liuzhou Culture & Tourism", avatar: "🌸", category: "sakura", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_0808511a-cfbc-4517-92f5-b72bd891dc6c.jpeg", title: "🌸 柳州樱花季 · 春日限定浪漫", titleEn: "🌸 Liuzhou Sakura Season", likes: 3421, comments: 278, saves: 901, imagesCount: 1 },
  { id: 10, username: "摄影小王子", usernameEn: "Photography Prince", avatar: "📸", category: "photo", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_133e5bd7-eb4e-4890-bb02-8cb90bce7869.jpeg", title: "樱花拍照秘籍｜柳州樱花季必看", titleEn: "Sakura Photography Secrets", likes: 2856, comments: 189, saves: 567, imagesCount: 2 },
];

// Filter options
const filterOptions = [
  { id: "all", label: "全部", labelEn: "All", icon: "📱" },
  { id: "food", label: "美食", labelEn: "Food", icon: "🍜" },
  { id: "travel", label: "旅行", labelEn: "Travel", icon: "✈️" },
  { id: "hotel", label: "住宿", labelEn: "Stay", icon: "🏨" },
  { id: "photo", label: "摄影", labelEn: "Photo", icon: "📷" },
  { id: "sakura", label: "樱花季", labelEn: "Sakura", icon: "🌸" },
];

function CommunityPage() {
  const [language, setLanguage] = useState("中文");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [gridColumns, setGridColumns] = useState(2);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const savedGrid = localStorage.getItem("community_grid_layout");
    if (savedGrid) setGridColumns(parseInt(savedGrid));
  }, []);

  // Restore scroll position when coming back from detail page
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("community_scroll_position");
    if (savedScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: parseInt(savedScroll), behavior: "instant" });
        sessionStorage.removeItem("community_scroll_position");
      });
    }
  }, []);

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  
  const toggleGridLayout = () => {
    const newLayout = gridColumns === 2 ? 1 : 2;
    setGridColumns(newLayout);
    localStorage.setItem("community_grid_layout", newLayout.toString());
  };

  // Save scroll position before leaving to detail page
  const handlePostClick = () => {
    sessionStorage.setItem("community_scroll_position", window.scrollY.toString());
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Filter posts based on search and category
  const filteredPosts = communityPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      (language === "中文" ? post.title : post.titleEn).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || post.category === activeFilter;
    return matchesSearch && matchesFilter;
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
              <Link href="/profile" className="text-xl">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header Section with Create Post Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t("青云社区", "Qingyun Community")}</h1>
            <p className="text-gray-500 text-sm">{t("分享旅行故事，发现柳州之美", "Share travel stories, discover Liuzhou")}</p>
          </div>
          <div className="flex gap-3">
            {/* Grid Toggle Button */}
            <button onClick={toggleGridLayout} className="px-4 py-2 rounded-full border bg-white text-sm">
              {gridColumns === 2 ? t("一列", "1 Col") : t("两列", "2 Cols")}
            </button>
            {/* Create Post Button */}
            <Link href="/community/new">
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-full text-sm flex items-center gap-2 hover:from-pink-600 hover:to-rose-600 transition shadow-md">
                ✍️ {t("发布动态", "Create Post")}
              </button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-sm p-1 flex items-center mb-6">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("搜索社区内容...", "Search community...")} 
            className="flex-1 px-4 py-2 rounded-full outline-none text-sm"
          />
          <button className="bg-gray-100 p-2 rounded-full px-4 text-sm">🔍 {t("搜索", "Search")}</button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                activeFilter === option.id 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {option.icon} {t(option.label, option.labelEn)}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          {t("找到", "Found")} {filteredPosts.length} {t("个帖子", "posts")}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-400 text-lg">{t("暂无相关内容", "No content found")}</p>
            <p className="text-gray-300 text-sm mt-1">{t("试试其他搜索词或筛选条件", "Try other search terms or filters")}</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${gridColumns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`} onClick={handlePostClick}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-48 bg-gray-100">
                    {!imageErrors[post.id] ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" onError={() => handleImageError(post.id)} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-r from-gray-100 to-gray-200">
                        {post.avatar}
                      </div>
                    )}
                    {post.imagesCount > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        📷 {post.imagesCount}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">{post.avatar}</div>
                      <span className="text-xs text-gray-500">{language === "中文" ? post.username : post.usernameEn}</span>
                    </div>
                    <h3 className="font-medium text-sm line-clamp-2">{language === "中文" ? post.title : post.titleEn}</h3>
                    <div className="flex gap-3 mt-2 text-xs text-gray-400">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                      <span>⭐ {post.saves}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default function CommunityPageWrapper() {
  return (
    <AuthProvider>
      <CommunityPage />
    </AuthProvider>
  );
}