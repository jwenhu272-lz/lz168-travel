'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

// Hotel Categories
const hotelCategories = [
  { id: 'all', name: '全部', nameEn: 'All', icon: '🏨' },
  { id: '5star', name: '五星级', nameEn: '5 Star', icon: '⭐' },
  { id: '4star', name: '四星级', nameEn: '4 Star', icon: '⭐' },
  { id: '3star', name: '三星级', nameEn: '3 Star', icon: '⭐' },
  { id: '2star', name: '二星级', nameEn: '2 Star', icon: '⭐' },
  { id: '1star', name: '一星级', nameEn: '1 Star', icon: '⭐' },
  { id: 'homestay', name: '民宿', nameEn: 'Homestay', icon: '🏠' },
  { id: 'resort', name: '度假村', nameEn: 'Resort', icon: '🏖️' },
  { id: 'city', name: '城市酒店', nameEn: 'City Hotel', icon: '🏙️' },
  { id: 'countryside', name: '乡村酒店', nameEn: 'Countryside', icon: '🌾' },
  { id: 'mountain', name: '山景酒店', nameEn: 'Mountain Stay', icon: '⛰️' },
];

// Hero Carousel Slides
const heroSlides = [
  {
    id: 1,
    image: 'https://i.imgur.com/TwC4KjO.jpeg',
    title: '柳州万豪酒店',
    titleEn: 'Liuzhou Marriott Hotel',
    promoTitle: '🏨 豪华五星体验',
    promoTitleEn: '🏨 Luxury 5-Star Experience',
    promoSubtitle: '俯瞰柳江美景 · 尊享品质服务',
    promoSubtitleEn: 'River View · Premium Service',
    cta: '查看详情 →',
    ctaEn: 'View Details →',
  },
  {
    id: 2,
    image: 'https://i.imgur.com/L5TaJYN.jpeg',
    title: '青云精品酒店',
    titleEn: 'Qingyun Boutique Hotel',
    promoTitle: '🌸 青云景区内',
    promoTitleEn: '🌸 Inside Qingyun Scenic Area',
    promoSubtitle: '推窗见景 · 静谧雅致',
    promoSubtitleEn: 'Scenic Views · Peaceful Stay',
    cta: '查看详情 →',
    ctaEn: 'View Details →',
  },
  {
    id: 3,
    image: 'https://i.imgur.com/CkApj0a.jpeg',
    title: '青云温泉度假村',
    titleEn: 'Qingyun Hot Spring Resort',
    promoTitle: '♨️ 温泉度假',
    promoTitleEn: '♨️ Hot Spring Resort',
    promoSubtitle: '天然温泉 · 放松身心',
    promoSubtitleEn: 'Natural Hot Springs · Relax & Recharge',
    cta: '查看详情 →',
    ctaEn: 'View Details →',
  },
];

// Locations for filter
const locations = [
  { id: 'all', name: '全部', nameEn: 'All' },
  { id: 'qingyun', name: '青云景区', nameEn: 'Qingyun Scenic Area' },
  { id: 'citycenter', name: '城中区', nameEn: 'City Center' },
  { id: 'liubei', name: '柳北区', nameEn: 'Liubei District' },
  { id: 'liunan', name: '柳南区', nameEn: 'Liunan District' },
  { id: 'liudong', name: '柳东新区', nameEn: 'Liudong New Area' },
  { id: 'liujiang', name: '柳江区', nameEn: 'Liujiang District' },
];

// Facilities filter options
const facilitiesList = [
  { id: 'wifi', name: 'WiFi', nameEn: 'WiFi', icon: '📶' },
  { id: 'parking', name: '停车场', nameEn: 'Parking', icon: '🅿️' },
  { id: 'restaurant', name: '餐厅', nameEn: 'Restaurant', icon: '🍽️' },
  { id: 'pool', name: '游泳池', nameEn: 'Pool', icon: '🏊' },
  { id: 'gym', name: '健身房', nameEn: 'Gym', icon: '💪' },
  { id: 'spa', name: '水疗', nameEn: 'Spa', icon: '💆' },
  { id: 'pet', name: '宠物友好', nameEn: 'Pet Friendly', icon: '🐕' },
];

