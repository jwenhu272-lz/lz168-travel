"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// IMPORTANT: Same order as page.tsx - id must match exactly
const communityPosts = [
  {
    id: 1,
    username: "柳州美食家",
    avatar: "🍜",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Luosifen%20food%20review/community-post3-luosifen-food-review-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Luosifen%20food%20review/community-post3-luosifen-food-review-2.jpeg",
    ],
    title: "青云螺蛳粉探店！正宗柳州味",
    description: "今天来打卡青云螺蛳粉总店！汤底浓郁，配料丰富，酸笋超正宗！",
    location: "青云螺蛳粉总店",
    tags: ["螺蛳粉", "青云美食"],
    likes: 1289,
    comments: 89,
    saves: 345,
    shares: 56,
    timeAgo: "2小时前",
    userBio: "柳州本地美食博主",
    followers: 1234,
  },
  {
    id: 2,
    username: "旅游达人小周",
    avatar: "✈️",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Qingyun%20viewpoint/community-post6-qingyun-viewpoint-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Qingyun%20viewpoint/community-post6-qingyun-viewpoint-2.jpeg",
    ],
    title: "青云景区最美打卡点推荐",
    description: "青云景区这些机位拍照绝美！建议大家早上或傍晚来，光线最好～",
    location: "青云景区",
    tags: ["青云景区", "打卡"],
    likes: 2345,
    comments: 156,
    saves: 678,
    shares: 123,
    timeAgo: "5小时前",
    userBio: "旅游达人",
    followers: 2345,
  },
  {
    id: 3,
    username: "青云商户管家",
    avatar: "🏨",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Boutique%20hotel%20room/community-post1-boutique-hotel-room-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Boutique%20hotel%20room/community-post1-boutique-hotel-room-2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Boutique%20hotel%20room/community-post1-boutique-hotel-room-3.jpeg",
    ],
    title: "青云精品酒店限时特惠！",
    description: "国庆期间特惠活动来袭！入住青云精品酒店享受8折优惠，还有免费早餐～",
    location: "青云精品酒店",
    tags: ["酒店优惠", "青云住宿"],
    likes: 567,
    comments: 34,
    saves: 123,
    shares: 45,
    timeAgo: "1天前",
    userBio: "青云精品酒店官方",
    followers: 3456,
  },
  {
    id: 4,
    username: "柳州摄影狮",
    avatar: "📷",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Traditional%20architecture/community-post8-traditional-architecture-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Traditional%20architecture/community-post8-traditional-architecture-2.jpeg",
    ],
    title: "青云夜景绝美拍摄攻略",
    description: "青云夜景拍摄心得分享，最佳机位和拍摄时间推荐！",
    location: "青云观景台",
    tags: ["摄影", "夜景"],
    likes: 3421,
    comments: 278,
    saves: 901,
    shares: 234,
    timeAgo: "3小时前",
    userBio: "摄影爱好者",
    followers: 5678,
  },
  {
    id: 5,
    username: "螺蛳粉公主",
    avatar: "👸",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20close-up/community-post4-night-market-close-up-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20close-up/community-post4-night-market-close-up-2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20scene/community-post4-night-market-scene-1.jpeg",
    ],
    title: "柳州夜市必吃清单🔥",
    description: "青云夜市必吃美食推荐！烤串、炒螺、甜品一网打尽！",
    location: "青云夜市",
    tags: ["夜市", "美食攻略"],
    likes: 1876,
    comments: 145,
    saves: 432,
    shares: 89,
    timeAgo: "6小时前",
    userBio: "美食探店达人",
    followers: 2345,
  },
  {
    id: 6,
    username: "青云官方",
    avatar: "🎫",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20scene/community-post4-night-market-scene-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Hotel/_bf211f3a-b9a4-4123-9940-449109c059ac.jpeg"
    ],
    description: "青云景区推出秋季特别活动，门票优惠+文化表演，快来参与！",
    location: "青云景区",
    tags: ["官方活动", "青云景区"],
    likes: 987,
    comments: 56,
    saves: 234,
    shares: 78,
    timeAgo: "1天前",
    userBio: "青云景区官方",
    followers: 7890,
  },
  {
    id: 7,
    username: "自驾游阿强",
    avatar: "🚗",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Scenic%20mountain%20road/community-post7-scenic-mountain-road-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Scenic%20mountain%20road/community-post7-scenic-mountain-road-2.jpeg",
    ],
    title: "柳州周边自驾游路线推荐",
    description: "柳州周边最美自驾路线，周末说走就走！",
    location: "柳州周边",
    tags: ["自驾游", "周边"],
    likes: 654,
    comments: 43,
    saves: 187,
    shares: 56,
    timeAgo: "8小时前",
    userBio: "自驾游爱好者",
    followers: 1234,
  },
  {
    id: 8,
    username: "美食探店小分队",
    avatar: "🍲",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Dim%20sum%20morning%20tea/community-post2-dimsum-morning-tea-1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Dim%20sum%20morning%20tea/comunity-post2-dimsum-morning-tea-2.jpeg",
    ],
    title: "青云早茶文化体验",
    description: "体验地道的青云早茶文化，一盅两件，悠然自得～",
    location: "青云茶楼",
    tags: ["早茶", "文化体验"],
    likes: 2341,
    comments: 167,
    saves: 543,
    shares: 123,
    timeAgo: "4小时前",
    userBio: "美食探店",
    followers: 3456,
  },
  {
    id: 9,
    username: "柳州文旅",
    avatar: "🌸",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_0808511a-cfbc-4517-92f5-b72bd891dc6c.jpeg",
    ],
    title: "🌸 柳州樱花季 · 春日限定浪漫",
    description: "每年4-5月，柳州变身粉色海洋！青云湖畔樱花盛开，漫步花海。",
    location: "青云湖畔",
    tags: ["樱花季", "柳州"],
    likes: 3421,
    comments: 278,
    saves: 901,
    shares: 234,
    timeAgo: "3天前",
    userBio: "柳州文旅官方",
    followers: 12345,
  },
  {
    id: 10,
    username: "摄影小王子",
    avatar: "📸",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_133e5bd7-eb4e-4890-bb02-8cb90bce7869.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_31d18252-1d29-4c8b-b430-a3d10f229d57.jpeg",
    ],
    title: "樱花拍照秘籍｜柳州樱花季必看",
    description: "分享6个樱花拍照姿势和最佳拍摄时间！清晨和傍晚光线最美。",
    location: "青云公园",
    tags: ["摄影技巧", "樱花"],
    likes: 2856,
    comments: 189,
    saves: 567,
    shares: 98,
    timeAgo: "2天前",
    userBio: "独立摄影师",
    followers: 5678,
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
      setComments([
        { id: 1, username: "小吃货", avatar: "🍰", content: "看起来太棒了！", timeAgo: "1小时前", likes: 12 },
        { id: 2, username: "旅行爱好者", avatar: "✈️", content: "好想去！", timeAgo: "2小时前", likes: 8 },
      ]);
    }
    const savedPosts = JSON.parse(localStorage.getItem("saved_posts") || "[]");
    setIsSaved(savedPosts.includes(postId));
    const savedGrid = localStorage.getItem("related_posts_grid_layout");
    if (savedGrid) setGridColumns(parseInt(savedGrid));
  }, [post, postId]);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link href="/community" className="text-blue-600 mt-4 inline-block">← Back</Link>
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
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  const toggleGridLayout = () => {
    const newLayout = gridColumns === 2 ? 1 : 2;
    setGridColumns(newLayout);
    localStorage.setItem("related_posts_grid_layout", newLayout.toString());
  };

  const handleLike = () => {
    if (!user) { showNotification("请先登录"); setShowLoginModal(true); return; }
    if (isLiked) { setLikesCount(likesCount - 1); setIsLiked(false); showNotification("已取消点赞"); }
    else { setLikesCount(likesCount + 1); setIsLiked(true); showNotification("点赞成功"); }
  };

  const handleSave = () => {
    if (!user) { showNotification("请先登录"); setShowLoginModal(true); return; }
    const savedPosts = JSON.parse(localStorage.getItem("saved_posts") || "[]");
    if (isSaved) {
      const newSaved = savedPosts.filter(id => id !== postId);
      localStorage.setItem("saved_posts", JSON.stringify(newSaved));
      setIsSaved(false); setSavesCount(savesCount - 1);
      showNotification("已取消收藏");
    } else {
      savedPosts.push(postId);
      localStorage.setItem("saved_posts", JSON.stringify(savedPosts));
      setIsSaved(true); setSavesCount(savesCount + 1);
      showNotification("收藏成功");
    }
  };

  const handleShare = () => showNotification("分享链接已复制到剪贴板");
  const handleComment = () => {
    if (!user) { showNotification("请先登录"); setShowLoginModal(true); return; }
    if (!commentText.trim()) { showNotification("请输入评论内容"); return; }
    const newComment = { id: comments.length + 1, username: user.name || "用户", avatar: "👤", content: commentText, timeAgo: "刚刚", likes: 0 };
    setComments([newComment, ...comments]);
    setCommentText("");
    showNotification("评论成功");
  };

  const t = (zh, en) => language === "中文" ? zh : en;

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {showToast && <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm">{toastMessage}</div>}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={login} onRegister={register} language={language} />

      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐</button>
              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-lg">👤</span>
                    <span className="text-sm">{user.name?.split(' ')[0]}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">👤 {t("个人主页", "Profile")}</Link>
                      <button onClick={() => { logout(); setShowUserMenu(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600">🚪 {t("退出", "Logout")}</button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setShowLoginModal(true)} className="text-sm text-blue-600">👤 {t("登录", "Login")}</button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Link href="/community" className="text-blue-600 mb-4 inline-block">
          ← {t("返回社区", "Back to Community")}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-96 bg-gray-100">
            <img 
              src={post.images[currentImageIndex]} 
              alt="" 
              className="w-full h-full object-cover" 
              onError={() => setImageErrors(prev => ({ ...prev, [currentImageIndex]: true }))} 
            />
            {post.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full">◀</button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full">▶</button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {post.images.map((_, idx) => (
                    <div key={idx} className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === idx ? "bg-white" : "bg-white bg-opacity-50"}`} />
                  ))}
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  📷 {currentImageIndex + 1} / {post.images.length}
                </div>
              </>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500">⭐ {post.rating || 4.8}</span>
              <span className="text-gray-400">({post.likes} {t("点赞", "likes")})</span>
            </div>
            <p className="text-gray-600 mt-3">{post.description}</p>
            <p className="text-sm text-gray-500 mt-2">📍 {post.location}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, idx) => <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">#{tag}</span>)}
            </div>
          </div>

          <div className="flex justify-around p-4 border-t">
            <button onClick={handleLike} className={`flex flex-col items-center ${isLiked ? "text-red-500" : "text-gray-500"}`}>
              <span className="text-2xl">{isLiked ? "❤️" : "🤍"}</span>
              <span className="text-xs">{likesCount}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center text-gray-500">
              <span className="text-2xl">💬</span>
              <span className="text-xs">{comments.length}</span>
            </button>
            <button onClick={handleShare} className="flex flex-col items-center text-gray-500">
              <span className="text-2xl">📤</span>
              <span className="text-xs">{post.shares}</span>
            </button>
            <button onClick={handleSave} className={`flex flex-col items-center ${isSaved ? "text-yellow-500" : "text-gray-500"}`}>
              <span className="text-2xl">{isSaved ? "⭐" : "☆"}</span>
              <span className="text-xs">{savesCount}</span>
            </button>
          </div>

          {showComments && (
            <div className="p-4 border-t">
              <div className="flex gap-2 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">{user?.avatar || "👤"}</div>
                <div className="flex-1">
                  <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={t("写下评论...", "Write a comment...")} rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <button onClick={handleComment} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">{t("发布", "Post")}</button>
                </div>
              </div>
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-2 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">{comment.avatar}</div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-2">
                    <p className="font-medium text-sm">{comment.username}</p>
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{comment.timeAgo} ❤️ {comment.likes}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">{t("更多精彩", "More")}</h2>
            <button onClick={toggleGridLayout} className="text-sm text-gray-500 border rounded-full px-3 py-1">
              {gridColumns === 2 ? t("一列", "1 Col") : t("两列", "2 Cols")}
            </button>
          </div>
          <div className={`grid gap-3 ${gridColumns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {communityPosts.filter(p => p.id !== postId).slice(0, 4).map(related => (
              <Link key={related.id} href={`/community/${related.id}`} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${related.images[0]})` }}></div>
                <div className="p-2">
                  <p className="text-xs font-medium">{related.title}</p>
                  <div className="flex gap-2 text-xs text-gray-400 mt-1">❤️ {related.likes} 💬 {related.comments}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AIChatbot language={language} />
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