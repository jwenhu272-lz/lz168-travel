'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

// Tour Categories
const tourCategories = [
  { id: 'all', name: '全部', nameEn: 'All', icon: '🏔️' },
  { id: 'culture', name: '文化体验', nameEn: 'Culture', icon: '🏛️' },
  { id: 'food', name: '美食之旅', nameEn: 'Food Tour', icon: '🍜' },
  { id: 'night', name: '夜景夜市', nameEn: 'Night View', icon: '🌙' },
  { id: 'cruise', name: '游船体验', nameEn: 'Cruise', icon: '⛴️' },
  { id: 'family', name: '亲子家庭', nameEn: 'Family', icon: '👨‍👩‍👧' },
];

// Tour Packages Data
const tourPackages = [
  {
    id: 1,
    name: '青云文化深度游',
    nameEn: 'Qingyun Cultural Tour',
    category: 'culture',
    priceAdult: 188,
    priceChild: 128,
    duration: '1天',
    durationEn: '1 Day',
    groupSize: '2-15人',
    groupSizeEn: '2-15 people',
    imageUrl: 'https://i.imgur.com/uNkL1ZX.jpeg',
    placeholderImage: '🏛️',
    rating: 4.9,
    reviewCount: 234,
    highlights: ['青云景区', '传统建筑讲解', '文化表演', '午餐'],
    highlightsEn: [
      'Qingyun Scenic Area',
      'Architecture Tour',
      'Cultural Show',
      'Lunch',
    ],
    description: '探索青云景区的深厚文化底蕴',
    descriptionEn: 'Explore the rich cultural heritage',
    includes: ['门票', '专业导游', '午餐', '保险'],
    includesEn: ['Entry Ticket', 'Professional Guide', 'Lunch', 'Insurance'],
  },
  {
    id: 2,
    name: '螺蛳粉美食之旅',
    nameEn: 'Luosifen Food Tour',
    category: 'food',
    priceAdult: 128,
    priceChild: 88,
    duration: '半日',
    durationEn: 'Half Day',
    groupSize: '2-12人',
    groupSizeEn: '2-12 people',
    imageUrl: 'https://i.imgur.com/O5G6AfZ.jpeg',
    placeholderImage: '🍜',
    rating: 4.8,
    reviewCount: 567,
    highlights: ['3家网红螺蛳粉店', '制作体验', '品尝套餐'],
    highlightsEn: ['3 Famous Luosifen Shops', 'Cooking Demo', 'Tasting Set'],
    description: '品尝最正宗的柳州螺蛳粉',
    descriptionEn: 'Taste the most authentic Liuzhou Luosifen',
    includes: ['品尝套餐', '导游讲解', '水'],
    includesEn: ['Tasting Set', 'Guide', 'Water'],
  },
  {
    id: 3,
    name: '青云夜景+夜市',
    nameEn: 'Night View + Night Market',
    category: 'night',
    priceAdult: 98,
    priceChild: 68,
    duration: '3-4小时',
    durationEn: '3-4 Hours',
    groupSize: '2-20人',
    groupSizeEn: '2-20 people',
    imageUrl: 'https://i.imgur.com/bPLfypK.jpeg',
    placeholderImage: '🌙',
    rating: 4.7,
    reviewCount: 456,
    highlights: ['夜景观景台', '夜市美食', '灯光秀'],
    highlightsEn: ['Night View Platform', 'Night Market Food', 'Light Show'],
    description: '欣赏青云夜景，体验热闹的夜市美食',
    descriptionEn: 'Enjoy Qingyun night view and night market',
    includes: ['夜景门票', '导游', '小吃券'],
    includesEn: ['Night Ticket', 'Guide', 'Snack Voucher'],
  },
  {
    id: 4,
    name: '柳江游船+青云',
    nameEn: 'Liujiang Cruise + Qingyun',
    category: 'cruise',
    priceAdult: 288,
    priceChild: 188,
    duration: '1天',
    durationEn: '1 Day',
    groupSize: '4-30人',
    groupSizeEn: '4-30 people',
    imageUrl: 'https://i.imgur.com/9yG0Mt3.jpeg',
    placeholderImage: '⛴️',
    rating: 4.9,
    reviewCount: 345,
    highlights: ['柳江游船', '青云景区', '午餐', '船上午茶'],
    highlightsEn: ['Liujiang Cruise', 'Qingyun Area', 'Lunch', 'Afternoon Tea'],
    description: '乘船游览柳江，感受两岸风光',
    descriptionEn: 'Cruise along Liujiang River',
    includes: ['游船票', '景区门票', '午餐', '导游'],
    includesEn: ['Cruise Ticket', 'Entry Ticket', 'Lunch', 'Guide'],
  },
  {
    id: 5,
    name: '壮乡风情两日游',
    nameEn: 'Zhuang Culture 2-Day Tour',
    category: 'culture',
    priceAdult: 588,
    priceChild: 388,
    duration: '2天1晚',
    durationEn: '2 Days 1 Night',
    groupSize: '4-20人',
    groupSizeEn: '4-20 people',
    imageUrl: 'https://i.imgur.com/POlwZgF.jpeg',
    placeholderImage: '🎎',
    rating: 4.9,
    reviewCount: 234,
    highlights: ['壮族村寨', '民族表演', '特色住宿', '壮家美食'],
    highlightsEn: [
      'Zhuang Village',
      'Ethnic Show',
      'Local Stay',
      'Zhuang Cuisine',
    ],
    description: '深入壮族村寨，体验少数民族文化',
    descriptionEn: 'Experience Zhuang minority culture',
    includes: ['住宿', '三餐', '交通', '导游', '表演票'],
    includesEn: [
      'Accommodation',
      '3 Meals',
      'Transport',
      'Guide',
      'Show Ticket',
    ],
  },
  {
    id: 6,
    name: '非遗手工艺体验',
    nameEn: 'Heritage Crafts Experience',
    category: 'culture',
    priceAdult: 158,
    priceChild: 98,
    duration: '半日',
    durationEn: 'Half Day',
    groupSize: '2-10人',
    groupSizeEn: '2-10 people',
    imageUrl: 'https://i.imgur.com/n0LgY4v.jpeg',
    placeholderImage: '🎨',
    rating: 4.8,
    reviewCount: 123,
    highlights: ['手工艺制作', '非遗传承人指导', '作品带走'],
    highlightsEn: ['Craft Making', 'Master Guidance', 'Take Home Creation'],
    description: '学习传统手工艺，亲手制作纪念品',
    descriptionEn: 'Learn traditional crafts, make your own souvenir',
    includes: ['材料费', '指导费', '茶点'],
    includesEn: ['Materials', 'Instruction', 'Refreshments'],
  },
  {
    id: 7,
    name: '摄影爱好团',
    nameEn: 'Photography Tour',
    category: 'culture',
    priceAdult: 388,
    priceChild: 258,
    duration: '1天',
    durationEn: '1 Day',
    groupSize: '3-12人',
    groupSizeEn: '3-12 people',
    imageUrl: 'https://i.imgur.com/FWORttF.jpeg',
    placeholderImage: '📷',
    rating: 4.9,
    reviewCount: 89,
    highlights: ['日出拍摄点', '专业指导', '后期分享'],
    highlightsEn: ['Sunrise Spot', 'Pro Tips', 'Post-processing'],
    description: '为摄影爱好者定制的最佳拍摄路线',
    descriptionEn: 'Best photo spots for photography enthusiasts',
    includes: ['门票', '导游', '小食'],
    includesEn: ['Entry', 'Guide', 'Snacks'],
  },
  {
    id: 8,
    name: '亲子家庭团',
    nameEn: 'Family Tour',
    category: 'family',
    priceAdult: 258,
    priceChild: 158,
    duration: '1天',
    durationEn: '1 Day',
    groupSize: '2-4家庭',
    groupSizeEn: '2-4 families',
    imageUrl: 'https://i.imgur.com/E9SqsR7.jpeg',
    placeholderImage: '👨‍👩‍👧',
    rating: 4.8,
    reviewCount: 234,
    highlights: ['亲子活动', '寓教于乐', '儿童友好'],
    highlightsEn: ['Family Activities', 'Edutainment', 'Kid-friendly'],
    description: '适合带孩子的家庭，轻松愉快的旅行体验',
    descriptionEn: 'Perfect for families with children',
    includes: ['门票', '午餐', '亲子活动', '保险'],
    includesEn: ['Entry', 'Lunch', 'Activities', 'Insurance'],
  },
];