// Hotel Data
const hotels = [
  {
    id: 1,
    name: '柳州万豪酒店',
    nameEn: 'Liuzhou Marriott Hotel',
    category: '5star',
    price: 888,
    originalPrice: 1288,
    rating: 4.9,
    reviewCount: 1234,
    location: 'citycenter',
    locationName: '城中区',
    locationNameEn: 'City Center',
    imageUrl: 'https://i.imgur.com/izy0ize.jpeg',
    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa'],
    stars: 5,
    description: '豪华五星级酒店，俯瞰柳江美景',
    descriptionEn: 'Luxury 5-star hotel with river view',
  },
  {
    id: 2,
    name: '柳州凯悦酒店',
    nameEn: 'Hyatt Regency Liuzhou',
    category: '5star',
    price: 788,
    originalPrice: 1088,
    rating: 4.8,
    reviewCount: 892,
    location: 'liubei',
    locationName: '柳北区',
    locationNameEn: 'Liubei District',
    imageUrl: 'https://i.imgur.com/ZSXr5yd.jpeg',
    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym'],
    stars: 5,
    description: '国际品牌酒店，设施完善',
    descriptionEn: 'International brand hotel with full amenities',
  },
  {
    id: 3,
    name: '青云精品酒店',
    nameEn: 'Qingyun Boutique Hotel',
    category: '4star',
    price: 398,
    originalPrice: 598,
    rating: 4.8,
    reviewCount: 567,
    location: 'qingyun',
    locationName: '青云景区',
    locationNameEn: 'Qingyun Scenic Area',
    imageUrl: 'https://i.imgur.com/cbOaWjq.jpeg',
    facilities: ['wifi', 'parking', 'restaurant'],
    stars: 4,
    description: '位于青云景区内，环境优美',
    descriptionEn: 'Located inside Qingyun Scenic Area',
  },
  {
    id: 4,
    name: '柳州富力万达嘉华',
    nameEn: 'Wanda Realm Liuzhou',
    category: '4star',
    price: 458,
    originalPrice: 688,
    rating: 4.7,
    reviewCount: 234,
    location: 'citycenter',
    locationName: '城中区',
    locationNameEn: 'City Center',
    imageUrl: 'https://i.imgur.com/KVCDmHe.jpeg',
    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym'],
    stars: 4,
    description: '万达旗下高端酒店',
    descriptionEn: 'High-end hotel under Wanda group',
  },
  {
    id: 5,
    name: '柳州宾馆',
    nameEn: 'Liuzhou Hotel',
    category: '3star',
    price: 228,
    originalPrice: 358,
    rating: 4.5,
    reviewCount: 456,
    location: 'citycenter',
    locationName: '城中区',
    locationNameEn: 'City Center',
    imageUrl: 'https://i.imgur.com/fo9dSh9.jpeg',
    facilities: ['wifi', 'parking', 'restaurant'],
    stars: 3,
    description: '市中心老牌酒店',
    descriptionEn: 'Traditional hotel in city center',
  },
  {
    id: 6,
    name: '青云客栈',
    nameEn: 'Qingyun Inn',
    category: '3star',
    price: 188,
    originalPrice: 288,
    rating: 4.6,
    reviewCount: 345,
    location: 'qingyun',
    locationName: '青云景区',
    locationNameEn: 'Qingyun Scenic Area',
    imageUrl: 'https://i.imgur.com/NIPRFDG.jpeg',
    facilities: ['wifi', 'parking'],
    stars: 3,
    description: '靠近青云景区，交通便利',
    descriptionEn: 'Close to Qingyun Scenic Area',
  },
  {
    id: 7,
    name: '柳州快捷酒店',
    nameEn: 'Liuzhou Express Hotel',
    category: '2star',
    price: 128,
    originalPrice: 198,
    rating: 4.2,
    reviewCount: 789,
    location: 'liunan',
    locationName: '柳南区',
    locationNameEn: 'Liunan District',
    imageUrl: 'https://i.imgur.com/D13Tq1k.jpeg',
    facilities: ['wifi', 'parking'],
    stars: 2,
    description: '经济实惠，干净卫生',
    descriptionEn: 'Budget-friendly and clean',
  },
  {
    id: 8,
    name: '青云青旅',
    nameEn: 'Qingyun Youth Hostel',
    category: '1star',
    price: 68,
    originalPrice: 98,
    rating: 4.3,
    reviewCount: 234,
    location: 'qingyun',
    locationName: '青云景区',
    locationNameEn: 'Qingyun Scenic Area',
    imageUrl: 'https://i.imgur.com/8NJyLsk.jpeg',
    facilities: ['wifi'],
    stars: 1,
    description: '青年旅舍，背包客首选',
    descriptionEn: 'Youth hostel, backpacker favorite',
  },
  {
    id: 9,
    name: '青云小院',
    nameEn: 'Qingyun Courtyard',
    category: 'homestay',
    price: 258,
    originalPrice: 388,
    rating: 4.9,
    reviewCount: 123,
    location: 'qingyun',
    locationName: '青云景区',
    locationNameEn: 'Qingyun Scenic Area',
    imageUrl: 'https://i.imgur.com/qE2hpUf.jpeg',
    facilities: ['wifi', 'restaurant'],
    stars: 0,
    description: '传统中式庭院，宁静雅致',
    descriptionEn: 'Traditional Chinese courtyard',
  },
  {
    id: 10,
    name: '柳州山居',
    nameEn: 'Liuzhou Mountain Retreat',
    category: 'homestay',
    price: 328,
    originalPrice: 488,
    rating: 4.8,
    reviewCount: 89,
    location: 'liujiang',
    locationName: '柳江区',
    locationNameEn: 'Liujiang District',
    imageUrl: 'https://i.imgur.com/VNd70Cf.jpeg',
    facilities: ['wifi', 'parking', 'restaurant'],
    stars: 0,
    description: '山景民宿，远离喧嚣',
    descriptionEn: 'Mountain view homestay',
  },
  {
    id: 11,
    name: '青云温泉度假村',
    nameEn: 'Qingyun Hot Spring Resort',
    category: 'resort',
    price: 688,
    originalPrice: 988,
    rating: 4.9,
    reviewCount: 234,
    location: 'liudong',
    locationName: '柳东新区',
    locationNameEn: 'Liudong New Area',
    imageUrl: 'https://i.imgur.com/JXQSXVd.jpeg',
    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'spa'],
    stars: 0,
    description: '温泉度假，放松身心',
    descriptionEn: 'Hot spring resort for relaxation',
  },
  {
    id: 12,
    name: '柳州中心酒店',
    nameEn: 'Liuzhou Central Hotel',
    category: 'city',
    price: 298,
    originalPrice: 458,
    rating: 4.6,
    reviewCount: 456,
    location: 'citycenter',
    locationName: '城中区',
    locationNameEn: 'City Center',
    imageUrl: 'https://i.imgur.com/MXntsbR.jpeg',
    facilities: ['wifi', 'parking', 'restaurant'],
    stars: 0,
    description: '市中心，购物方便',
    descriptionEn: 'City center, convenient shopping',
  },
  {
    id: 13,
    name: '柳江田园民宿',
    nameEn: 'Liujiang Farmstay',
    category: 'countryside',
    price: 188,
    originalPrice: 288,
    rating: 4.7,
    reviewCount: 67,
    location: 'liujiang',
    locationName: '柳江区',
    locationNameEn: 'Liujiang District',
    imageUrl: 'https://i.imgur.com/NIPRFDG.jpeg',
    facilities: ['wifi', 'parking'],
    stars: 0,
    description: '田园风光，农家体验',
    descriptionEn: 'Farmstay with rural scenery',
  },
  {
    id: 14,
    name: '青秀山居',
    nameEn: 'Qingxiu Mountain Lodge',
    category: 'mountain',
    price: 358,
    originalPrice: 528,
    rating: 4.8,
    reviewCount: 123,
    location: 'liunan',
    locationName: '柳南区',
    locationNameEn: 'Liunan District',
    imageUrl: 'https://i.imgur.com/7STkaWN.jpeg',
    facilities: ['wifi', 'parking', 'restaurant'],
    stars: 0,
    description: '山景房，空气清新',
    descriptionEn: 'Mountain view rooms, fresh air',
  },
];

