'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

// Complete tours data - ALL 8 tours
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/qingyun-cultural-tour.jpeg',
    rating: 4.9,
    reviewCount: 234,
    description: '探索青云景区的深厚文化底蕴，了解柳州历史与传统',
    descriptionEn: 'Explore the rich cultural heritage of Qingyun Scenic Area',
    includes: ['青云景区门票', '专业导游讲解', '特色午餐', '旅游保险'],
    includesEn: ['Entry Ticket', 'Professional Guide', 'Lunch', 'Insurance'],
    excludes: ['个人消费', '交通接送', '小费'],
    excludesEn: ['Personal expenses', 'Transportation', 'Tips'],
    meetingPoint: '青云景区正门集合',
    meetingPointEn: 'Meet at Qingyun Scenic Area Main Gate',
    meetingTime: '09:00',
    itinerary: [
      {
        time: '09:00',
        activity: '青云景区正门集合',
        activityEn: 'Meet at main gate',
        location: '青云景区',
      },
      {
        time: '09:30',
        activity: '参观青云寺',
        activityEn: 'Visit Qingyun Temple',
        location: '青云景区',
      },
      {
        time: '11:00',
        activity: '传统建筑讲解',
        activityEn: 'Architecture tour',
        location: '青云景区',
      },
      {
        time: '12:30',
        activity: '特色午餐',
        activityEn: 'Lunch',
        location: '景区餐厅',
      },
      {
        time: '14:00',
        activity: '文化表演',
        activityEn: 'Cultural show',
        location: '表演厅',
      },
      {
        time: '16:00',
        activity: '自由活动/结束',
        activityEn: 'Free time / End',
        location: '青云景区',
      },
    ],
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/luosifen-food-tour.jpeg',
    rating: 4.8,
    reviewCount: 567,
    description: '品尝最正宗的柳州螺蛳粉，了解螺蛳粉文化',
    descriptionEn:
      'Taste the most authentic Liuzhou Luosifen, learn about its culture',
    includes: ['3家网红螺蛳粉店品尝', '制作体验', '水/饮料', '导游讲解'],
    includesEn: ['3 famous shops tasting', 'Cooking demo', 'Drinks', 'Guide'],
    excludes: ['个人消费', '额外食品', '交通'],
    excludesEn: ['Personal expenses', 'Extra food', 'Transportation'],
    meetingPoint: '青云路美食街入口',
    meetingPointEn: 'Qingyun Food Street Entrance',
    meetingTime: '10:00',
    itinerary: [
      {
        time: '10:00',
        activity: '美食街集合',
        activityEn: 'Meet at food street',
        location: '青云美食街',
      },
      {
        time: '10:30',
        activity: '第一家螺蛳粉店品尝',
        activityEn: '1st Luosifen shop',
        location: '老牌螺蛳粉',
      },
      {
        time: '12:00',
        activity: '第二家螺蛳粉店品尝',
        activityEn: '2nd Luosifen shop',
        location: '网红螺蛳粉',
      },
      {
        time: '13:30',
        activity: '制作体验',
        activityEn: 'Cooking demo',
        location: '体验馆',
      },
      {
        time: '15:00',
        activity: '第三家螺蛳粉店品尝',
        activityEn: '3rd Luosifen shop',
        location: '老字号',
      },
      {
        time: '16:30',
        activity: '结束行程',
        activityEn: 'Tour ends',
        location: '美食街',
      },
    ],
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/night-view-night-market.jpeg',
    rating: 4.7,
    reviewCount: 456,
    description: '欣赏青云夜景，体验热闹的夜市美食',
    descriptionEn:
      'Enjoy Qingyun night view and experience the lively night market',
    includes: ['夜景门票', '导游讲解', '小吃券', '保险'],
    includesEn: ['Night ticket', 'Guide', 'Snack voucher', 'Insurance'],
    excludes: ['个人消费', '额外小吃', '交通'],
    excludesEn: ['Personal expenses', 'Extra snacks', 'Transportation'],
    meetingPoint: '青云观景台入口',
    meetingPointEn: 'Qingyun Viewing Platform Entrance',
    meetingTime: '18:30',
    itinerary: [
      {
        time: '18:30',
        activity: '观景台集合',
        activityEn: 'Meet at viewing platform',
        location: '青云观景台',
      },
      {
        time: '19:00',
        activity: '欣赏夜景',
        activityEn: 'Enjoy night view',
        location: '观景台',
      },
      {
        time: '20:00',
        activity: '夜市美食探索',
        activityEn: 'Night market food',
        location: '青云夜市',
      },
      {
        time: '21:30',
        activity: '自由活动/结束',
        activityEn: 'Free time / End',
        location: '夜市',
      },
    ],
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/liujiang-cruise-qingyun.jpeg',
    rating: 4.9,
    reviewCount: 345,
    description: '乘船游览柳江，感受两岸风光，再游青云',
    descriptionEn: 'Cruise along Liujiang River, then visit Qingyun',
    includes: ['游船票', '青云景区门票', '午餐', '导游', '保险'],
    includesEn: [
      'Cruise ticket',
      'Entry ticket',
      'Lunch',
      'Guide',
      'Insurance',
    ],
    excludes: ['个人消费', '船上午茶', '小费'],
    excludesEn: ['Personal expenses', 'Afternoon tea on boat', 'Tips'],
    meetingPoint: '柳江游船码头',
    meetingPointEn: 'Liujiang Cruise Pier',
    meetingTime: '09:00',
    itinerary: [
      {
        time: '09:00',
        activity: '游船码头集合',
        activityEn: 'Meet at pier',
        location: '柳江码头',
      },
      {
        time: '09:30',
        activity: '乘船游览柳江',
        activityEn: 'Liujiang cruise',
        location: '柳江',
      },
      {
        time: '11:30',
        activity: '下船前往青云',
        activityEn: 'Disembark to Qingyun',
        location: '青云',
      },
      {
        time: '12:30',
        activity: '午餐',
        activityEn: 'Lunch',
        location: '景区餐厅',
      },
      {
        time: '14:00',
        activity: '青云景区游览',
        activityEn: 'Qingyun tour',
        location: '青云景区',
      },
      {
        time: '16:30',
        activity: '结束行程',
        activityEn: 'Tour ends',
        location: '青云景区',
      },
    ],
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/zhuang-culture-2day-tour.jpeg',
    rating: 4.9,
    reviewCount: 234,
    description: '深入壮族村寨，体验少数民族文化',
    descriptionEn: 'Experience Zhuang minority culture',
    includes: ['特色住宿', '三餐', '交通', '导游', '表演票', '保险'],
    includesEn: [
      'Accommodation',
      '3 meals',
      'Transport',
      'Guide',
      'Show ticket',
      'Insurance',
    ],
    excludes: ['个人消费', '酒水', '小费'],
    excludesEn: ['Personal expenses', 'Alcohol', 'Tips'],
    meetingPoint: '柳州市中心集合点',
    meetingPointEn: 'Liuzhou City Center Meeting Point',
    meetingTime: '08:30',
    itinerary: [
      {
        time: '08:30',
        activity: '集合出发',
        activityEn: 'Meet and depart',
        location: '市中心',
      },
      {
        time: '10:30',
        activity: '抵达壮乡村寨',
        activityEn: 'Arrive at Zhuang village',
        location: '壮乡村寨',
      },
      {
        time: '12:00',
        activity: '特色午餐',
        activityEn: 'Lunch',
        location: '村寨',
      },
      {
        time: '14:00',
        activity: '民族表演',
        activityEn: 'Ethnic show',
        location: '表演场',
      },
      {
        time: '18:00',
        activity: '晚餐+入住',
        activityEn: 'Dinner + check-in',
        location: '民宿',
      },
      {
        time: '09:00',
        activity: '村寨游览',
        activityEn: 'Village tour',
        location: '壮乡村寨',
      },
      {
        time: '12:00',
        activity: '午餐',
        activityEn: 'Lunch',
        location: '村寨',
      },
      {
        time: '14:00',
        activity: '返回柳州',
        activityEn: 'Return to Liuzhou',
        location: '车上',
      },
      {
        time: '17:00',
        activity: '结束行程',
        activityEn: 'Tour ends',
        location: '市中心',
      },
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/heritage-crafts-experience.jpeg',
    rating: 4.8,
    reviewCount: 123,
    description: '学习传统手工艺，亲手制作纪念品',
    descriptionEn: 'Learn traditional crafts, make your own souvenir',
    includes: ['材料费', '非遗传承人指导', '茶点', '作品带走'],
    includesEn: [
      'Materials',
      'Master guidance',
      'Refreshments',
      'Take home creation',
    ],
    excludes: ['个人消费', '额外材料', '交通'],
    excludesEn: ['Personal expenses', 'Extra materials', 'Transportation'],
    meetingPoint: '非遗体验馆',
    meetingPointEn: 'Heritage Craft Center',
    meetingTime: '14:00',
    itinerary: [
      {
        time: '14:00',
        activity: '体验馆集合',
        activityEn: 'Meet at center',
        location: '非遗体验馆',
      },
      {
        time: '14:30',
        activity: '非遗传承人演示',
        activityEn: 'Master demo',
        location: '体验馆',
      },
      {
        time: '15:30',
        activity: '亲手制作',
        activityEn: 'Hands-on making',
        location: '体验馆',
      },
      {
        time: '17:00',
        activity: '作品展示/结束',
        activityEn: 'Showcase / End',
        location: '体验馆',
      },
    ],
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/photography-tour.jpeg',
    rating: 4.9,
    reviewCount: 89,
    description: '为摄影爱好者定制的最佳拍摄路线',
    descriptionEn: 'Best photo spots for photography enthusiasts',
    includes: ['门票', '专业摄影指导', '小食', '保险'],
    includesEn: ['Entry', 'Photography guide', 'Snacks', 'Insurance'],
    excludes: ['个人消费', '相机设备', '交通'],
    excludesEn: ['Personal expenses', 'Camera gear', 'Transportation'],
    meetingPoint: '青云景区入口',
    meetingPointEn: 'Qingyun Scenic Area Entrance',
    meetingTime: '05:30',
    itinerary: [
      {
        time: '05:30',
        activity: '集合出发',
        activityEn: 'Meet and depart',
        location: '青云景区',
      },
      {
        time: '06:00',
        activity: '日出拍摄',
        activityEn: 'Sunrise photography',
        location: '观景台',
      },
      {
        time: '08:00',
        activity: '早餐',
        activityEn: 'Breakfast',
        location: '景区餐厅',
      },
      {
        time: '09:30',
        activity: '古建筑拍摄',
        activityEn: 'Architecture photography',
        location: '古建筑群',
      },
      {
        time: '12:00',
        activity: '午餐',
        activityEn: 'Lunch',
        location: '景区餐厅',
      },
      {
        time: '14:00',
        activity: '人像/人文拍摄',
        activityEn: 'Portrait/cultural',
        location: '景区内',
      },
      {
        time: '17:00',
        activity: '结束行程',
        activityEn: 'Tour ends',
        location: '青云景区',
      },
    ],
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
    imageUrl: 'https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/Tour/family-tour.jpeg',
    rating: 4.8,
    reviewCount: 234,
    description: '适合带孩子的家庭，轻松愉快的旅行体验',
    descriptionEn: 'Perfect for families with children',
    includes: ['门票', '午餐', '亲子活动', '保险', '小礼物'],
    includesEn: [
      'Entry',
      'Lunch',
      'Family activities',
      'Insurance',
      'Small gift',
    ],
    excludes: ['个人消费', '额外活动', '交通'],
    excludesEn: ['Personal expenses', 'Extra activities', 'Transportation'],
    meetingPoint: '青云亲子活动中心',
    meetingPointEn: 'Qingyun Family Activity Center',
    meetingTime: '10:00',
    itinerary: [
      {
        time: '10:00',
        activity: '集合',
        activityEn: 'Meet',
        location: '亲子中心',
      },
      {
        time: '10:30',
        activity: '亲子游戏',
        activityEn: 'Family games',
        location: '活动区',
      },
      {
        time: '12:00',
        activity: '午餐',
        activityEn: 'Lunch',
        location: '亲子餐厅',
      },
      {
        time: '13:30',
        activity: '手工DIY',
        activityEn: 'Craft DIY',
        location: '手工坊',
      },
      {
        time: '15:30',
        activity: '景区探索',
        activityEn: 'Scenic exploration',
        location: '青云景区',
      },
      {
        time: '17:00',
        activity: '结束行程',
        activityEn: 'Tour ends',
        location: '青云景区',
      },
    ],
  },
];

