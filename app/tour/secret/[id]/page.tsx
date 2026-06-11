"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";

// Complete Secret Spots Data - ALL 8 Spots with HIGH-RES IMAGES
const secretSpots = [
  {
    id: "firewood-kitchen",
    name: "Grandpa's Firewood Kitchen",
    nameZh: "阿公柴火厨房",
    category: "food",
    categoryZh: "美食秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa10.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa11.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa12.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa13.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa14.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa15.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa16.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa17.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa18.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa4.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa6.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa7.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/grandpa8.jpeg",
    ],
    description: "An off-road village kitchen run by an old couple. Firewood stacked high, chickens running free, ducks in a pond, and a friendly Labrador welcoming guests. They cook with a traditional clay stove using firewood.",
    descriptionZh: "一个由老夫妻经营的村舍厨房。高高的柴火堆，自由奔跑的鸡鸭，池塘里的鸭子，还有一只友善的拉布拉多犬迎接客人。他们用传统的土灶柴火烹饪。",
    howToFind: "Drive off the main road along Liujiang River. Follow the uphill path to a small clean village. Look for the tall stack of firewood at the entrance.",
    howToFindZh: "沿着柳江旁的主路驶入岔道。沿着上坡路到一个干净的小村庄。寻找入口处高高的柴火堆。",
    insiderTips: ["Cash only", "No menu", "Pet the Labrador", "Best before noon"],
    insiderTipsZh: ["只收现金", "没有菜单", "摸摸拉布拉多", "最好中午前到达"],
    bestTime: "11:00 AM - 2:00 PM",
    bestSeason: "Year-round",
    rating: 4.9,
    reviews: 128,
    nearbySpots: ["secret-balcony", "huilongshan-sunset"],
    packages: [
      { name: "Firewood Kitchen Half-Day Tour", nameZh: "柴火厨房半日游", price: 188, duration: "Half day", includes: "Hotel transfer + Meal + Guide" },
    ],
  },
  {
    id: "secret-balcony",
    name: "The Secret Balcony",
    nameZh: "秘密阳台",
    category: "food",
    categoryZh: "美食秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment11.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment-9.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment11.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment16.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment18.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment19.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment4.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment6.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment7.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment88.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment9.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/apartment8.jpeg",
    ],
    description: "An unmarked 11th-floor apartment where a family serves home-cooked meals. The balcony overlooks the Liujiang River. Reservation only.",
    descriptionZh: "一个位于11楼的隐秘公寓，一家人在这里提供家常菜。阳台俯瞰柳江。需要预约。",
    howToFind: "Located in a residential building along Liujiang River. Exact address provided upon reservation.",
    howToFindZh: "位于柳江沿岸的居民楼内。具体地址预约后提供。",
    insiderTips: ["Reservation required", "Family-style dishes", "Try the braised fish", "Best at sunset"],
    insiderTipsZh: ["需要预约", "家庭式菜肴", "尝试红烧鱼", "日落时分最美"],
    bestTime: "Evening",
    bestSeason: "Year-round",
    rating: 4.8,
    reviews: 89,
    nearbySpots: ["firewood-kitchen", "huilongshan-sunset"],
    packages: [
      { name: "Secret Balcony Dining Experience", nameZh: "秘密阳台用餐体验", price: 128, duration: "1-2 hours", includes: "Reservation + Home-cooked meal" },
    ],
  },
  {
    id: "dim-sum-courtyard",
    name: "Hidden Dim Sum Courtyard",
    nameZh: "隐秘点心庭院",
    category: "food",
    categoryZh: "美食秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard13.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard15.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard4.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/courtyard8.jpeg",
    ],
    description: "A courtyard dim sum restaurant tucked inside Longtan Park. Always packed with locals. Handmade dim sum served fresh.",
    descriptionZh: "隐藏在龙潭公园内的庭院点心餐厅。总是坐满本地人。新鲜手工制作的点心。",
    howToFind: "Enter Longtan Park from East Gate. Walk past Wind and Rain Bridge. Look for bamboo grove on left.",
    howToFindZh: "从东门进入龙潭公园。走过风雨桥。在左边寻找竹林。",
    insiderTips: ["Arrive before 9 AM", "Must-order: Oil tea, char siu bao", "Cash only"],
    insiderTipsZh: ["早上9点前到", "必点：油茶、叉烧包", "只收现金"],
    bestTime: "Morning (8-10 AM)",
    bestSeason: "Year-round",
    rating: 4.7,
    reviews: 234,
    nearbySpots: [],
    packages: [
      { name: "Dim Sum + Park Walk", nameZh: "点心 + 公园漫步", price: 88, duration: "1-2 hours", includes: "Dim sum meal" },
    ],
  },
  {
    id: "little-altay",
    name: "Liuzhou's Little Altay",
    nameZh: "柳州小阿勒泰",
    category: "nature",
    categoryZh: "自然秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/altay1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/altay5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/altay3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/altay4.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/altay5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/altay3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/altay4.jpeg",
    ],
    description: "A valley grassland with grazing cattle, a solitary tree, and a wooden cabin. Perfect for photography and picnics.",
    descriptionZh: "一个山谷草原，有放牧的牛群、一棵孤树和一间木屋。非常适合摄影和野餐。",
    howToFind: "Located in Luzhai County. Drive to valley entrance, park roadside, 15-min walk.",
    howToFindZh: "位于鹿寨县。开车到山谷入口，路边停车，步行15分钟。",
    insiderTips: ["Best for golden hour photography", "Bring picnic supplies", "No facilities"],
    insiderTipsZh: ["黄金时段最适合摄影", "自带野餐用品", "没有设施"],
    bestTime: "Sunrise or sunset",
    bestSeason: "Spring, Autumn",
    rating: 4.9,
    reviews: 56,
    nearbySpots: ["stone-forest"],
    packages: [
      { name: "Little Altay Photography Tour", nameZh: "小阿勒泰摄影之旅", price: 98, duration: "Half day", includes: "Transportation + Photo guide" },
    ],
  },
  {
    id: "stone-forest",
    name: "Xiangshui Stone Forest",
    nameZh: "响水石林",
    category: "nature",
    categoryZh: "自然秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone4.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone6.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone7.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone8.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangshui-stone88.jpeg",
    ],
    description: "A billion-year-old stone forest of black iron-ore rocks. Looks like an alien landscape. Free entry.",
    descriptionZh: "亿万年形成的黑色铁矿石林。看起来像外星景观。免费进入。",
    howToFind: "Located in Luzhai County. Follow the road signs to Xiangshui Stone Forest. Free parking available.",
    howToFindZh: "位于鹿寨县。跟随路标前往响水石林。有免费停车。",
    insiderTips: ["Wear comfortable hiking shoes", "Best for unique landscape photos", "No food vendors on site"],
    insiderTipsZh: ["穿舒适的徒步鞋", "最适合拍摄独特景观", "现场没有食品 vendors"],
    bestTime: "Morning or late afternoon",
    bestSeason: "Autumn, Winter",
    rating: 4.8,
    reviews: 78,
    nearbySpots: ["little-altay"],
    packages: [
      { name: "Stone Forest Explorer", nameZh: "石林探险之旅", price: 68, duration: "2-3 hours", includes: "Guided tour + Transportation" },
    ],
  },
  {
    id: "huilongshan-sunset",
    name: "Huilongshan Park Sunset",
    nameZh: "回龙山日落",
    category: "photo",
    categoryZh: "摄影秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/sunset1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/sunset2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/sunset3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/sunset4.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/sunset5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/tour-heritage1.jpeg",
    ],
    description: "The best sunset view overlooking Yaobu Ancient Town and the Liujiang River. A quiet park away from crowds.",
    descriptionZh: "俯瞰窑埠古镇和柳江的最佳日落景观。远离人群的宁静公园。",
    howToFind: "Near Yaobu Ancient Town. Follow the path up Huilongshan hill. The viewpoint is at the top.",
    howToFindZh: "靠近窑埠古镇。沿着小路上回龙山。观景台在山顶。",
    insiderTips: ["Arrive 30 min before sunset", "Bring a tripod for photos", "Check weather forecast first"],
    insiderTipsZh: ["日落前30分钟到达", "带三脚架拍照", "先查看天气预报"],
    bestTime: "Sunset (5:00-7:00 PM depending on season)",
    bestSeason: "Year-round",
    rating: 4.9,
    reviews: 112,
    nearbySpots: ["secret-balcony", "dim-sum-courtyard"],
    packages: [
      { name: "Sunset Photography Tour", nameZh: "日落摄影之旅", price: 78, duration: "1-2 hours", includes: "Photo guide + Hot tea" },
    ],
  },
  {
    id: "bailian-cave",
    name: "Bailian Cave Museum",
    nameZh: "白莲洞洞穴博物馆",
    category: "cultural",
    categoryZh: "文化秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/bailian-cave1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/bailian-cave2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/bailian-cave3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/bailian-cave4.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/bailian-cave2.jpeg",
    ],
    description: "A science museum inside a real cave! Features life-sized dinosaur models amidst the karst mountains.",
    descriptionZh: "一个建在真正洞穴内的科学博物馆！在喀斯特山脉中设有真人大小的恐龙模型。",
    howToFind: "Located in Liuzhou City. Take bus route 21 or taxi to Bailian Cave. Easy to find with GPS.",
    howToFindZh: "位于柳州市内。乘坐21路公交车或打车前往白莲洞。GPS可以轻松找到。",
    insiderTips: ["Allow 2-3 hours for full visit", "Kid-friendly activity", "Check cave opening times in advance"],
    insiderTipsZh: ["预留2-3小时参观时间", "适合带孩子", "提前查看洞穴开放时间"],
    bestTime: "Morning (best lighting)",
    bestSeason: "Year-round (indoor activity)",
    rating: 4.6,
    reviews: 145,
    nearbySpots: [],
    packages: [
      { name: "Cave Museum Discovery", nameZh: "洞穴博物馆探索", price: 30, duration: "2-3 hours", includes: "Admission ticket + Guide" },
    ],
  },
  {
    id: "xiangqiao-geopark",
    name: "Xiangqiao Karst Geopark",
    nameZh: "香桥喀斯特地质公园",
    category: "nature",
    categoryZh: "自然秘境",
    images: [
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangqiao-karst1.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangqiao-karst2.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangqiao-karst3.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangqiao-karst5.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangqiao-karst6.jpeg",
      "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Secret%20Spots/xiangqiao-karst7.jpeg",
    ],
    description: "A massive natural limestone bridge over emerald water. Contains the secret Jiulong Cave that opens only 4 times daily.",
    descriptionZh: "一座巨大的天然石灰岩桥横跨碧绿的水面。内有每天仅开放4次的九龙洞秘境。",
    howToFind: "Located in Luzhai County. Take the main road to Xiangqiao Geopark. Follow signs to the natural bridge.",
    howToFindZh: "位于鹿寨县。沿主路前往香桥地质公园。跟随路标前往天生桥。",
    insiderTips: ["Check Jiulong Cave opening times (4x daily)", "Bring water and snacks", "Best for nature photography"],
    insiderTipsZh: ["查看九龙洞开放时间（每天4次）", "带水和零食", "最适合自然摄影"],
    bestTime: "Morning (before 11 AM)",
    bestSeason: "Spring, Autumn",
    rating: 4.9,
    reviews: 98,
    nearbySpots: ["stone-forest"],
    packages: [
      { name: "Geopark Full Day Tour", nameZh: "地质公园全日游", price: 198, duration: "Full day", includes: "Transportation + Entry + Guide + Lunch" },
    ],
  },
];

