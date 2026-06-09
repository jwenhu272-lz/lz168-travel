"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  const [language, setLanguage] = useState("中文");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  // Hero Carousel Slides
  const heroSlides = [
    { id: 1, image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Carousel/carousel-1-city.jpeg", title: "秀美柳州·市井青云", titleEn: "Beautiful Liuzhou · Local Life", subtitle: "发现柳州 · 一站式本地旅游服务平台", subtitleEn: "Discover Liuzhou · One-stop Local Travel Platform", cta: "探索青云 →", ctaEn: "Explore Qingyun →", link: "https://www.liuzhou.gov.cn/" },
    { id: 2, image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Carousel/carousel-2-luosifen.jpeg", title: "青云美食节", titleEn: "Qingyun Food Festival", subtitle: "限时特惠 · 正宗柳州螺蛳粉", subtitleEn: "Limited Offer · Authentic Liuzhou Luosifen", cta: "立即尝鲜 →", ctaEn: "Try Now →", link: "/food" },
    { id: 3, image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Carousel/carousel-3-scenic.jpeg", title: "青云景区特惠", titleEn: "Qingyun Scenic Special", subtitle: "门票买一送一 · 限时抢购", subtitleEn: "Buy One Get One Free · Limited Time", cta: "查看详情 →", ctaEn: "View Details →", link: "/tour" },
    { id: 4, image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Carousel/carousel_1-secretspots.jpeg", title: "🔮 响水石林", titleEn: "🔮 Xiangshui Stone Forest", subtitle: "亿年地质奇观 · 宛如外星秘境", subtitleEn: "Billion-Year Wonder · An Alien Landscape", cta: "探索秘境 →", ctaEn: "Discover Secret →", link: "/tour/secret/stone-forest" },
    { id: 5, image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Carousel/carousel-5-secretspots2.jpeg", title: "🌾 柳州小阿勒泰", titleEn: "🌾 Liuzhou's Little Altay", subtitle: "山谷草原 · 孤树木屋 · 拍照圣地", subtitleEn: "Valley Grassland · A Photography Paradise", cta: "探索秘境 →", ctaEn: "Discover Secret →", link: "/tour/secret/little-altay" },
  ];

  // Community Posts - UPDATED with new image links
  const communityPosts = [
    { id: 1, username: "青云商户管家", usernameEn: "Qingyun Merchant", avatar: "🏨", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Boutique%20hotel%20room/community-post1-boutique-hotel-room-1.jpeg", title: "青云精品酒店限时特惠！", titleEn: "Hotel Limited Offer!", likes: 567, comments: 34, saves: 123 },
    { id: 2, username: "美食探店小分队", usernameEn: "Food Explorer Team", avatar: "🍲", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Dim%20sum%20morning%20tea/community-post2-dimsum-morning-tea-1.jpeg", title: "青云早茶文化体验", titleEn: "Morning Tea Experience", likes: 2341, comments: 167, saves: 543 },
    { id: 3, username: "柳州美食家", usernameEn: "Liuzhou Foodie", avatar: "🍜", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Luosifen%20food%20review/community-post3-luosifen-food-review-1.jpeg", title: "青云螺蛳粉探店！正宗柳州味", titleEn: "Qingyun Luosifen Review!", likes: 1289, comments: 89, saves: 345 },
    { id: 4, username: "螺蛳粉公主", usernameEn: "Luosifen Princess", avatar: "👸", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20close-up/community-post4-night-market-close-up-1.jpeg", title: "柳州夜市必吃清单🔥", titleEn: "Night Market Must-Eat🔥", likes: 1876, comments: 145, saves: 432 },
    { id: 5, username: "青云官方", usernameEn: "Qingyun Official", avatar: "🎫", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Night%20market%20scene/community-post4-night-market-scene-1.jpeg", title: "青云景区新活动来啦！", titleEn: "New Events at Qingyun!", likes: 987, comments: 56, saves: 234 },
    { id: 6, username: "旅游达人小周", usernameEn: "Travel Expert", avatar: "✈️", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Qingyun%20viewpoint/community-post6-qingyun-viewpoint-1.jpeg", title: "青云景区最美打卡点推荐", titleEn: "Best Photo Spots", likes: 2345, comments: 156, saves: 678 },
    { id: 7, username: "自驾游阿强", usernameEn: "Road Trip A Qiang", avatar: "🚗", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Scenic%20mountain%20road/community-post7-scenic-mountain-road-1.jpeg", title: "柳州周边自驾游路线推荐", titleEn: "Road Trip Routes", likes: 654, comments: 43, saves: 187 },
    { id: 8, username: "柳州摄影狮", usernameEn: "Liuzhou Photographer", avatar: "📷", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/Traditional%20architecture/community-post8-traditional-architecture-1.jpeg", title: "青云夜景绝美拍摄攻略", titleEn: "Night Photography Guide", likes: 3421, comments: 278, saves: 901 },
    { id: 9, username: "柳州文旅", usernameEn: "Liuzhou Culture & Tourism", avatar: "🌸", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_0808511a-cfbc-4517-92f5-b72bd891dc6c.jpeg", title: "🌸 柳州樱花季 · 春日限定浪漫", titleEn: "🌸 Liuzhou Sakura Season · Spring Limited Romance", likes: 3421, comments: 278, saves: 901 },
    { id: 10, username: "摄影小王子", usernameEn: "Photography Prince", avatar: "📸", image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Community/_133e5bd7-eb4e-4890-bb02-8cb90bce7869.jpeg", title: "樱花拍照秘籍｜柳州樱花季必看", titleEn: "Sakura Photography Secrets", likes: 2856, comments: 189, saves: 567 },
  ];

  const filteredPosts = communityPosts.filter(post => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const title = (language === "中文" ? post.title : post.titleEn).toLowerCase();
    const username = (language === "中文" ? post.username : post.usernameEn).toLowerCase();
    return title.includes(query) || username.includes(query);
  });

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");

  const handleFlightSearch = () => {
    if (origin && destination && departureDate) {
      window.location.href = `/results/flights?origin=${origin}&destination=${destination}&date=${departureDate}`;
    } else {
      alert(language === "中文" ? "请填写出发地、目的地和日期" : "Please fill in origin, destination and date");
    }
  };

  const handleTrainSearch = () => {
    if (origin && destination && departureDate) {
      window.location.href = `/results/trains?origin=${origin}&destination=${destination}&date=${departureDate}`;
    } else {
      alert(language === "中文" ? "请填写出发地、目的地和日期" : "Please fill in origin, destination and date");
    }
  };

  // Menu items
  const menuRow1 = [
    { id: "food", icon: "🍜", label: "美食", labelEn: "Food", link: "/food" },
    { id: "luosifen", icon: "🍲", label: "螺蛳粉", labelEn: "Luosifen", link: "/luosifen" },
    { id: "market", icon: "🏮", label: "青云市场", labelEn: "Qingyun Market", link: "/food/market" },
    { id: "secret", icon: "🔮", label: "小众秘境", labelEn: "Secret Spots", link: "/tour/secret" },
  ];

  const menuRow2 = [
    { id: "hotel", icon: "🏨", label: "酒店", labelEn: "Hotel", link: "/hotel" },
    { id: "tour", icon: "🏔️", label: "跟团游", labelEn: "Tours", link: "/tour" },
    { id: "flight", icon: "✈️", label: "机票", labelEn: "Flight", link: "/results/flights" },
    { id: "train", icon: "🚄", label: "火车票", labelEn: "Train", link: "/results/trains" },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", paddingBottom: "80px" }}>
      
      {/* Header with Logo */}
      <header style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flexShrink: 0 }}>
              <img 
                src="https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/logo.PNG" 
                alt="Lz108.com" 
                style={{ height: "110px", width: "auto", display: "block" }}
              />
            </div>
            <div style={{ display: "flex", gap: "20px", color: "#6b7280", flexShrink: 0 }}>
              {/* TODO: Connect message and notification icons to backend APIs when user system is ready */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontSize: "22px" }}>🔔</span>
                <span style={{ fontSize: "12px" }}>{language === "中文" ? "消息" : "Messages"}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontSize: "22px" }}>💬</span>
                <span style={{ fontSize: "12px" }}>{language === "中文" ? "客服" : "Support"}</span>
              </div>
              <Link href="/profile" style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", textDecoration: "none", color: "#6b7280" }}>
                <span style={{ fontSize: "22px" }}>👤</span>
                <span style={{ fontSize: "12px" }}>{language === "中文" ? "我的" : "Profile"}</span>
              </Link>
              <div onClick={toggleLanguage} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontSize: "22px" }}>🌐</span>
                <span style={{ fontSize: "12px" }}>{language}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2-Row Menu */}
      <div style={{ 
        backgroundColor: "white",
        borderBottom: "1px solid #d4af37",
        borderTop: "1px solid #d4af37",
        padding: "16px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "16px", textAlign: "center" }}>
            {menuRow1.map((item) => (
              <Link key={item.id} href={item.link} style={{ textDecoration: "none", padding: "12px 4px", display: "block", transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ fontSize: "32px", marginBottom: "6px" }}>{item.icon}</div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#C41E6B" }}>{language === "中文" ? item.label : item.labelEn}</div>
              </Link>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", textAlign: "center" }}>
            {menuRow2.map((item) => (
              <Link key={item.id} href={item.link} style={{ textDecoration: "none", padding: "12px 4px", display: "block", transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ fontSize: "32px", marginBottom: "6px" }}>{item.icon}</div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#C41E6B" }}>{language === "中文" ? item.label : item.labelEn}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "66.67%", overflow: "hidden" }}>
        {heroSlides.map((slide, idx) => (
          <div key={slide.id} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, transition: "opacity 0.5s", opacity: currentSlide === idx ? 1 : 0 }}>
            <img src={slide.image} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => e.target.src = "https://picsum.photos/id/104/1200/500"} />
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }}></div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", padding: "20px" }}>
              <div>
                <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: "0.5rem" }}>{language === "中文" ? slide.title : slide.titleEn}</h1>
                <p style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.2rem)", marginBottom: "1rem" }}>{language === "中文" ? slide.subtitle : slide.subtitleEn}</p>
                <Link href={slide.link} style={{ backgroundColor: "#0052CC", color: "white", padding: "8px 24px", borderRadius: "999px", textDecoration: "none", display: "inline-block", fontSize: "clamp(0.75rem, 2vw, 1rem)" }}>{language === "中文" ? slide.cta : slide.ctaEn}</Link>
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.5)", color: "white", border: "none", width: "40px", height: "40px", borderRadius: "999px", cursor: "pointer", zIndex: 20 }}>◀</button>
        <button onClick={nextSlide} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.5)", color: "white", border: "none", width: "40px", height: "40px", borderRadius: "999px", cursor: "pointer", zIndex: 20 }}>▶</button>
        <div style={{ position: "absolute", bottom: "16px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "8px", zIndex: 20 }}>
          {heroSlides.map((_, idx) => (<button key={idx} onClick={() => goToSlide(idx)} style={{ width: "8px", height: "8px", borderRadius: "999px", border: "none", backgroundColor: currentSlide === idx ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer" }} />))}
        </div>
      </div>

      {/* Flight & Train Search */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#1f2937" }}>{language === "中文" ? "✈️ 机票 / 火车票搜索" : "✈️ Flight / Train Search"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "16px" }}>
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder={language === "中文" ? "出发地 (例: 柳州)" : "From (e.g., Liuzhou)"} style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }} />
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder={language === "中文" ? "目的地 (例: 桂林)" : "To (e.g., Guilin)"} style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }} />
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }} />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={handleFlightSearch} style={{ flex: 1, backgroundColor: "#0052CC", color: "white", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "500", cursor: "pointer" }}>✈️ {language === "中文" ? "搜索机票" : "Search Flights"}</button>
            <button onClick={handleTrainSearch} style={{ flex: 1, backgroundColor: "#10B981", color: "white", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "500", cursor: "pointer" }}>🚄 {language === "中文" ? "搜索火车票" : "Search Trains"}</button>
          </div>
        </div>
      </div>

      {/* Partners Section - Quick Actions removed */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          <Link href="/luosifen" style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🍜</div>
            <div style={{ fontWeight: "500" }}>{language === "中文" ? "青云螺蛳粉" : "Qingyun Luosifen"}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{language === "中文" ? "评分 4.9" : "Rating 4.9"}</div>
          </Link>
          <Link href="/hotel" style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏨</div>
            <div style={{ fontWeight: "500" }}>{language === "中文" ? "青云精品酒店" : "Qingyun Boutique Hotel"}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{language === "中文" ? "距景区 100m" : "100m from area"}</div>
          </Link>
          <Link href="/tour" style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🚗</div>
            <div style={{ fontWeight: "500" }}>{language === "中文" ? "柳州租车" : "Liuzhou Car Rental"}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{language === "中文" ? "青云接驳" : "Qingyun Shuttle"}</div>
          </Link>
          <Link href="/tour/secret" style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎫</div>
            <div style={{ fontWeight: "500" }}>{language === "中文" ? "青云景区" : "Qingyun Scenic Area"}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{language === "中文" ? "官方售票" : "Official Tickets"}</div>
          </Link>
        </div>
      </div>

      {/* Community Search */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: "12px", backgroundColor: "white", padding: "8px 16px", borderRadius: "999px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={language === "中文" ? "搜索社区内容..." : "Search community..."} style={{ flex: 1, border: "none", outline: "none", padding: "8px 0", fontSize: "14px" }} />
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>🔍</button>
        </div>
      </div>

      {/* Community Posts */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937" }}>{language === "中文" ? "✨ 青云社区 · 热门分享" : "✨ Qingyun Community · Popular Posts"}</h2>
          <Link href="/community">
            <button style={{ color: "#0052CC", fontSize: "14px", fontWeight: "500", background: "none", border: "none", cursor: "pointer" }}>
              {language === "中文" ? "更多动态 →" : "More →"}
            </button>
          </Link>
        </div>
        {filteredPosts.length === 0 ? (<div style={{ textAlign: "center", padding: "40px", backgroundColor: "white", borderRadius: "12px" }}><p>{language === "中文" ? "没有找到相关帖子" : "No posts found"}</p></div>) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {filteredPosts.slice(0, 6).map((post) => (
              <Link href={`/community/${post.id}`} key={post.id} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"; }}>
                  <div style={{ height: "192px", backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <div style={{ width: "32px", height: "32px", backgroundColor: "#e5e7eb", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "18px" }}>{post.avatar}</span></div>
                      <div><p style={{ fontWeight: "500", fontSize: "14px", margin: 0 }}>{language === "中文" ? post.username : post.usernameEn}</p><p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>2 {language === "中文" ? "小时前" : "hours ago"}</p></div>
                    </div>
                    <p style={{ fontWeight: "500", color: "#1f2937", marginBottom: "8px" }}>{language === "中文" ? post.title : post.titleEn}</p>
                    <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#6b7280" }}><span>❤️ {post.likes}</span><span>💬 {post.comments}</span><span>⭐ {post.saves}</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link href="/community">
            <button style={{ border: "1px solid #d1d5db", backgroundColor: "white", padding: "8px 32px", borderRadius: "999px", fontSize: "14px", cursor: "pointer" }}>
              {language === "中文" ? "加载更多" : "Load More"}
            </button>
          </Link>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      <BottomNav language={language} />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </main>
  );
}