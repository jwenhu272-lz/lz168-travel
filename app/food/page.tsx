'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

// Food Categories
const foodCategories = [
  { id: 'all', name: '全部', nameEn: 'All', icon: '🍽️' },
  { id: 'nightmarket', name: '青云夜市', nameEn: 'Night Market', icon: '🌙' },
  { id: 'luosifen', name: '螺蛳粉', nameEn: 'Luosifen', icon: '🍜' },
  { id: 'giftbox', name: '特产礼盒', nameEn: 'Gift Boxes', icon: '🎁' },
  { id: 'drinks', name: '特色饮品', nameEn: 'Drinks', icon: '🥤' },
  { id: 'delivery', name: '外卖配送', nameEn: 'Delivery', icon: '🚚' },
];

// Food Products
const foodProducts = [
  {
    id: 1,
    name: '青云烤串',
    nameEn: 'Qingyun BBQ Skewers',
    category: 'nightmarket',
    price: 15,
    originalPrice: 20,
    unit: '串',
    imageUrl: 'https://i.imgur.com/SSlCA9P.jpeg',
    seller: '青云夜市A区',
    rating: 4.8,
    reviewCount: 234,
    stock: 999,
    deliveryType: 'local',
    description: '炭火烤制，秘制酱料',
  },
  {
    id: 2,
    name: '柳州炒螺',
    nameEn: 'Liuzhou Fried Snails',
    category: 'nightmarket',
    price: 25,
    originalPrice: 30,
    unit: '份',
    imageUrl: 'https://i.imgur.com/ipk92lv.jpeg',
    seller: '青云老字号',
    rating: 4.7,
    reviewCount: 189,
    stock: 500,
    deliveryType: 'local',
    description: '香辣入味，下酒好菜',
  },
  {
    id: 3,
    name: '烤生蚝',
    nameEn: 'Grilled Oysters',
    category: 'nightmarket',
    price: 30,
    originalPrice: 45,
    unit: '6只',
    imageUrl: 'https://i.imgur.com/mc0jOK7.jpeg',
    seller: '青云海鲜档',
    rating: 4.9,
    reviewCount: 456,
    stock: 300,
    deliveryType: 'local',
    description: '蒜蓉烤生蚝，新鲜肥美',
  },
  {
    id: 4,
    name: '青云豆腐花',
    nameEn: 'Qingyun Tofu Pudding',
    category: 'nightmarket',
    price: 8,
    originalPrice: 12,
    unit: '碗',
    imageUrl: 'https://i.imgur.com/GgGZHC3.jpeg',
    seller: '青云甜品店',
    rating: 4.6,
    reviewCount: 167,
    stock: 999,
    deliveryType: 'local',
    description: '甜咸可选，滑嫩可口',
  },
  {
    id: 5,
    name: '烤茄子',
    nameEn: 'Grilled Eggplant',
    category: 'nightmarket',
    price: 12,
    originalPrice: 18,
    unit: '份',
    imageUrl: 'https://i.imgur.com/aFCBq7p.jpeg',
    seller: '青云烧烤档',
    rating: 4.5,
    reviewCount: 89,
    stock: 500,
    deliveryType: 'local',
    description: '蒜蓉烤茄子，软糯入味',
  },
  {
    id: 6,
    name: '炒田螺',
    nameEn: 'Stir-fried Snails',
    category: 'nightmarket',
    price: 28,
    originalPrice: 38,
    unit: '份',
    imageUrl: 'https://i.imgur.com/NIVy2T9.jpeg',
    seller: '青云螺味馆',
    rating: 4.7,
    reviewCount: 145,
    stock: 400,
    deliveryType: 'local',
    description: '紫苏炒田螺，香辣鲜美',
  },
  {
    id: 7,
    name: '铁板鱿鱼',
    nameEn: 'Teppanyaki Squid',
    category: 'nightmarket',
    price: 20,
    originalPrice: 28,
    unit: '份',
    imageUrl: 'https://i.imgur.com/mT8rzQP.jpeg',
    seller: '青云铁板烧',
    rating: 4.8,
    reviewCount: 234,
    stock: 300,
    deliveryType: 'local',
    description: '铁板鱿鱼，Q弹入味',
  },
  {
    id: 8,
    name: '现煮螺蛳粉',
    nameEn: 'Fresh Luosifen',
    category: 'luosifen',
    price: 18,
    originalPrice: 25,
    unit: '碗',
    imageUrl: 'https://i.imgur.com/o00XI2u.jpeg',
    seller: '青云螺蛳粉总店',
    rating: 4.9,
    reviewCount: 1234,
    stock: 999,
    deliveryType: 'local',
    description: '现点现煮，正宗柳州味',
  },
  {
    id: 9,
    name: '螺蛳粉礼盒装',
    nameEn: 'Luosifen Gift Box',
    category: 'luosifen',
    price: 68,
    originalPrice: 88,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/LgCdOmj.jpeg',
    seller: '柳州螺蛳粉集团',
    rating: 4.8,
    reviewCount: 567,
    stock: 1000,
    deliveryType: 'shipping',
    description: '送礼佳品，全国配送',
  },
  {
    id: 10,
    name: '螺蛳粉家庭装',
    nameEn: 'Family Pack',
    category: 'luosifen',
    price: 128,
    originalPrice: 168,
    unit: '5包装',
    imageUrl: 'https://i.imgur.com/vy5fy6a.jpeg',
    seller: '柳州螺蛳粉集团',
    rating: 4.7,
    reviewCount: 234,
    stock: 2000,
    deliveryType: 'shipping',
    description: '家庭囤货装，超值优惠',
  },
  {
    id: 11,
    name: '干捞螺蛳粉',
    nameEn: 'Dry Luosifen',
    category: 'luosifen',
    price: 20,
    originalPrice: 28,
    unit: '碗',
    imageUrl: 'https://i.imgur.com/9Cctket.jpeg',
    seller: '青云螺蛳粉总店',
    rating: 4.8,
    reviewCount: 345,
    stock: 500,
    deliveryType: 'local',
    description: '干捞做法，味道更浓郁',
  },
  {
    id: 12,
    name: '螺蛳鸭脚煲',
    nameEn: 'Duck Feet Pot',
    category: 'luosifen',
    price: 48,
    originalPrice: 68,
    unit: '煲',
    imageUrl: 'https://i.imgur.com/qUiwHmH.jpeg',
    seller: '青云特色煲',
    rating: 4.9,
    reviewCount: 567,
    stock: 200,
    deliveryType: 'local',
    description: '螺蛳汤底，鸭脚软糯',
  },
  {
    id: 13,
    name: '柳州特产礼盒',
    nameEn: 'Liuzhou Gift Box',
    category: 'giftbox',
    price: 168,
    originalPrice: 228,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/ystBRo2.jpeg',
    seller: '青云手信',
    rating: 4.9,
    reviewCount: 345,
    stock: 500,
    deliveryType: 'shipping',
    description: '螺蛳粉+云片糕+罗汉果茶',
  },
  {
    id: 14,
    name: '青云夜市礼包',
    nameEn: 'Night Market Pack',
    category: 'giftbox',
    price: 98,
    originalPrice: 128,
    unit: '袋',
    imageUrl: 'https://i.imgur.com/hV5LDeK.jpeg',
    seller: '青云手信',
    rating: 4.6,
    reviewCount: 123,
    stock: 800,
    deliveryType: 'shipping',
    description: '夜市小吃精选组合',
  },
  {
    id: 15,
    name: '柳州云片糕礼盒',
    nameEn: 'Cloud Cake Box',
    category: 'giftbox',
    price: 58,
    originalPrice: 78,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/vbpRKWz.jpeg',
    seller: '柳州老字号',
    rating: 4.5,
    reviewCount: 89,
    stock: 600,
    deliveryType: 'shipping',
    description: '传统云片糕，绵软香甜',
  },
  {
    id: 16,
    name: '螺蛳粉超大礼包',
    nameEn: 'Super Gift Pack',
    category: 'giftbox',
    price: 258,
    originalPrice: 328,
    unit: '盒',
    imageUrl: 'https://i.imgur.com/vbpRKWz.jpeg',
    seller: '柳州特产商城',
    rating: 4.9,
    reviewCount: 678,
    stock: 300,
    deliveryType: 'shipping',
    description: '10包装螺蛳粉+特产组合',
  },
  {
    id: 17,
    name: '甘蔗汁',
    nameEn: 'Sugarcane Juice',
    category: 'drinks',
    price: 8,
    originalPrice: 12,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/o2CSk8s.jpeg',
    seller: '青云饮品店',
    rating: 4.5,
    reviewCount: 89,
    stock: 999,
    deliveryType: 'local',
    description: '鲜榨甘蔗汁，清甜解渴',
  },
  {
    id: 18,
    name: '罗汉果茶',
    nameEn: 'Luohanguo Tea',
    category: 'drinks',
    price: 12,
    originalPrice: 18,
    unit: '瓶',
    imageUrl: 'https://i.imgur.com/ybIPQXm.jpeg',
    seller: '广西特产',
    rating: 4.7,
    reviewCount: 67,
    stock: 2000,
    deliveryType: 'shipping',
    description: '润肺止咳，广西特产',
  },
  {
    id: 19,
    name: '酸梅汤',
    nameEn: 'Sour Plum Drink',
    category: 'drinks',
    price: 6,
    originalPrice: 10,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/g6S8Yi6.jpeg',
    seller: '青云饮品店',
    rating: 4.6,
    reviewCount: 123,
    stock: 999,
    deliveryType: 'local',
    description: '自制酸梅汤，解腻开胃',
  },
  {
    id: 20,
    name: '玉米汁',
    nameEn: 'Corn Juice',
    category: 'drinks',
    price: 10,
    originalPrice: 15,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/p4wEX3v.jpeg',
    seller: '青云饮品店',
    rating: 4.4,
    reviewCount: 56,
    stock: 999,
    deliveryType: 'local',
    description: '鲜榨玉米汁，香浓顺滑',
  },
  {
    id: 21,
    name: '茅根竹蔗水',
    nameEn: 'Herbal Drink',
    category: 'drinks',
    price: 10,
    originalPrice: 15,
    unit: '杯',
    imageUrl: 'https://i.imgur.com/1MbXg4U.jpeg',
    seller: '青云凉茶铺',
    rating: 4.7,
    reviewCount: 234,
    stock: 500,
    deliveryType: 'local',
    description: '清热解渴，传统凉茶',
  },
  {
    id: 22,
    name: '麻辣烫套餐',
    nameEn: 'Mala Tang Set',
    category: 'delivery',
    price: 35,
    originalPrice: 48,
    unit: '份',
    imageUrl: 'https://i.imgur.com/VljUFVz.jpeg',
    seller: '青云麻辣烫',
    rating: 4.6,
    reviewCount: 234,
    stock: 999,
    deliveryType: 'local',
    description: '自选麻辣烫，送米饭',
  },
  {
    id: 23,
    name: '炒饭便当',
    nameEn: 'Fried Rice Bento',
    category: 'delivery',
    price: 22,
    originalPrice: 28,
    unit: '份',
    imageUrl: 'https://i.imgur.com/RIMIksQ.jpeg',
    seller: '青云快餐',
    rating: 4.4,
    reviewCount: 156,
    stock: 999,
    deliveryType: 'local',
    description: '特色炒饭+小菜+例汤',
  },
  {
    id: 24,
    name: '黄焖鸡米饭',
    nameEn: 'Braised Chicken',
    category: 'delivery',
    price: 28,
    originalPrice: 38,
    unit: '份',
    imageUrl: 'https://i.imgur.com/Z2WcKxF.jpeg',
    seller: '青云黄焖鸡',
    rating: 4.7,
    reviewCount: 234,
    stock: 500,
    deliveryType: 'local',
    description: '秘制黄焖鸡，配米饭',
  },
  {
    id: 25,
    name: '牛腩饭',
    nameEn: 'Beef Brisket Rice',
    category: 'delivery',
    price: 32,
    originalPrice: 42,
    unit: '份',
    imageUrl: 'https://i.imgur.com/QzSj9cI.jpeg',
    seller: '青云牛腩饭',
    rating: 4.8,
    reviewCount: 189,
    stock: 400,
    deliveryType: 'local',
    description: '慢炖牛腩，软烂入味',
  },
  {
    id: 26,
    name: '叉烧饭',
    nameEn: 'BBQ Pork Rice',
    category: 'delivery',
    price: 26,
    originalPrice: 35,
    unit: '份',
    imageUrl: 'https://i.imgur.com/BocC3SG.jpeg',
    seller: '青云烧腊',
    rating: 4.6,
    reviewCount: 145,
    stock: 500,
    deliveryType: 'local',
    description: '蜜汁叉烧，配例汤',
  },
];

