'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

// Complete hotels data - ALL 14 hotels
const hotels = [
  {
    id: 1,
    name: '柳州万豪酒店',
    nameEn: 'Liuzhou Marriott Hotel',
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
    roomTypes: [
      {
        id: 101,
        name: '豪华大床房',
        nameEn: 'Deluxe King Room',
        price: 888,
        originalPrice: 1288,
        unit: '晚',
        capacity: 2,
        size: '45㎡',
        bedType: '特大床',
        breakfast: true,
      },
      {
        id: 102,
        name: '豪华双床房',
        nameEn: 'Deluxe Twin Room',
        price: 888,
        originalPrice: 1288,
        unit: '晚',
        capacity: 2,
        size: '45㎡',
        bedType: '双床',
        breakfast: true,
      },
      {
        id: 103,
        name: '行政套房',
        nameEn: 'Executive Suite',
        price: 1588,
        originalPrice: 2288,
        unit: '晚',
        capacity: 3,
        size: '80㎡',
        bedType: '特大床',
        breakfast: true,
        lounge: true,
      },
    ],
  },
  {
    id: 2,
    name: '柳州凯悦酒店',
    nameEn: 'Hyatt Regency Liuzhou',
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
    roomTypes: [
      {
        id: 201,
        name: '标准大床房',
        nameEn: 'Standard King Room',
        price: 788,
        originalPrice: 1088,
        unit: '晚',
        capacity: 2,
        size: '38㎡',
        bedType: '特大床',
        breakfast: true,
      },
      {
        id: 202,
        name: '标准双床房',
        nameEn: 'Standard Twin Room',
        price: 788,
        originalPrice: 1088,
        unit: '晚',
        capacity: 2,
        size: '38㎡',
        bedType: '双床',
        breakfast: true,
      },
      {
        id: 203,
        name: '凯悦套房',
        nameEn: 'Hyatt Suite',
        price: 1288,
        originalPrice: 1888,
        unit: '晚',
        capacity: 3,
        size: '65㎡',
        bedType: '特大床',
        breakfast: true,
        lounge: true,
      },
    ],
  },
  {
    id: 3,
    name: '青云精品酒店',
    nameEn: 'Qingyun Boutique Hotel',
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
    roomTypes: [
      {
        id: 301,
        name: '标准间',
        nameEn: 'Standard Room',
        price: 398,
        originalPrice: 598,
        unit: '晚',
        capacity: 2,
        size: '30㎡',
        bedType: '双床/大床',
        breakfast: true,
      },
      {
        id: 302,
        name: '豪华间',
        nameEn: 'Deluxe Room',
        price: 598,
        originalPrice: 888,
        unit: '晚',
        capacity: 2,
        size: '45㎡',
        bedType: '大床',
        breakfast: true,
        view: true,
      },
      {
        id: 303,
        name: '景观套房',
        nameEn: 'View Suite',
        price: 998,
        originalPrice: 1488,
        unit: '晚',
        capacity: 4,
        size: '70㎡',
        bedType: '双卧',
        breakfast: true,
        view: true,
      },
    ],
  },
  {
    id: 4,
    name: '柳州富力万达嘉华',
    nameEn: 'Wanda Realm Liuzhou',
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
    roomTypes: [
      {
        id: 401,
        name: '高级大床房',
        nameEn: 'Superior King Room',
        price: 458,
        originalPrice: 688,
        unit: '晚',
        capacity: 2,
        size: '40㎡',
        bedType: '特大床',
        breakfast: true,
      },
      {
        id: 402,
        name: '高级双床房',
        nameEn: 'Superior Twin Room',
        price: 458,
        originalPrice: 688,
        unit: '晚',
        capacity: 2,
        size: '40㎡',
        bedType: '双床',
        breakfast: true,
      },
      {
        id: 403,
        name: '行政房',
        nameEn: 'Executive Room',
        price: 688,
        originalPrice: 988,
        unit: '晚',
        capacity: 2,
        size: '55㎡',
        bedType: '大床',
        breakfast: true,
        lounge: true,
      },
    ],
  },
  {
    id: 5,
    name: '柳州宾馆',
    nameEn: 'Liuzhou Hotel',
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
    roomTypes: [
      {
        id: 501,
        name: '标准间',
        nameEn: 'Standard Room',
        price: 228,
        originalPrice: 358,
        unit: '晚',
        capacity: 2,
        size: '25㎡',
        bedType: '双床',
        breakfast: false,
      },
      {
        id: 502,
        name: '商务间',
        nameEn: 'Business Room',
        price: 328,
        originalPrice: 488,
        unit: '晚',
        capacity: 2,
        size: '35㎡',
        bedType: '大床',
        breakfast: true,
      },
    ],
  },
  {
    id: 6,
    name: '青云客栈',
    nameEn: 'Qingyun Inn',
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
    roomTypes: [
      {
        id: 601,
        name: '标准间',
        nameEn: 'Standard Room',
        price: 188,
        originalPrice: 288,
        unit: '晚',
        capacity: 2,
        size: '28㎡',
        bedType: '双床',
        breakfast: false,
      },
      {
        id: 602,
        name: '景观房',
        nameEn: 'View Room',
        price: 258,
        originalPrice: 388,
        unit: '晚',
        capacity: 2,
        size: '35㎡',
        bedType: '大床',
        breakfast: true,
        view: true,
      },
    ],
  },
  {
    id: 7,
    name: '柳州快捷酒店',
    nameEn: 'Liuzhou Express Hotel',
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
    roomTypes: [
      {
        id: 701,
        name: '标准间',
        nameEn: 'Standard Room',
        price: 128,
        originalPrice: 198,
        unit: '晚',
        capacity: 2,
        size: '20㎡',
        bedType: '双床',
        breakfast: false,
      },
    ],
  },
  {
    id: 8,
    name: '青云青旅',
    nameEn: 'Qingyun Youth Hostel',
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
    roomTypes: [
      {
        id: 801,
        name: '床位',
        nameEn: 'Dorm Bed',
        price: 68,
        originalPrice: 98,
        unit: '床',
        capacity: 1,
        size: '8㎡',
        bedType: '单人床',
        breakfast: false,
      },
      {
        id: 802,
        name: '私人间',
        nameEn: 'Private Room',
        price: 168,
        originalPrice: 238,
        unit: '晚',
        capacity: 2,
        size: '15㎡',
        bedType: '双床',
        breakfast: false,
      },
    ],
  },
  {
    id: 9,
    name: '青云小院',
    nameEn: 'Qingyun Courtyard',
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
    roomTypes: [
      {
        id: 901,
        name: '庭院房',
        nameEn: 'Courtyard Room',
        price: 258,
        originalPrice: 388,
        unit: '晚',
        capacity: 2,
        size: '30㎡',
        bedType: '大床',
        breakfast: true,
      },
      {
        id: 902,
        name: '家庭套房',
        nameEn: 'Family Suite',
        price: 458,
        originalPrice: 688,
        unit: '晚',
        capacity: 4,
        size: '60㎡',
        bedType: '双卧',
        breakfast: true,
      },
    ],
  },
  {
    id: 10,
    name: '柳州山居',
    nameEn: 'Liuzhou Mountain Retreat',
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
    roomTypes: [
      {
        id: 1001,
        name: '山景房',
        nameEn: 'Mountain View Room',
        price: 328,
        originalPrice: 488,
        unit: '晚',
        capacity: 2,
        size: '35㎡',
        bedType: '大床',
        breakfast: true,
        view: true,
      },
    ],
  },
  {
    id: 11,
    name: '青云温泉度假村',
    nameEn: 'Qingyun Hot Spring Resort',
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
    roomTypes: [
      {
        id: 1101,
        name: '温泉房',
        nameEn: 'Hot Spring Room',
        price: 688,
        originalPrice: 988,
        unit: '晚',
        capacity: 2,
        size: '45㎡',
        bedType: '大床',
        breakfast: true,
        spa: true,
      },
      {
        id: 1102,
        name: '家庭温泉套房',
        nameEn: 'Family Hot Spring Suite',
        price: 1088,
        originalPrice: 1588,
        unit: '晚',
        capacity: 4,
        size: '80㎡',
        bedType: '双卧',
        breakfast: true,
        spa: true,
      },
    ],
  },
  {
    id: 12,
    name: '柳州中心酒店',
    nameEn: 'Liuzhou Central Hotel',
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
    roomTypes: [
      {
        id: 1201,
        name: '商务房',
        nameEn: 'Business Room',
        price: 298,
        originalPrice: 458,
        unit: '晚',
        capacity: 2,
        size: '35㎡',
        bedType: '大床',
        breakfast: true,
      },
    ],
  },
  {
    id: 13,
    name: '柳江田园民宿',
    nameEn: 'Liujiang Farmstay',
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
    roomTypes: [
      {
        id: 1301,
        name: '田园房',
        nameEn: 'Farmstay Room',
        price: 188,
        originalPrice: 288,
        unit: '晚',
        capacity: 2,
        size: '25㎡',
        bedType: '大床',
        breakfast: true,
      },
    ],
  },
  {
    id: 14,
    name: '青秀山居',
    nameEn: 'Qingxiu Mountain Lodge',
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
    roomTypes: [
      {
        id: 1401,
        name: '山景房',
        nameEn: 'Mountain View Room',
        price: 358,
        originalPrice: 528,
        unit: '晚',
        capacity: 2,
        size: '35㎡',
        bedType: '大床',
        breakfast: true,
        view: true,
      },
    ],
  },
];