function getSpotById(id) {
  return secretSpots.find(spot => spot.id === id) || null;
}

function SecretSpotDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const spotId = params.id;
  const [language, setLanguage] = useState("中文");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const spot = getSpotById(spotId);

  useEffect(() => {
    if (spot?.packages?.length && !selectedPackage) {
      setSelectedPackage(spot.packages[0]);
    }
  }, [spot]);

  if (!spot) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Secret spot not found</h1>
          <Link href="/tour/secret" className="text-emerald-600 mt-4 inline-block">← Back to Secret Spots</Link>
        </div>
      </main>
    );
  }

  const showNotification = (msg) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => setLanguage(language === "中文" ? "EN" : "中文");
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % spot.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + spot.images.length) % spot.images.length);
  };

  const handlePackageBooking = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    showNotification(`Package "${selectedPackage?.nameZh || selectedPackage?.name}" added to cart`);
  };

  const t = (zh, en) => language === "中文" ? zh : en;

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg">
          {t("已添加到购物车", "Added to cart")}
        </div>
      )}
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={() => {}} onRegister={() => {}} language={language} />

      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 items-center">
              <button onClick={toggleLanguage} className="text-xl">🌐</button>
              <Link href="/cart" className="text-xl">🛒</Link>
              <Link href="/profile" className="text-xl">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/tour/secret" className="text-emerald-600 mb-4 inline-block">
          ← {t("返回秘境列表", "Back to Secret Spots")}
        </Link>

        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative h-96 bg-gray-100">
            <img 
              src={spot.images[currentImageIndex]} 
              alt={language === "中文" ? spot.nameZh : spot.name} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://via.placeholder.com/800x500?text=Image+Not+Found"; }}
            />
            {spot.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full hover:bg-opacity-70">
                  ◀
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full hover:bg-opacity-70">
                  ▶
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {spot.images.map((_, idx) => (
                    <div key={idx} className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === idx ? "bg-white" : "bg-white bg-opacity-50"}`} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold">{language === "中文" ? spot.nameZh : spot.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500">⭐ {spot.rating}</span>
              <span className="text-gray-400">({spot.reviews} {t("条评价", "reviews")})</span>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("秘境故事", "The Story")}</h2>
          <p className="text-gray-700 leading-relaxed">
            {language === "中文" ? spot.descriptionZh : spot.description}
          </p>
        </div>

        {/* How to Find */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">{t("如何找到", "How to Find This Secret")}</h2>
          <p className="text-gray-700">
            {language === "中文" ? spot.howToFindZh : spot.howToFind}
          </p>
        </div>

        {/* Insider Tips */}
        <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-emerald-800">{t("💡 本地人秘籍", "💡 Insider Tips")}</h2>
          <ul className="space-y-2">
            {(language === "中文" ? spot.insiderTipsZh : spot.insiderTips).map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-emerald-700">
                <span>✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best Time to Visit */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">🕐</div>
            <div className="font-medium">{t("最佳时间", "Best Time")}</div>
            <div className="text-sm text-gray-500">{spot.bestTime}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">🌸</div>
            <div className="font-medium">{t("最佳季节", "Best Season")}</div>
            <div className="text-sm text-gray-500">{t(spot.bestSeason, spot.bestSeason)}</div>
          </div>
        </div>

        {/* Experience Packages */}
        {spot.packages && spot.packages.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t("体验套餐", "Experience Packages")}</h2>
            <div className="space-y-3">
              {spot.packages.map((pkg, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-xl p-4 cursor-pointer transition ${selectedPackage?.name === pkg.name ? "border-emerald-500 bg-emerald-50" : "border-gray-200"}`} 
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h3 className="font-bold">{language === "中文" ? pkg.nameZh : pkg.name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <span>🕒 {pkg.duration}</span>
                        <span>✓ {pkg.includes}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600">¥{pkg.price}</div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePackageBooking();
                        }}
                        className="mt-1 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm hover:bg-emerald-700"
                      >
                        {t("立即预订", "Book Now")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order CTA */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold">{t("准备好探索这个秘境了吗？", "Ready to discover this secret spot?")}</h3>
          <p className="text-emerald-100 text-sm mt-1">
            {t("预订专属体验，解锁柳州隐藏的宝藏", "Book your experience and unlock Liuzhou's hidden treasures")}
          </p>
          <button 
            onClick={handlePackageBooking}
            className="mt-4 bg-white text-emerald-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100"
          >
            🎒 {t("立即预订", "Book Now")}
          </button>
        </div>
      </div>

      <AIChatbot language={language} />
      <BottomNav language={language} />
    </main>
  );
}

export default SecretSpotDetailPage;