function FoodPageContent() {
  const { user, login, register, logout } = useAuth();
  const [language, setLanguage] = useState('中文');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('ordering');
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('local');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [wechatConfirm, setWechatConfirm] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('food_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }
    if (user) {
      setCustomerName(user.name || '');
      setCustomerPhone(user.phone || '');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('food_cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => {
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const filteredByCategory =
    selectedCategory === 'all'
      ? foodProducts
      : foodProducts.filter((p) => p.category === selectedCategory);

  const filteredProducts = filteredByCategory.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = (
      language === '中文' ? product.name : product.nameEn
    ).toLowerCase();
    const seller = product.seller.toLowerCase();
    return name.includes(query) || seller.includes(query);
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        const newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        showNotification(`已添加 ${product.name}`);
        return newCart;
      }
      showNotification(`已添加 ${product.name}`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = (item.quantity || 1) + delta;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showNotification('已删除');
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const serviceFee = cartTotal > 0 ? (deliveryMethod === 'local' ? 3 : 8) : 0;
  const grandTotal = cartTotal + serviceFee;

  const handleCheckout = () => {
    if (!user) {
      showNotification('请先登录');
      setShowLoginModal(true);
      return;
    }
    if (cart.length === 0) {
      showNotification('请先添加商品');
      return;
    }
    setCheckoutStep('checkout');
  };

  const sendWeChatConfirmation = (order) => {
    setWechatConfirm({
      title: '订单已接收',
      message: `您已成功下单 ${order.items.length} 件商品，总计 ¥${order.total}`,
      orderNumber: order.orderNumber,
      eta:
        order.deliveryMethod === 'local'
          ? '预计30-60分钟送达'
          : '预计2-5天送达',
    });
    setTimeout(() => setWechatConfirm(null), 5000);
  };

  const submitOrder = () => {
    if (!customerName || !customerPhone || !deliveryAddress) {
      showNotification('请填写完整信息');
      return;
    }
    const newOrderNumber = `LZ${Date.now()}`;
    setOrderNumber(newOrderNumber);

    const order = {
      orderNumber: newOrderNumber,
      items: cart,
      total: grandTotal,
      customer: {
        name: customerName,
        phone: customerPhone,
        address: deliveryAddress,
        wechatId: user?.phone,
      },
      deliveryMethod,
      date: new Date().toISOString(),
      status: 'preparing',
    };

    const orders = JSON.parse(localStorage.getItem('food_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('food_orders', JSON.stringify(orders));
    localStorage.removeItem('food_cart');
    setCart([]);
    sendWeChatConfirmation(order);
    setCheckoutStep('confirmation');
  };

  const continueShopping = () => {
    setCheckoutStep('ordering');
    setCustomerName(user?.name || '');
    setCustomerPhone(user?.phone || '');
    setDeliveryAddress('');
    setDeliveryMethod('local');
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
              {t('订单已确认', 'Order Confirmed')}
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
                    {item.name} x {item.quantity}
                  </span>
                  <span>¥{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                <span>{t('合计', 'Total')}:</span>
                <span>¥{grandTotal}</span>
              </div>
            </div>
            <Link
              href="/food"
              onClick={continueShopping}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              {t('继续购物', 'Continue Shopping')}
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
            <p className="text-xs text-green-600 mt-1">{wechatConfirm.eta}</p>
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
                  placeholder={t('搜索美食...', 'Search food...')}
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
                    {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">
            🍜 {t('青云美食', 'Qingyun Food')}
          </h1>
          <p className="text-gray-500 text-sm">
            {t(
              '青云市场 · 地道柳州味',
              'Qingyun Market · Authentic Liuzhou Flavors'
            )}
          </p>
        </div>
      </div>

      <div className="bg-white border-b sticky top-[57px] md:top-[73px] z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {foodCategories.map((cat) => (
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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                {t('暂无商品', 'No products found')}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/food/${product.id}`}
                    key={product.id}
                    className="block"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group cursor-pointer">
                      <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        {product.rating >= 4.8 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            🔥 {t('热卖', 'Hot')}
                          </div>
                        )}
                        {product.deliveryType === 'shipping' && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            📦
                          </div>
                        )}
                      </div>
                      <div className="p-2 md:p-3">
                        <div className="flex justify-between items-start gap-1">
                          <div className="flex-1">
                            <h3 className="font-bold text-xs md:text-sm line-clamp-1">
                              {language === '中文'
                                ? product.name
                                : product.nameEn}
                            </h3>
                            <p className="text-xs text-gray-400 truncate">
                              {product.seller}
                            </p>
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0">
                            <span className="text-yellow-500 text-xs">⭐</span>
                            <span className="text-xs">{product.rating}</span>
                          </div>
                        </div>
                        <div className="mt-1 flex items-baseline gap-1 flex-wrap">
                          <span className="text-sm md:text-base font-bold text-blue-600">
                            ¥{product.price}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ¥{product.originalPrice}
                          </span>
                          <span className="text-xs text-gray-400">
                            /{product.unit}
                          </span>
                        </div>
                        <div className="mt-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                            className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-xs md:text-sm hover:bg-blue-700 transition"
                          >
                            {t('加入购物车', 'Add')}
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
                <h2 className="text-lg md:text-xl font-bold">
                  {t('购物车', 'Cart')}
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
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
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ¥{item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 text-xs ml-1"
                          >
                            {t('删除', 'Del')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t('小计', 'Subtotal')}:
                      </span>
                      <span>¥{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{t('配送费', 'Delivery')}:</span>
                      <span>¥{serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                      <span>{t('合计', 'Total')}:</span>
                      <span className="text-blue-600">¥{grandTotal}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
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
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm"
          >
            🛒 {t('购物车', 'Cart')} (
            {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})
          </button>
        </div>
      )}

      {checkoutStep === 'checkout' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold">
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
                    {t('配送地址', 'Address')}
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('配送方式', 'Delivery Method')}
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="local">
                      {t('本地配送 (30-60分钟)', 'Local Delivery')}
                    </option>
                    <option value="shipping">
                      {t('快递配送 (2-5天)', 'Shipping')}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('支付方式', 'Payment')}
                  </label>
                  <div className="border rounded-lg p-3 bg-gray-50 flex items-center gap-2">
                    <span>💚</span> {t('微信支付 (模拟)', 'WeChat Pay (Mock)')}
                  </div>
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('订单总额', 'Order Total')}:</span>
                    <span className="text-blue-600">¥{grandTotal}</span>
                  </div>
                </div>
                <button
                  onClick={submitOrder}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition mt-4"
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

export default function FoodPage() {
  return (
    <AuthProvider>
      <FoodPageContent />
    </AuthProvider>
  );
}
