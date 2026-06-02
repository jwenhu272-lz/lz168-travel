"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// COMPLETE community posts data - ALL 10 POSTS (same as [id]/page.tsx)
const communityPosts = [
  { 
    id: 1, 
    username: "柳州美食家", 
    usernameEn: "Liuzhou Foodie", 
    avatar: "🍜", 
    images: ["https://i.imgur.com/2ZsKVrr.jpeg", "https://picsum.photos/id/127/600/400", "https://picsum.photos/id/128/600/400"],
    title: "青云螺蛳粉探店！正宗柳州味", 
    titleEn: "Qingyun Luosifen Review! Authentic Liuzhou Flavor",
    description: "今天来打卡青云螺蛳粉总店！汤底浓郁，配料丰富，酸笋超正宗！推荐大家来试试～",
    descriptionEn: "Today we visited Qingyun Luosifen! Rich broth, plentiful toppings, authentic pickled bamboo shoots! Highly recommend~",
    location: "青云螺蛳粉总店",
    locationEn: "Qingyun Luosifen Main Shop",
    tags: ["螺蛳粉", "青云美食", "探店"],
    tagsEn: ["Luosifen", "Qingyun Food", "Food Review"],
    likes: 1289,
    comments: 89,
    saves: 345,
    shares: 56,
    timeAgo: "2小时前",
    timeAgoEn: "2 hours ago",
    userBio: "柳州本地美食博主 | 探索柳州美食",
    userBioEn: "Liuzhou local food blogger | Exploring Liuzhou cuisine",
    followers: 1234,
    following: 567
  },
  { 
    id: 2, 
    username: "旅游达人小周", 
    usernameEn: "Travel Expert Xiao Zhou", 
    avatar: "✈️", 
    images: ["https://i.imgur.com/aPGiMDW.jpeg", "https://picsum.photos/id/15/600/400"],
    title: "青云景区最美打卡点推荐", 
    titleEn: "Best Photo Spots at Qingyun Scenic Area",
    description: "青云景区这些机位拍照绝美！建议大家早上或傍晚来，光线最好～",
    descriptionEn: "These spots at Qingyun Scenic Area are perfect for photos! Come in the morning or evening for the best lighting~",
    location: "青云景区",
    locationEn: "Qingyun Scenic Area",
    tags: ["青云景区", "打卡", "摄影"],
    tagsEn: ["Qingyun Scenic", "Check-in", "Photography"],
    likes: 2345,
    comments: 156,
    saves: 678,
    shares: 123,
    timeAgo: "5小时前",
    timeAgoEn: "5 hours ago",
    userBio: "旅游达人 | 分享旅行攻略",
    userBioEn: "Travel expert | Sharing travel tips",
    followers: 2345,
    following: 890
  },
  { 
    id: 3, 
    username: "青云商户管家", 
    usernameEn: "Qingyun Merchant", 
    avatar: "🏨", 
    images: ["https://i.imgur.com/n81nuup.jpeg", "https://picsum.photos/id/106/600/400"],
    title: "青云精品酒店限时特惠！", 
    titleEn: "Qingyun Boutique Hotel Limited Offer!",
    description: "国庆期间特惠活动来袭！入住青云精品酒店享受8折优惠，还有免费早餐～",
    descriptionEn: "National Day special offer! 20% off at Qingyun Boutique Hotel, plus free breakfast~",
    location: "青云精品酒店",
    locationEn: "Qingyun Boutique Hotel",
    tags: ["酒店优惠", "青云住宿", "限时特惠"],
    tagsEn: ["Hotel Deal", "Qingyun Stay", "Limited Offer"],
    likes: 567,
    comments: 34,
    saves: 123,
    shares: 45,
    timeAgo: "1天前",
    timeAgoEn: "1 day ago",
    userBio: "青云精品酒店官方账号",
    userBioEn: "Qingyun Boutique Hotel Official",
    followers: 3456,
    following: 12
  },
  { 
    id: 4, 
    username: "柳州摄影狮", 
    usernameEn: "Liuzhou Photographer", 
    avatar: "📷", 
    images: ["https://i.imgur.com/7t5Kbon.jpeg", "https://picsum.photos/id/15/600/400"],
    title: "青云夜景绝美拍摄攻略", 
    titleEn: "Night Photography Guide at Qingyun",
    description: "青云夜景拍摄心得分享，最佳机位和拍摄时间推荐！",
    descriptionEn: "Night photography tips at Qingyun, best spots and timing recommendations!",
    location: "青云观景台",
    locationEn: "Qingyun Viewing Platform",
    tags: ["摄影", "夜景", "攻略"],
    tagsEn: ["Photography", "Night View", "Guide"],
    likes: 3421,
    comments: 278,
    saves: 901,
    shares: 234,
    timeAgo: "3小时前",
    timeAgoEn: "3 hours ago",
    userBio: "摄影爱好者 | 分享拍摄技巧",
    userBioEn: "Photography enthusiast | Sharing tips",
    followers: 5678,
    following: 345
  },
  { 
    id: 5, 
    username: "螺蛳粉公主", 
    usernameEn: "Luosifen Princess", 
    avatar: "👸", 
    images: ["https://i.imgur.com/n2G9MxQ.jpeg", "https://picsum.photos/id/127/600/400"],
    title: "柳州夜市必吃清单🔥", 
    titleEn: "Must-Eat List at Liuzhou Night Market 🔥",
    description: "青云夜市必吃美食推荐！烤串、炒螺、甜品一网打尽！",
    descriptionEn: "Must-eat recommendations at Qingyun Night Market! BBQ, snails, desserts!",
    location: "青云夜市",
    locationEn: "Qingyun Night Market",
    tags: ["夜市", "美食攻略", "必吃"],
    tagsEn: ["Night Market", "Food Guide", "Must-Eat"],
    likes: 1876,
    comments: 145,
    saves: 432,
    shares: 89,
    timeAgo: "6小时前",
    timeAgoEn: "6 hours ago",
    userBio: "美食探店达人 | 吃遍柳州",
    userBioEn: "Food explorer | Tasting all of Liuzhou",
    followers: 2345,
    following: 456
  },
  { 
    id: 6, 
    username: "青云官方", 
    usernameEn: "Qingyun Official", 
    avatar: "🎫", 
    images: ["https://i.imgur.com/RJCokjp.jpeg", "https://picsum.photos/id/96/600/400"],
    title: "青云景区新活动来啦！", 
    titleEn: "New Events at Qingyun Scenic Area!",
    description: "青云景区推出秋季特别活动，门票优惠+文化表演，快来参与！",
    descriptionEn: "Qingyun Scenic Area launches autumn special events! Ticket discounts + cultural shows, come join!",
    location: "青云景区",
    locationEn: "Qingyun Scenic Area",
    tags: ["官方活动", "青云景区", "优惠"],
    tagsEn: ["Official Event", "Qingyun", "Discount"],
    likes: 987,
    comments: 56,
    saves: 234,
    shares: 78,
    timeAgo: "1天前",
    timeAgoEn: "1 day ago",
    userBio: "青云景区官方账号",
    userBioEn: "Qingyun Scenic Area Official",
    followers: 7890,
    following: 5
  },
  { 
    id: 7, 
    username: "自驾游阿强", 
    usernameEn: "Road Trip A Qiang", 
    avatar: "🚗", 
    images: ["https://i.imgur.com/OTLyVMr.jpeg", "https://picsum.photos/id/111/600/400"],
    title: "柳州周边自驾游路线推荐", 
    titleEn: "Recommended Road Trip Routes Around Liuzhou",
    description: "柳州周边最美自驾路线，周末说走就走！",
    descriptionEn: "Most beautiful road trip routes around Liuzhou, perfect for weekend getaways!",
    location: "柳州周边",
    locationEn: "Around Liuzhou",
    tags: ["自驾游", "周边", "路线"],
    tagsEn: ["Road Trip", "Around Liuzhou", "Routes"],
    likes: 654,
    comments: 43,
    saves: 187,
    shares: 56,
    timeAgo: "8小时前",
    timeAgoEn: "8 hours ago",
    userBio: "自驾游爱好者 | 探索广西美景",
    userBioEn: "Road trip enthusiast | Exploring Guangxi",
    followers: 1234,
    following: 789
  },
  { 
    id: 8, 
    username: "美食探店小分队", 
    usernameEn: "Food Explorer Team", 
    avatar: "🍲", 
    images: ["https://i.imgur.com/tGPXcMx.jpeg", "https://picsum.photos/id/124/600/400"],
    title: "青云早茶文化体验", 
    titleEn: "Qingyun Morning Tea Cultural Experience",
    description: "体验地道的青云早茶文化，一盅两件，悠然自得～",
    descriptionEn: "Experience authentic Qingyun morning tea culture, relaxing and enjoyable~",
    location: "青云茶楼",
    locationEn: "Qingyun Tea House",
    tags: ["早茶", "文化体验", "美食"],
    tagsEn: ["Morning Tea", "Culture", "Food"],
    likes: 2341,
    comments: 167,
    saves: 543,
    shares: 123,
    timeAgo: "4小时前",
    timeAgoEn: "4 hours ago",
    userBio: "美食探店 | 分享美食故事",
    userBioEn: "Food exploring | Sharing food stories",
    followers: 3456,
    following: 234
  },
  // POST 9: Sakura Season
  { 
    id: 9, 
    username: "柳州文旅", 
    usernameEn: "Liuzhou Culture & Tourism", 
    avatar: "🌸", 
    images: [
      "https://i.postimg.cc/fRLsb1Cg/88b7da59-78a1-4183-a24e-2f4b3e89150d.jpg",
      "https://i.postimg.cc/jS0CJMGN/0808511a-cfbc-4517-92f5-b72bd891dc6c.jpg",
      "https://i.postimg.cc/kGsrJytT/701d4ac2-a167-444c-94b9-a7602c36a405.jpg"
    ],
    title: "🌸 柳州樱花季 · 春日限定浪漫", 
    titleEn: "🌸 Liuzhou Sakura Season · Spring Limited Romance",
    description: "每年4-5月，柳州变身粉色海洋！青云湖畔樱花盛开，漫步花海，感受春日浪漫。最佳观赏期：4月中旬至5月初。",
    descriptionEn: "Every April-May, Liuzhou turns into a pink ocean! Cherry blossoms bloom by Qingyun Lake, stroll through the flower sea and feel the spring romance. Best viewing: mid-April to early May.",
    location: "青云湖畔",
    locationEn: "Qingyun Lake",
    tags: ["樱花季", "柳州", "春日限定"],
    tagsEn: ["Sakura", "Liuzhou", "Spring"],
    likes: 3421,
    comments: 278,
    saves: 901,
    shares: 234,
    timeAgo: "3天前",
    timeAgoEn: "3 days ago",
    userBio: "柳州文化旅游局官方账号",
    userBioEn: "Liuzhou Culture and Tourism Official",
    followers: 12345,
    following: 10
  },
  // POST 10: Sakura Photography Tips
  { 
    id: 10, 
    username: "摄影小王子", 
    usernameEn: "Photography Prince", 
    avatar: "📸", 
    images: [
      "https://i.postimg.cc/RCHPTFWS/3c3c9f44-742f-456d-a2e9-377a2fc6ae6a.jpg",
      "https://i.postimg.cc/xdzWJQzM/6cb4d5cb-0e96-41d7-8ea9-04d8ecd083a5.jpg",
      "https://i.postimg.cc/Kz7wf5Qx/d4d6c605-8b08-4839-8507-b1a63c003064.jpg"
    ],
    title: "樱花拍照秘籍｜柳州樱花季必看", 
    titleEn: "Sakura Photography Secrets | Must-See for Liuzhou Sakura Season",
    description: "分享6个樱花拍照姿势和最佳拍摄时间！清晨和傍晚光线最美，穿浅色衣服更出片哦～",
    descriptionEn: "Share 6 cherry blossom photo poses and best shooting times! Morning and evening have the most beautiful light, light-colored clothes work best~",
    location: "青云公园",
    locationEn: "Qingyun Park",
    tags: ["摄影技巧", "樱花", "拍照圣地"],
    tagsEn: ["Photography", "Sakura", "Photo Spot"],
    likes: 2856,
    comments: 189,
    saves: 567,
    shares: 98,
    timeAgo: "2天前",
    timeAgoEn: "2 days ago",
    userBio: "独立摄影师 | 分享摄影心得",
    userBioEn: "Independent photographer | Sharing photography tips",
    followers: 5678,
    following: 234
  },
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
  const { user } = useAuth();
  const [language, setLanguage] = useState("中文");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [gridColumns, setGridColumns] = useState(2);

  useEffect(() => {
    const savedGridPreference = localStorage.getItem("community_grid_layout");
    if (savedGridPreference) {
      setGridColumns(parseInt(savedGridPreference));
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "中文" ? "EN" : "中文");
  };

  const toggleGridLayout = () => {
    const newLayout = gridColumns === 2 ? 1 : 2;
    setGridColumns(newLayout);
    localStorage.setItem("community_grid_layout", newLayout.toString());
  };

  const t = (zh, en) => language === "中文" ? zh : en;

  const filteredPosts = communityPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      (language === "中文" ? post.title : post.titleEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === "中文" ? post.username : post.usernameEn).toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter !== "all") {
      if (activeFilter === "food") matchesFilter = [1, 5, 8].includes(post.id);
      else if (activeFilter === "travel") matchesFilter = [2, 7].includes(post.id);
      else if (activeFilter === "hotel") matchesFilter = [3].includes(post.id);
      else if (activeFilter === "photo") matchesFilter = [4, 10].includes(post.id);
      else if (activeFilter === "sakura") matchesFilter = [9, 10].includes(post.id);
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={() => {}} onRegister={() => {}} language={language} />

      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 md:gap-4 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐 <span className="text-xs ml-1 hidden md:inline">{language}</span></button>
              <button onClick={() => setShowLoginModal(true)} className="text-sm text-blue-600 flex items-center gap-1">
                <span>👤</span> {t("登录/注册", "Login")}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header Section with Create Post Button AND Grid Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t("青云社区", "Qingyun Community")}</h1>
            <p className="text-gray-500 text-sm">{t("分享旅行故事，发现柳州之美", "Share travel stories, discover the beauty of Liuzhou")}</p>
          </div>
          <div className="flex gap-3">
            {/* Grid Toggle Button */}
            <button 
              onClick={toggleGridLayout}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition px-3 py-2 rounded-full border border-gray-300 hover:border-blue-600 bg-white"
            >
              {gridColumns === 2 ? (
                <>
                  <span>📋</span> {t("一列", "1 Col")}
                </>
              ) : (
                <>
                  <span>⊞</span> {t("两列", "2 Cols")}
                </>
              )}
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

        {/* Posts Grid - FIXED: 2 columns on all screens */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-400 text-lg">{t("暂无相关内容", "No content found")}</p>
            <p className="text-gray-300 text-sm mt-1">{t("试试其他搜索词或筛选条件", "Try other search terms or filters")}</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${gridColumns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {filteredPosts.map((post) => (
              <Link href={`/community/${post.id}`} key={post.id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <div className="relative aspect-square bg-gray-100">
                    <img 
                      src={post.images[0]} 
                      alt={language === "中文" ? post.title : post.titleEn}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://picsum.photos/id/104/400/400"; }}
                    />
                    {post.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                        📷 {post.images.length}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs">{post.avatar}</div>
                      <span className="text-xs text-gray-500 truncate">{language === "中文" ? post.username : post.usernameEn}</span>
                    </div>
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{language === "中文" ? post.title : post.titleEn}</h3>
                    <div className="flex gap-3 mt-2 text-gray-400 text-xs">
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