function HotelPageContent() {
  const { user, login, register, logout } = useAuth();
  const [language, setLanguage] = useState('中文');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedStarRating, setSelectedStarRating] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('ordering');
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [wechatConfirm, setWechatConfirm] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedNights, setSelectedNights] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('hotel_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }
    if (user) {
      setCustomerName(user.name || '');
      setCustomerPhone(user.phone || '');
      setCustomerEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hotel_cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => {
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const handleImageError = (hotelId) => {
    setImageErrors((prev) => ({ ...prev, [hotelId]: true }));
  };

  const toggleFacility = (facilityId) => {
    setSelectedFacilities((prev) =>
      prev.includes(facilityId)
        ? prev.filter((f) => f !== facilityId)
        : [...prev, facilityId]
    );
  };

  const toggleStarRating = (star) => {
    setSelectedStarRating((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  let filteredHotels = [...hotels];

  if (selectedCategory !== 'all') {
    filteredHotels = filteredHotels.filter(
      (h) => h.category === selectedCategory
    );
  }

  if (selectedStarRating.length > 0) {
    filteredHotels = filteredHotels.filter((h) => {
      if (h.stars === 0) return false;
      return selectedStarRating.includes(h.stars);
    });
  }

  if (selectedLocation !== 'all') {
    filteredHotels = filteredHotels.filter(
      (h) => h.location === selectedLocation
    );
  }

  if (selectedFacilities.length > 0) {
    filteredHotels = filteredHotels.filter((hotel) =>
      selectedFacilities.every((f) => hotel.facilities.includes(f))
    );
  }

  filteredHotels = filteredHotels.filter(
    (hotel) => hotel.price >= priceRange.min && hotel.price <= priceRange.max
  );

  filteredHotels = filteredHotels.filter((hotel) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = (
      language === '中文' ? hotel.name : hotel.nameEn
    ).toLowerCase();
    const location = (
      language === '中文' ? hotel.locationName : hotel.locationNameEn
    ).toLowerCase();
    return name.includes(query) || location.includes(query);
  });

  if (sortBy === 'price_asc') {
    filteredHotels.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filteredHotels.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredHotels.sort((a, b) => b.rating - a.rating);
  }

  const openBookingModal = (hotel, e) => {
    e.preventDefault();
    setSelectedHotel(hotel);
    setSelectedDate('');
    setSelectedNights(1);
    setSelectedRooms(1);
    setShowBookingModal(true);
  };

  const calculateTotal = () => {
    if (!selectedHotel) return 0;
    return selectedHotel.price * selectedNights * selectedRooms;
  };

  const addToCart = () => {
    if (!selectedDate) {
      showNotification(
        language === '中文' ? '请选择入住日期' : 'Please select check-in date'
      );
      return;
    }
    const total = calculateTotal();
    const cartItem = {
      id: `${selectedHotel.id}_${selectedDate}`,
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      checkIn: selectedDate,
      nights: selectedNights,
      rooms: selectedRooms,
      pricePerNight: selectedHotel.price,
      total: total,
    };
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItem.id);
      if (existing) {
        showNotification(
          language === '中文'
            ? '该日期的酒店已在购物车中'
            : 'Hotel already in cart for this date'
        );
        return prevCart;
      }
      showNotification(
        language === '中文'
          ? `已添加 ${selectedHotel.name}`
          : `Added ${selectedHotel.nameEn}`
      );
      return [...prevCart, cartItem];
    });
    setShowBookingModal(false);
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showNotification(language === '中文' ? '已删除' : 'Removed');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const grandTotal = cartTotal;

  const handleCheckout = () => {
    if (!user) {
      showNotification(language === '中文' ? '请先登录' : 'Please login first');
      setShowLoginModal(true);
      return;
    }
    if (cart.length === 0) {
      showNotification(
        language === '中文' ? '请先添加酒店' : 'Please add hotels to cart'
      );
      return;
    }
    setCheckoutStep('checkout');
  };

  const sendWeChatConfirmation = (order) => {
    setWechatConfirm({
      title: '酒店订单已确认',
      message: `您已成功预订 ${order.items.length} 间酒店，总计 ¥${order.total}`,
      orderNumber: order.orderNumber,
    });
    setTimeout(() => setWechatConfirm(null), 5000);
  };

  const submitOrder = () => {
    if (!customerName || !customerPhone || !customerEmail) {
      showNotification(
        language === '中文' ? '请填写完整信息' : 'Please fill in all fields'
      );
      return;
    }
    const newOrderNumber = `HZ${Date.now()}`;
    setOrderNumber(newOrderNumber);
    const order = {
      orderNumber: newOrderNumber,
      items: cart,
      total: grandTotal,
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      },
      date: new Date().toISOString(),
      type: 'hotel',
    };
    const orders = JSON.parse(localStorage.getItem('hotel_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('hotel_orders', JSON.stringify(orders));
    localStorage.removeItem('hotel_cart');
    setCart([]);
    sendWeChatConfirmation(order);
    setCheckoutStep('confirmation');
  };

  const continueShopping = () => {
    setCheckoutStep('ordering');
    setCustomerName(user?.name || '');
    setCustomerPhone(user?.phone || '');
    setCustomerEmail(user?.email || '');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    showNotification(language === '中文' ? '已退出登录' : 'Logged out');
  };

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );

  const t = (zh, en) => (language === '中文' ? zh : en);

  if (checkoutStep === 'confirmation') {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              {t('酒店订单已确认', 'Hotel Order Confirmed')}
            </h1>
            <p className="text-gray-600 mb-4">
              {t('订单号', 'Order Number')}:{' '}
              <strong className="text-blue-600">{orderNumber}</strong>
            </p>
            <div className="bg-green-50 rounded-lg p-3 mb-4 text-sm text-green-700">
              📱 {t('微信通知已发送', 'WeChat notification sent')}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left max-h-60 overflow-y-auto">
              <h3 className="font-medium mb-2">
                {t('订单详情', 'Order Details')}
              </h3>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm py-1"
                >
                  <span>
                    {item.hotelName} - {item.nights}
                    {t('晚', ' nights')} x{item.rooms}
                    {t('间', ' room')}
                  </span>
                  <span>¥{item.total}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                <span>{t('合计', 'Total')}:</span>
                <span>¥{grandTotal}</span>
              </div>
            </div>
            <Link
              href="/"
              onClick={continueShopping}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              {t('返回首页', 'Back to Home')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentSlideData = heroSlides[currentSlide];

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {wechatConfirm && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-out">
          <div className="bg-green-500 text-white px-4 py-2 flex items-center gap-2">
            <span className="text-lg">💚</span>
            <span className="font-medium">微信服务通知</span>
          </div>
          <div className="p-4">
            <p className="font-bold text-gray-800">{wechatConfirm.title}</p>
            <p className="text-sm text-gray-600 mt-1">
              {wechatConfirm.message}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              订单号: {wechatConfirm.orderNumber}
            </p>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
        onRegister={register}
        language={language}
      />

      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-3 md:gap-4 items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('搜索酒店...', 'Search hotels...')}
                  className="border border-gray-300 rounded-full px-4 py-1 text-sm w-32 md:w-48 focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  🔍
                </span>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-xl"
              >
                ⚙️
              </button>
              <button onClick={toggleLanguage} className="text-xl">
                🌐{' '}
                <span className="text-xs ml-1 hidden md:inline">
                  {language}
                </span>
              </button>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition"
                  >
                    <span className="text-lg">👤</span>
                    <span className="text-sm font-medium hidden md:inline">
                      {user.name?.split(' ')[0] || user.name}
                    </span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        📋 {t('我的订单', 'My Orders')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        🚪 {t('退出登录', 'Logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-sm text-blue-600 flex items-center gap-1"
                >
                  <span>👤</span> {t('登录/注册', 'Login')}
                </button>
              )}
              <Link
                href="/orders"
                className="text-xl hover:text-blue-600 hidden md:inline"
              >
                📋
              </Link>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative text-2xl"
              >
                🛒
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <div className="relative w-full h-80 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
              <div className="bg-black bg-opacity-50 px-6 py-4 rounded-xl backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {language === '中文' ? slide.promoTitle : slide.promoTitleEn}
                </h2>
                <p className="text-sm md:text-base mb-3">
                  {language === '中文'
                    ? slide.promoSubtitle
                    : slide.promoSubtitleEn}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-medium transition">
                  {language === '中文' ? slide.cta : slide.ctaEn}
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center z-20"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center z-20"
        >
          ▶
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === idx ? 'bg-white w-4' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b sticky top-[57px] md:top-[73px] z-30 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-3 min-w-max">
            {hotelCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{language === '中文' ? cat.name : cat.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{t('筛选条件', 'Filters')}</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium block mb-2">
                  {t('星级', 'Star Rating')}
                </label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label
                      key={star}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStarRating.includes(star)}
                        onChange={() => toggleStarRating(star)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">
                        {'⭐'.repeat(star)} {star}
                        {t('星级', ' Star')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">
                  {t('价格范围', 'Price Range')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value),
                      })
                    }
                    placeholder={t('最低', 'Min')}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <span className="self-center">-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    placeholder={t('最高', 'Max')}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="mt-3">
                  <label className="text-sm font-medium block mb-2">
                    {t('排序方式', 'Sort By')}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="default">{t('默认', 'Default')}</option>
                    <option value="price_asc">
                      {t('价格从低到高', 'Price: Low to High')}
                    </option>
                    <option value="price_desc">
                      {t('价格从高到低', 'Price: High to Low')}
                    </option>
                    <option value="rating">
                      {t('评分最高', 'Highest Rated')}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">
                  {t('位置', 'Location')}
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {language === '中文' ? loc.name : loc.nameEn}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">
                  {t('设施', 'Facilities')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {facilitiesList.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggleFacility(f.id)}
                      className={`px-2 py-1 rounded-full text-xs transition ${
                        selectedFacilities.includes(f.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {f.icon} {language === '中文' ? f.name : f.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setSelectedStarRating([]);
                  setSelectedLocation('all');
                  setSelectedFacilities([]);
                  setPriceRange({ min: 0, max: 1000 });
                  setSortBy('default');
                }}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                {t('重置所有', 'Reset All')}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                {t('应用筛选', 'Apply Filters')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hotel List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`flex-1 ${showCart ? 'lg:w-2/3' : 'w-full'}`}>
            {filteredHotels.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                {t('暂无酒店', 'No hotels found')}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <Link
                    href={`/hotel/${hotel.id}`}
                    key={hotel.id}
                    className="block"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 bg-gray-100 relative">
                          {!imageErrors[hotel.id] ? (
                            <img
                              src={hotel.imageUrl}
                              alt={hotel.name}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(hotel.id)}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-blue-100 to-indigo-100">
                              🏨
                            </div>
                          )}
                          {hotel.stars > 0 && (
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                              {'⭐'.repeat(hotel.stars)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">
                                {language === '中文'
                                  ? hotel.name
                                  : hotel.nameEn}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                📍{' '}
                                {language === '中文'
                                  ? hotel.locationName
                                  : hotel.locationNameEn}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">⭐</span>
                                <span>{hotel.rating}</span>
                                <span className="text-xs text-gray-400">
                                  ({hotel.reviewCount})
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {hotel.facilities.map((f) => (
                              <span
                                key={f}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                              >
                                {
                                  facilitiesList.find((fac) => fac.id === f)
                                    ?.icon
                                }{' '}
                                {language === '中文'
                                  ? facilitiesList.find((fac) => fac.id === f)
                                      ?.name
                                  : facilitiesList.find((fac) => fac.id === f)
                                      ?.nameEn}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {language === '中文'
                              ? hotel.description
                              : hotel.descriptionEn}
                          </p>
                          <div className="mt-3 flex justify-between items-center">
                            <div>
                              <span className="text-2xl font-bold text-blue-600">
                                ¥{hotel.price}
                              </span>
                              <span className="text-xs text-gray-400">
                                /{t('晚', 'night')}
                              </span>
                              <span className="text-sm text-gray-400 line-through ml-2">
                                ¥{hotel.originalPrice}
                              </span>
                            </div>
                            <button
                              onClick={(e) => openBookingModal(hotel, e)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                            >
                              {t('立即预订', 'Book Now')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {showCart && (
            <div className="lg:w-80 bg-white rounded-xl shadow-lg p-4 h-fit sticky top-44">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{t('购物车', 'Cart')}</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400"
                >
                  ✕
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  {t('购物车是空的', 'Cart is empty')}
                </p>
              ) : (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start border-b pb-2"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">
                            {item.hotelName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.checkIn} | {item.nights}
                            {t('晚', ' nights')} x{item.rooms}
                            {t('间', ' room')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">¥{item.total}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 text-xs mt-1"
                          >
                            {t('删除', 'Remove')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-3">
                    <div className="flex justify-between font-bold">
                      <span>{t('合计', 'Total')}:</span>
                      <span className="text-blue-600">¥{cartTotal}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mt-4"
                    >
                      {t('去结算', 'Checkout')} →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {!showCart && cart.length > 0 && (
        <div className="fixed bottom-20 right-4 lg:hidden z-40">
          <button
            onClick={() => setShowCart(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm"
          >
            🛒 {t('购物车', 'Cart')} ({cart.length})
          </button>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {t('预订酒店', 'Book Hotel')}
                </h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 text-2xl"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-semibold text-lg mb-4">
                {language === '中文'
                  ? selectedHotel.name
                  : selectedHotel.nameEn}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('入住日期', 'Check-in Date')}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('入住晚数', 'Nights')}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setSelectedNights(Math.max(1, selectedNights - 1))
                        }
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{selectedNights}</span>
                      <button
                        onClick={() => setSelectedNights(selectedNights + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('房间数量', 'Rooms')}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setSelectedRooms(Math.max(1, selectedRooms - 1))
                        }
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{selectedRooms}</span>
                      <button
                        onClick={() => setSelectedRooms(selectedRooms + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('总计', 'Total')}:</span>
                    <span className="text-blue-600">¥{calculateTotal()}</span>
                  </div>
                </div>
                <button
                  onClick={addToCart}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
                >
                  {t('加入购物车', 'Add to Cart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutStep === 'checkout' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('订单结算', 'Checkout')}</h2>
              <button
                onClick={() => setCheckoutStep('ordering')}
                className="text-gray-400 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('姓名', 'Name')}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('电话', 'Phone')}
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('邮箱', 'Email')}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('支付方式', 'Payment')}
                </label>
                <div className="border rounded-lg p-3 bg-gray-50 flex items-center gap-2">
                  <span>💚</span> {t('微信支付 (模拟)', 'WeChat Pay (Mock)')}
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('订单总额', 'Order Total')}:</span>
                  <span className="text-blue-600">¥{grandTotal}</span>
                </div>
              </div>
              <button
                onClick={submitOrder}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold"
              >
                💚 {t('微信支付', 'WeChat Pay')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </main>
  );
}

export default function HotelPage() {
  return (
    <AuthProvider>
      <HotelPageContent />
    </AuthProvider>
  );
}
