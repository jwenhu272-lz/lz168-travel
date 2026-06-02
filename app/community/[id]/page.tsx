"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// COMPLETE community posts data - ALL 10 POSTS
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

function CommunityDetailPage() {
  const { user, login, register, logout } = useAuth();
  const params = useParams();
  const postId = parseInt(params.id);
  const [language, setLanguage] = useState("中文");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [savesCount, setSavesCount] = useState(0);
  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [gridColumns, setGridColumns] = useState(2);

  const post = communityPosts.find(p => p.id === postId);

  useEffect(() => {
    if (post) {
      setLikesCount(post.likes);
      setSavesCount(post.saves);
      const mockComments = [
        { id: 1, username: "小吃货", avatar: "🍰", content: "看起来太棒了！", contentEn: "Looks amazing!", timeAgo: "1小时前", likes: 12 },
        { id: 2, username: "旅行爱好者", avatar: "✈️", content: "好想去！", contentEn: "Want to go!", timeAgo: "2小时前", likes: 8 },
        { id: 3, username: "柳州土著", avatar: "🏠", content: "这家确实不错", contentEn: "This place is really good", timeAgo: "3小时前", likes: 5 },
      ];
      setComments(mockComments);
      
      const savedGridPreference = localStorage.getItem("related_posts_grid_layout");
      if (savedGridPreference) {
        setGridColumns(parseInt(savedGridPreference));
      }
    }
    const savedPosts = JSON.parse(localStorage.getItem("saved_posts") || "[]");
    setIsSaved(savedPosts.includes(postId));
  }, [post, postId]);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
          <Link href="/community" className="text-blue-600 mt-4 inline-block">← Back to Community</Link>
        </div>
      </main>
    );
  }

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => {
    setLanguage(language === "中文" ? "EN" : "中文");
  };

  const handleImageError = (idx) => {
    setImageErrors(prev => ({ ...prev, [idx]: true }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  const handleLike = () => {
    if (!user) {
      showNotification("请先登录");
      setShowLoginModal(true);
      return;
    }
    if (isLiked) {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
      showNotification("已取消点赞");
    } else {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
      showNotification("点赞成功");
    }
  };

  const handleSave = () => {
    if (!user) {
      showNotification("请先登录");
      setShowLoginModal(true);
      return;
    }
    const savedPosts = JSON.parse(localStorage.getItem("saved_posts") || "[]");
    if (isSaved) {
      const newSaved = savedPosts.filter(id => id !== postId);
      localStorage.setItem("saved_posts", JSON.stringify(newSaved));
      setIsSaved(false);
      setSavesCount(savesCount - 1);
      showNotification("已取消收藏");
    } else {
      savedPosts.push(postId);
      localStorage.setItem("saved_posts", JSON.stringify(savedPosts));
      setIsSaved(true);
      setSavesCount(savesCount + 1);
      showNotification("收藏成功");
    }
  };

  const handleShare = () => {
    showNotification("分享链接已复制到剪贴板");
  };

  const handleComment = () => {
    if (!user) {
      showNotification("请先登录");
      setShowLoginModal(true);
      return;
    }
    if (!commentText.trim()) {
      showNotification("请输入评论内容");
      return;
    }
    const newComment = {
      id: comments.length + 1,
      username: user.name || "用户",
      avatar: "👤",
      content: commentText,
      contentEn: commentText,
      timeAgo: "刚刚",
      likes: 0,
    };
    setComments([newComment, ...comments]);
    setCommentText("");
    showNotification("评论成功");
  };

  const toggleGridLayout = () => {
    const newLayout = gridColumns === 2 ? 1 : 2;
    setGridColumns(newLayout);
    localStorage.setItem("related_posts_grid_layout", newLayout.toString());
    showNotification(newLayout === 2 ? "切换为两列视图" : "切换为一列视图");
  };

  const t = (zh, en) => language === "中文" ? zh : en;

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      
      {showToast && (<div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-fade-in-out">{toastMessage}</div>)}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={login} onRegister={register} language={language} />

      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 md:gap-4 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐 <span className="text-xs ml-1 hidden md:inline">{language}</span></button>
              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition"><span className="text-lg">👤</span><span className="text-sm font-medium hidden md:inline">{user.name?.split(' ')[0] || user.name}</span></button>
                  {showUserMenu && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50"><div className="px-4 py-3 border-b"><p className="font-medium">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div><Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setShowUserMenu(false)}>👤 {t("个人主页", "Profile")}</Link><Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setShowUserMenu(false)}>📋 {t("我的订单", "My Orders")}</Link><button onClick={() => { logout(); setShowUserMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">🚪 {t("退出登录", "Logout")}</button></div>)}
                </div>
              ) : (<button onClick={() => setShowLoginModal(true)} className="text-sm text-blue-600 flex items-center gap-1"><span>👤</span> {t("登录/注册", "Login")}</button>)}
              <Link href="/profile" className="text-xl hover:text-blue-600 hidden md:inline">👤</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Link href="/community" className="text-blue-600 mb-4 inline-block">← {t("返回社区", "Back to Community")}</Link>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative h-96 bg-gray-100">
              {!imageErrors[currentImageIndex] && post.images[currentImageIndex] ? (
                <img src={post.images[currentImageIndex]} alt="" className="w-full h-full object-cover" onError={() => handleImageError(currentImageIndex)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">{post.avatar}</div>
              )}
              {post.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center z-10">◀</button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center z-10">▶</button>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {post.images.map((_, idx) => (<div key={idx} className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === idx ? "bg-white" : "bg-white bg-opacity-50"}`} />))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">{post.avatar}</div>
              <div>
                <p className="font-bold">{language === "中文" ? post.username : post.usernameEn}</p>
                <p className="text-xs text-gray-400">{post.timeAgo}</p>
              </div>
            </div>
            <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded-full text-sm hover:bg-blue-50">{t("关注", "Follow")}</button>
          </div>

          {/* User Bio */}
          <div className="px-4 py-2 text-sm text-gray-500 border-b">
            <span>{language === "中文" ? post.userBio : post.userBioEn}</span>
            <span className="ml-3 text-xs">📊 {post.followers} {t("粉丝", "followers")}</span>
          </div>

          {/* Post Title & Description */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold mb-2">{language === "中文" ? post.title : post.titleEn}</h1>
            <p className="text-gray-700 mb-3">{language === "中文" ? post.description : post.descriptionEn}</p>
            <p className="text-sm text-gray-500">📍 {language === "中文" ? post.location : post.locationEn}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {(language === "中文" ? post.tags : post.tagsEn).map((tag, idx) => (<span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">#{tag}</span>))}
            </div>
          </div>

          {/* Engagement Bar */}
          <div className="flex justify-around p-4 border-b">
            <button onClick={handleLike} className={`flex flex-col items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}>
              <span className="text-2xl">{isLiked ? "❤️" : "🤍"}</span>
              <span className="text-xs">{likesCount}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center gap-1 text-gray-500">
              <span className="text-2xl">💬</span>
              <span className="text-xs">{comments.length}</span>
            </button>
            <button onClick={handleShare} className="flex flex-col items-center gap-1 text-gray-500">
              <span className="text-2xl">📤</span>
              <span className="text-xs">{post.shares}</span>
            </button>
            <button onClick={handleSave} className={`flex flex-col items-center gap-1 ${isSaved ? "text-yellow-500" : "text-gray-500"}`}>
              <span className="text-2xl">{isSaved ? "⭐" : "☆"}</span>
              <span className="text-xs">{savesCount}</span>
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="p-4">
              <h3 className="font-bold mb-3">{t("评论", "Comments")} ({comments.length})</h3>
              
              <div className="flex gap-2 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">{user?.avatar || "👤"}</div>
                <div className="flex-1">
                  <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={t("写下你的评论...", "Write a comment...")} rows={2} className="w-full border rounded-lg px-3 py-2 text-sm resize-none" />
                  <button onClick={handleComment} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">{t("发布", "Post")}</button>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">{comment.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{comment.username}</p>
                      <p className="text-sm text-gray-700">{language === "中文" ? comment.content : comment.contentEn}</p>
                      <div className="flex gap-3 mt-1 text-xs text-gray-400">
                        <span>{comment.timeAgo}</span>
                        <button className="hover:text-blue-600">{t("回复", "Reply")}</button>
                        <button className="hover:text-red-500">❤️ {comment.likes}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-center text-blue-600 text-sm py-2 border-t">{t("加载更多评论", "Load more comments")}</button>
            </div>
          )}
        </div>

        {/* Related Posts Section with Grid Toggle */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">{t("更多精彩内容", "More精彩内容")}</h2>
            <button 
              onClick={toggleGridLayout}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition px-3 py-1 rounded-full border border-gray-300 hover:border-blue-600 bg-white"
            >
              {gridColumns === 2 ? (
                <>
                  <span>⊞</span> {t("一列", "1 Col")}
                </>
              ) : (
                <>
                  <span>📋</span> {t("两列", "2 Cols")}
                </>
              )}
            </button>
          </div>
          
          <div className={`grid gap-3 ${gridColumns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
            {communityPosts.filter(p => p.id !== postId).slice(0, 4).map(related => (
              <Link key={related.id} href={`/community/${related.id}`} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className={`${gridColumns === 2 ? "h-32" : "h-48"} bg-cover bg-center`} style={{ backgroundImage: `url(${related.images[0]})` }}></div>
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-2">{language === "中文" ? related.title : related.titleEn}</p>
                  <div className="flex gap-2 mt-1 text-xs text-gray-400">❤️ {related.likes} 💬 {related.comments}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </main>
  );
}

export default function CommunityDetailWrapper() {
  return (
    <AuthProvider>
      <CommunityDetailPage />
    </AuthProvider>
  );
}