function TourPageContent() {
  const { user, login, register, logout } = useAuth();
  const [language, setLanguage] = useState('中文');
  const [selectedCategory, setSelectedCategory] = useState('all');
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
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const savedCart = localStorage.getItem('tour_cart');
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
    localStorage.setItem('tour_cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => {
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const handleImageError = (tourId) => {
    setImageErrors((prev) => ({ ...prev, [tourId]: true }));
  };

  const filteredByCategory =
    selectedCategory === 'all'
      ? tourPackages
      : tourPackages.filter((p) => p.category === selectedCategory);

  const filteredTours = filteredByCategory.filter((tour) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = (language === '中文' ? tour.name : tour.nameEn).toLowerCase();
    return name.includes(query);
  });

  const openBookingModal = (tour, e) => {
    e.preventDefault();
    setSelectedTour(tour);
    setAdults(2);
    setChildren(0);
    setSelectedDate('');
    setShowBookingModal(true);
  };

  const calculateTotal = () => {
    if (!selectedTour) return 0;
    return (
      selectedTour.priceAdult * adults + selectedTour.priceChild * children
    );
  };

  const addToCart = () => {
    if (!selectedDate) {
      showNotification(
        language === '中文' ? '请选择日期' : 'Please select a date'
      );
      return;
    }
    if (adults + children === 0) {
      showNotification(
        language === '中文' ? '请选择人数' : 'Please select number of people'
      );
      return;
    }
    const total = calculateTotal();
    const cartItem = {
      id: `${selectedTour.id}_${selectedDate}`,
      tourId: selectedTour.id,
      tourName: selectedTour.name,
      date: selectedDate,
      adults: adults,
      children: children,
      total: total,
    };
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItem.id);
      if (existing) {
        showNotification(
          language === '中文'
            ? '该日期的行程已在购物车中'
            : 'Tour already in cart for this date'
        );
        return prevCart;
      }
      showNotification(
        language === '中文'
          ? `已添加 ${selectedTour.name}`
          : `Added ${selectedTour.nameEn}`
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
        language === '中文' ? '请先添加行程' : 'Please add tours to cart'
      );
      return;
    }
    setCheckoutStep('checkout');
  };

  const sendWeChatConfirmation = (order) => {
    setWechatConfirm({
      title: '行程订单已确认',
      message: `您已成功预订 ${order.items.length} 个行程，总计 ¥${order.total}`,
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
    const newOrderNumber = `TZ${Date.now()}`;
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
      type: 'tour',
    };
    const orders = JSON.parse(localStorage.getItem('tour_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('tour_orders', JSON.stringify(orders));
    localStorage.removeItem('tour_cart');
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

  const t = (zh, en) => (language === '中文' ? zh : en);

  if (checkoutStep === 'confirmation') {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              {t('行程已确认', 'Tour Confirmed')}
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
                {t('行程详情', 'Tour Details')}
              </h3>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm py-1"
                >
                  <span>
                    {item.tourName} - {item.date}
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
                  placeholder={t('搜索行程...', 'Search tours...')}
                  className="border border-gray-300 rounded-full px-4 py-1 text-sm w-32 md:w-48 focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  🔍
                </span>
              </div>
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

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">
            🏔️ {t('青云旅游 · 精选行程', 'Qingyun Tours · Featured Packages')}
          </h1>
          <p className="text-blue-100 mt-2">
            {t(
              '探索柳州之美，体验地道文化',
              'Discover Liuzhou, Experience Local Culture'
            )}
          </p>
        </div>
      </div>

      <div className="bg-white border-b sticky top-[57px] md:top-[73px] z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {tourCategories.map((cat) => (
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

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`flex-1 ${showCart ? 'lg:w-2/3' : 'w-full'}`}>
            {filteredTours.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                {t('暂无行程', 'No tours found')}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTours.map((tour) => (
                  <Link
                    href={`/tour/${tour.id}`}
                    key={tour.id}
                    className="block"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group cursor-pointer">
                      <div className="relative w-full pb-[66.67%] bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                        {!imageErrors[tour.id] && tour.imageUrl ? (
                          <img
                            src={tour.imageUrl}
                            alt={tour.name}
                            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            onError={() => handleImageError(tour.id)}
                          />
                        ) : (
                          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-6xl">
                            {tour.placeholderImage}
                          </div>
                        )}
                        {tour.rating >= 4.8 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                            🔥 {t('热卖', 'Hot')}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg line-clamp-1">
                              {language === '中文' ? tour.name : tour.nameEn}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              ⏱️{' '}
                              {language === '中文'
                                ? tour.duration
                                : tour.durationEn}{' '}
                              | 👥{' '}
                              {language === '中文'
                                ? tour.groupSize
                                : tour.groupSizeEn}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-yellow-500">⭐</span>
                            <span>{tour.rating}</span>
                            <span className="text-xs text-gray-400">
                              ({tour.reviewCount})
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {(language === '中文'
                            ? tour.highlights
                            : tour.highlightsEn
                          )
                            .slice(0, 2)
                            .map((h, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full line-clamp-1"
                              >
                                ✓ {h}
                              </span>
                            ))}
                        </div>
                        <div className="mt-3 flex justify-between items-center flex-wrap gap-2">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">
                              ¥{tour.priceAdult}
                            </span>
                            <span className="text-xs text-gray-400">
                              /{t('成人', 'Adult')}
                            </span>
                            {tour.priceChild && (
                              <>
                                <span className="text-lg font-bold text-blue-600 ml-2">
                                  ¥{tour.priceChild}
                                </span>
                                <span className="text-xs text-gray-400">
                                  /{t('儿童', 'Child')}
                                </span>
                              </>
                            )}
                          </div>
                          <button
                            onClick={(e) => openBookingModal(tour, e)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition shrink-0"
                          >
                            {t('立即预订', 'Book Now')}
                          </button>
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
                            {item.tourName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.date} | {t('成人', 'Adult')} {item.adults}{' '}
                            {item.children > 0
                              ? `+ ${t('儿童', 'Child')} ${item.children}`
                              : ''}
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
      {showBookingModal && selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {t('预订行程', 'Book Tour')}
                </h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 text-2xl"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-semibold text-lg mb-4 line-clamp-2">
                {language === '中文' ? selectedTour.name : selectedTour.nameEn}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('出发日期', 'Travel Date')}
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
                      {t('成人数量', 'Adults')}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      ¥{selectedTour.priceAdult}/{t('人', 'person')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('儿童数量', 'Children')}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      ¥{selectedTour.priceChild}/{t('人', 'person')}
                    </p>
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
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {t('订单结算', 'Checkout')}
                </h2>
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
        </div>
      )}

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </main>
  );
}

export default function TourPage() {
  return (
    <AuthProvider>
      <TourPageContent />
    </AuthProvider>
  );
}