const amenitiesList = {
  wifi: { name: 'WiFi', nameEn: 'WiFi', icon: '📶' },
  parking: { name: '停车场', nameEn: 'Parking', icon: '🅿️' },
  restaurant: { name: '餐厅', nameEn: 'Restaurant', icon: '🍽️' },
  pool: { name: '游泳池', nameEn: 'Pool', icon: '🏊' },
  gym: { name: '健身房', nameEn: 'Gym', icon: '💪' },
  spa: { name: '水疗中心', nameEn: 'Spa', icon: '💆' },
};

function HotelDetailPage() {
  const { user, login, register, logout } = useAuth();
  const params = useParams();
  const hotelId = parseInt(params.id);
  const [language, setLanguage] = useState('中文');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [nights, setNights] = useState(1);
  const [rooms, setRooms] = useState(1);
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
  const [isSaved, setIsSaved] = useState(false);

  const hotel = hotels.find((h) => h.id === hotelId);

  useEffect(() => {
    if (
      hotel &&
      hotel.roomTypes &&
      hotel.roomTypes.length > 0 &&
      !selectedRoom
    ) {
      setSelectedRoom(hotel.roomTypes[0]);
    }
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
    const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
    setIsSaved(savedItems.some((item) => item.id === hotelId));
  }, [hotel, user]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 1);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    localStorage.setItem('hotel_cart', JSON.stringify(cart));
  }, [cart]);

  if (!hotel) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Hotel not found</h1>
          <Link href="/hotel" className="text-blue-600 mt-4 inline-block">
            ← Back to Hotels
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
    const exists = savedItems.find((item) => item.id === hotelId);
    if (exists) {
      const newSaved = savedItems.filter((item) => item.id !== hotelId);
      localStorage.setItem('saved_items', JSON.stringify(newSaved));
      setIsSaved(false);
      showNotification('已取消收藏');
    } else {
      savedItems.push({
        id: hotelId,
        name: hotel.name,
        price: hotel.price,
        type: 'hotel',
        image: hotel.imageUrl,
      });
      localStorage.setItem('saved_items', JSON.stringify(savedItems));
      setIsSaved(true);
      showNotification('收藏成功');
    }
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * nights * rooms;
  };

  const addToCart = () => {
    if (!user) {
      showNotification('请先登录');
      setShowLoginModal(true);
      return;
    }
    if (!checkInDate || !checkOutDate) {
      showNotification('请选择入住和离店日期');
      return;
    }
    const total = calculateTotal();
    const cartItem = {
      id: `${hotel.id}_${selectedRoom.id}_${checkInDate}`,
      hotelId: hotel.id,
      roomId: selectedRoom.id,
      hotelName: hotel.name,
      roomName: selectedRoom.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: nights,
      rooms: rooms,
      pricePerNight: selectedRoom.price,
      total: total,
    };
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItem.id);
      if (existing) {
        showNotification('该日期已有预订');
        return prevCart;
      }
      showNotification(`已添加 ${hotel.name} - ${selectedRoom.name}`);
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
      showNotification('请先添加酒店');
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
      showNotification('请填写完整信息');
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
                    {item.hotelName} - {item.roomName} x{item.rooms}
                    {t('间', '')}
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

      {/* Hotel Detail */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/hotel" className="text-blue-600 mb-4 inline-block">
          ← {t('返回酒店列表', 'Back to Hotels')}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="w-full h-80 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold">
                {language === '中文' ? hotel.name : hotel.nameEn}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">⭐</span>
                <span>{hotel.rating}</span>
                <span className="text-gray-400">
                  ({hotel.reviewCount} {t('条评价', 'reviews')})
                </span>
              </div>
              <p className="text-gray-500 mt-2">
                📍{' '}
                {language === '中文'
                  ? hotel.locationName
                  : hotel.locationNameEn}
              </p>
              <p className="text-gray-600 mt-4">
                {language === '中文' ? hotel.description : hotel.descriptionEn}
              </p>

              {/* Amenities */}
              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  {t('酒店设施', 'Amenities')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.facilities.map((amenity) => (
                    <span
                      key={amenity}
                      className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {amenitiesList[amenity]?.icon}{' '}
                      {language === '中文'
                        ? amenitiesList[amenity]?.name
                        : amenitiesList[amenity]?.nameEn}
                    </span>
                  ))}
                </div>
              </div>

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

        {/* Room Selection */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {t('选择房型', 'Select Room Type')}
          </h2>
          <div className="space-y-4">
            {hotel.roomTypes.map((room) => (
              <div
                key={room.id}
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  selectedRoom?.id === room.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold text-lg">
                      {language === '中文' ? room.name : room.nameEn}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                      <span>🛏️ {room.bedType}</span>
                      <span>📐 {room.size}</span>
                      <span>
                        👥 {t('可住', 'Sleeps')} {room.capacity}
                      </span>
                      {room.breakfast && (
                        <span className="text-green-600">
                          🍳 {t('含早餐', 'Breakfast included')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ¥{room.price}
                    </div>
                    <div className="text-xs text-gray-400 line-through">
                      ¥{room.originalPrice}
                    </div>
                    <div className="text-xs text-gray-500">/{room.unit}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {t('预订信息', 'Booking Information')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('入住日期', 'Check-in Date')}
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('离店日期', 'Check-out Date')}
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('房间数量', 'Number of Rooms')}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg w-12 text-center">{rooms}</span>
                <button
                  onClick={() => setRooms(rooms + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('入住天数', 'Nights')}
              </label>
              <div className="text-lg font-medium">
                {nights} {t('晚', 'nights')}
              </div>
            </div>
          </div>

          {selectedRoom && checkInDate && checkOutDate && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between py-2">
                <span>
                  {selectedRoom.name} x {rooms}
                  {t('间', '')} x {nights}
                  {t('晚', '')}
                </span>
                <span>¥{selectedRoom.price * nights * rooms}</span>
              </div>
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
                      <p className="font-medium text-sm">{item.hotelName}</p>
                      <p className="text-xs text-gray-400">
                        {item.roomName} | {item.checkIn}~{item.checkOut}
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

export default function HotelDetailWrapper() {
  return (
    <AuthProvider>
      <HotelDetailPage />
    </AuthProvider>
  );
}
