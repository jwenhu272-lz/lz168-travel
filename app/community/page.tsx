"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";
import { AuthProvider } from "@/context/AuthContext";

// VERIFIED: Each id has correct image
const communityPosts = [
  { id: 1, username: "柳州美食家", avatar: "🍜", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Luosifen%20food%20review/community-post3-luosifen-food-review-1.jpeg", title: "青云螺蛳粉探店！正宗柳州味", likes: 1289, comments: 89, saves: 345, imagesCount: 2 },
  { id: 2, username: "旅游达人小周", avatar: "✈️", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Qingyun%20viewpoint/community-post6-qingyun-viewpoint-1.jpeg", title: "青云景区最美打卡点推荐", likes: 2345, comments: 156, saves: 678, imagesCount: 2 },
  { id: 3, username: "青云商户管家", avatar: "🏨", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Boutique%20hotel%20room/community-post1-boutique-hotel-room-1.jpeg", title: "青云精品酒店限时特惠！", likes: 567, comments: 34, saves: 123, imagesCount: 3 },
  { id: 4, username: "柳州摄影狮", avatar: "📷", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Traditional%20architecture/community-post8-traditional-architecture-1.jpeg", title: "青云夜景绝美拍摄攻略", likes: 3421, comments: 278, saves: 901, imagesCount: 2 },
  { id: 5, username: "螺蛳粉公主", avatar: "👸", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20close-up/community-post4-night-market-close-up-1.jpeg", title: "柳州夜市必吃清单🔥", likes: 1876, comments: 145, saves: 432, imagesCount: 3 },
  { id: 6, username: "青云官方", avatar: "🎫", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20scene/community-post4-night-market-scene-1.jpeg", title: "青云景区新活动来啦！", likes: 987, comments: 56, saves: 234, imagesCount: 2 },
  { id: 7, username: "自驾游阿强", avatar: "🚗", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Scenic%20mountain%20road/community-post7-scenic-mountain-road-1.jpeg", title: "柳州周边自驾游路线推荐", likes: 654, comments: 43, saves: 187, imagesCount: 2 },
  { id: 8, username: "美食探店小分队", avatar: "🍲", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Dim%20sum%20morning%20tea/community-post2-dimsum-morning-tea-1.jpeg", title: "青云早茶文化体验", likes: 2341, comments: 167, saves: 543, imagesCount: 2 },
  { id: 9, username: "柳州文旅", avatar: "🌸", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_0808511a-cfbc-4517-92f5-b72bd891dc6c.jpeg", title: "🌸 柳州樱花季 · 春日限定浪漫", likes: 3421, comments: 278, saves: 901, imagesCount: 1 },
  { id: 10, username: "摄影小王子", avatar: "📸", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_133e5bd7-eb4e-4890-bb02-8cb90bce7869.jpeg", title: "樱花拍照秘籍｜柳州樱花季必看", likes: 2856, comments: 189, saves: 567, imagesCount: 2 },
];

function CommunityPage() {
  const [language, setLanguage] = useState("中文");
  const [searchQuery, setSearchQuery] = useState("");
  const [gridColumns, setGridColumns] = useState(2);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const savedGrid = localStorage.getItem("community_grid_layout");
    if (savedGrid) setGridColumns(parseInt(savedGrid));
  }, []);

  // ✅ RESTORE scroll position when coming back from detail page
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

  // ✅ SAVE scroll position before leaving to detail page
  const handlePostClick = () => {
    sessionStorage.setItem("community_scroll_position", window.scrollY.toString());
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredPosts = communityPosts.filter(post =>
    searchQuery === "" || post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t("青云社区", "Qingyun Community")}</h1>
            <p className="text-gray-500 text-sm">{t("分享旅行故事，发现柳州之美", "Share travel stories, discover Liuzhou")}</p>
          </div>
          <button onClick={toggleGridLayout} className="px-4 py-2 rounded-full border bg-white text-sm">
            {gridColumns === 2 ? t("一列", "1 Col") : t("两列", "2 Cols")}
          </button>
        </div>

        <div className="bg-white rounded-full shadow-sm p-1 flex items-center mb-6">
          <input type="text" placeholder={t("搜索社区内容...", "Search...")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2 rounded-full outline-none text-sm" />
          <button className="bg-gray-100 p-2 rounded-full px-4 text-sm">🔍</button>
        </div>

        <div className={`grid gap-4 ${gridColumns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/community/${post.id}`} onClick={handlePostClick}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="relative h-48 bg-gray-100">
                  {!imageErrors[post.id] ? (
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" onError={() => handleImageError(post.id)} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">{post.avatar}</div>
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
                    <span className="text-xs text-gray-500">{post.username}</span>
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2">{post.title}</h3>
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