function TourDetailPage() {
  const { user, login, register, logout } = useAuth();
  const params = useParams();
  const tourId = parseInt(params.id);
  const [language, setLanguage] = useState('中文');
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [wechatConfirm, setWechatConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);

  const tour = tourPackages.find((t) => t.id === tourId);

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
    const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
    setIsSaved(savedItems.some((item) => item.id === tourId));
  }, [user, tourId]);

  useEffect(() => {
    localStorage.setItem('tour_cart', JSON.stringify(cart));
  }, [cart]);

  if (!tour) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Tour not found</h1>
          <Link href="/tour" className="text-blue-600 mt-4 inline-block">
            ← Back to Tours
          </Link>
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
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const handleSave = () => {
    if (!user) {
      showNotification('请先登录');
      setShowLoginModal(true);
      return;
    }
    const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
    const exists = savedItems.find((item) => item.id === tourId);
    if (exists) {
      const newSaved = savedItems.filter((item) => item.id !== tourId);
      localStorage.setItem('saved_items', JSON.stringify(newSaved));
      setIsSaved(false);
      showNotification('已取消收藏');
    } else {
      savedItems.push({
        id: tourId,
        name: tour.name,
        price: tour.priceAdult,
        type: 'tour',
        image: tour.imageUrl,
      });
      localStorage.setItem('saved_items', JSON.stringify(savedItems));
      setIsSaved(true);
      showNotification('收藏成功');
    }
  };

  const calculateTotal = () => {
    return tour.priceAdult * adults + tour.priceChild * children;
  };

  const addToCart = () => {
    if (!user) {
      showNotification('请先登录');
      setShowLoginModal(true);
      return;
    }
    if (!selectedDate) {
      showNotification('请选择出发日期');
      return;
    }
    if (adults + children === 0) {
      showNotification('请选择人数');
      return;
    }
    const total = calculateTotal();
    const cartItem = {
      id: `${tour.id}_${selectedDate}`,
      tourId: tour.id,
      tourName: tour.name,
      date: selectedDate,
      adults: adults,
      children: children,
      total: total,
    };
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItem.id);
      if (existing) {
        showNotification('该日期的行程已在购物车中');
        return prevCart;
      }
      showNotification(`已添加 ${tour.name}`);
      return [...prevCart, cartItem];
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showNotification('已删除');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const grandTotal = cartTotal;

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification('请先添加行程');
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
      showNotification('请填写完整信息');
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
    showNotification('已退出登录');
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

      {/* Tour Detail */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/tour" className="text-blue-600 mb-4 inline-block">
          ← {t('返回行程列表', 'Back to Tours')}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={tour.imageUrl}
                alt={tour.name}
                className="w-full h-80 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold">
                {language === '中文' ? tour.name : tour.nameEn}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">⭐</span>
                <span>{tour.rating}</span>
                <span className="text-gray-400">
                  ({tour.reviewCount} {t('条评价', 'reviews')})
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  ⏱️ {language === '中文' ? tour.duration : tour.durationEn}
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  👥 {language === '中文' ? tour.groupSize : tour.groupSizeEn}
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                {language === '中文' ? tour.description : tour.descriptionEn}
              </p>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`w-full mt-4 py-3 rounded-xl font-semibold transition border ${
                  isSaved
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isSaved ? '⭐ 已收藏' : '☆ 收藏'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {t('行程概览', 'Overview')}
            </button>
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'itinerary'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {t('详细行程', 'Itinerary')}
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'info'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {t('预订须知', 'Info')}
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="font-bold text-lg mb-3">
                  {t('费用包含', 'Price Includes')}
                </h3>
                <ul className="space-y-1 mb-6">
                  {(language === '中文' ? tour.includes : tour.includesEn).map(
                    (item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> {item}
                      </li>
                    )
                  )}
                </ul>
                <h3 className="font-bold text-lg mb-3">
                  {t('费用不含', 'Price Excludes')}
                </h3>
                <ul className="space-y-1">
                  {(language === '中文' ? tour.excludes : tour.excludesEn).map(
                    (item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-red-500">✗</span> {item}
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">
                    {t('集合信息', 'Meeting Point')}
                  </h3>
                  <p>
                    📍{' '}
                    {language === '中文'
                      ? tour.meetingPoint
                      : tour.meetingPointEn}
                  </p>
                  <p>⏰ {tour.meetingTime}</p>
                </div>
              </div>
            )}
            {activeTab === 'itinerary' && (
              <div>
                <h3 className="font-bold text-lg mb-4">
                  {t('行程安排', 'Itinerary')}
                </h3>
                <div className="space-y-3">
                  {tour.itinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 pb-3 border-b last:border-0"
                    >
                      <div className="w-16 text-blue-600 font-medium">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {language === '中文'
                            ? item.activity
                            : item.activityEn}
                        </div>
                        <div className="text-sm text-gray-500">
                          📍 {item.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'info' && (
              <div>
                <h3 className="font-bold text-lg mb-3">
                  {t('预订须知', 'Booking Information')}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{' '}
                    {t(
                      '请提前3天预订',
                      'Please book at least 3 days in advance'
                    )}
                  </li>
                  <li>
                    •{' '}
                    {t(
                      '儿童价适用于1.2米以下儿童',
                      'Child price applies to children under 1.2m'
                    )}
                  </li>
                  <li>
                    •{' '}
                    {t(
                      '行程可能根据天气情况调整',
                      'Itinerary may be adjusted due to weather'
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {t('立即预订', 'Book Now')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('出发日期', 'Travel Date')}
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
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
                <span className="text-lg w-12 text-center">{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ¥{tour.priceAdult} / {t('人', 'person')}
              </div>
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
                <span className="text-lg w-12 text-center">{children}</span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ¥{tour.priceChild} / {t('人', 'person')}
              </div>
            </div>
          </div>
          {selectedDate && (adults > 0 || children > 0) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between py-2">
                <span>
                  {t('成人', 'Adults')} x {adults}
                </span>
                <span>¥{tour.priceAdult * adults}</span>
              </div>
              {children > 0 && (
                <div className="flex justify-between py-2">
                  <span>
                    {t('儿童', 'Children')} x {children}
                  </span>
                  <span>¥{tour.priceChild * children}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>{t('总计', 'Total')}:</span>
                <span className="text-blue-600">¥{calculateTotal()}</span>
              </div>
            </div>
          )}
          <button
            onClick={addToCart}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            🛒 {t('加入购物车', 'Add to Cart')}
          </button>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed right-4 top-24 w-80 bg-white rounded-xl shadow-lg p-4 z-50 max-h-[80vh] overflow-y-auto">
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
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-b pb-2"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.tourName}</p>
                      <p className="text-xs text-gray-400">
                        {item.date} | {t('成人', 'Adult')} {item.adults}{' '}
                        {item.children > 0
                          ? `+ ${t('儿童', 'Child')} ${item.children}`
                          : ''}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">¥{item.total}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 text-xs"
                      >
                        {t('删除', 'Del')}
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

      {!showCart && cart.length > 0 && (
        <div className="fixed bottom-20 right-4 z-40">
          <button
            onClick={() => setShowCart(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm"
          >
            🛒 {t('购物车', 'Cart')} ({cart.length})
          </button>
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
                <div className="border rounded-lg p-3 bg-gray-50">
                  <span>💚</span> {t('微信支付 (模拟)', 'WeChat Pay')}
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('订单总额', 'Total')}:</span>
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

export default function TourDetailWrapper() {
  return (
    <AuthProvider>
      <TourDetailPage />
    </AuthProvider>
  );
}
