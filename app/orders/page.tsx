'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

function OrdersPageContent() {
  const { user } = useAuth();
  const [language, setLanguage] = useState('中文');
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // Load all orders from localStorage
    const allOrders = [];

    // Load food orders
    const foodOrders = JSON.parse(localStorage.getItem('food_orders') || '[]');
    foodOrders.forEach((order) => {
      order.type = 'food';
      allOrders.push(order);
    });

    // Load hotel orders
    const hotelOrders = JSON.parse(
      localStorage.getItem('hotel_orders') || '[]'
    );
    hotelOrders.forEach((order) => {
      order.type = 'hotel';
      allOrders.push(order);
    });

    // Load tour orders
    const tourOrders = JSON.parse(localStorage.getItem('tour_orders') || '[]');
    tourOrders.forEach((order) => {
      order.type = 'tour';
      allOrders.push(order);
    });

    // Sort by date (newest first)
    allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(allOrders);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const t = (zh, en) => (language === '中文' ? zh : en);

  const getOrderIcon = (type) => {
    switch (type) {
      case 'food':
        return '🍜';
      case 'hotel':
        return '🏨';
      case 'tour':
        return '🏔️';
      default:
        return '📋';
    }
  };

  const getStatusText = (order) => {
    const orderDate = new Date(order.date);
    const now = new Date();
    const hoursDiff = (now - orderDate) / (1000 * 60 * 60);

    if (hoursDiff < 1) return t('准备中', 'Preparing');
    if (hoursDiff < 2) return t('配送中', 'Delivering');
    return t('已完成', 'Completed');
  };

  const getStatusColor = (order) => {
    const orderDate = new Date(order.date);
    const now = new Date();
    const hoursDiff = (now - orderDate) / (1000 * 60 * 60);

    if (hoursDiff < 1) return 'text-yellow-600 bg-yellow-50';
    if (hoursDiff < 2) return 'text-blue-600 bg-blue-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex gap-4 items-center">
              <button onClick={toggleLanguage} className="text-xl">
                🌐 <span className="text-xs ml-1">{language}</span>
              </button>
              <Link href="/profile" className="text-xl hover:text-blue-600">
                👤
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Title */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">
            📋 {t('我的订单', 'My Orders')}
          </h1>
          <p className="text-gray-500 text-sm">
            {t('查看所有历史订单', 'View all your past orders')}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {!user ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔐</div>
            <p className="text-gray-500 mb-4">
              {t('请先登录查看订单', 'Please login to view orders')}
            </p>
            <Link
              href="/profile"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block"
            >
              {t('去登录', 'Go to Login')}
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 mb-4">
              {t('暂无订单', 'No orders yet')}
            </p>
            <Link
              href="/food"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block"
            >
              {t('去购物', 'Start Shopping')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getOrderIcon(order.type)}</span>
                    <span className="font-mono text-sm">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.date).toLocaleString()}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      order
                    )}`}
                  >
                    {getStatusText(order)}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  {order.items ? (
                    order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between py-2 border-b last:border-0"
                      >
                        <div>
                          <span className="font-medium">
                            {item.name || item.hotelName || item.tourName}
                          </span>
                          {item.date && (
                            <span className="text-gray-400 text-sm ml-2">
                              📅 {item.date}
                            </span>
                          )}
                          {item.nights && (
                            <span className="text-gray-400 text-sm ml-2">
                              🏨 {item.nights}
                              {t('晚', ' nights')}
                            </span>
                          )}
                          {item.adults && (
                            <span className="text-gray-400 text-sm ml-2">
                              👥 {item.adults}
                              {t('成人', 'A')}
                            </span>
                          )}
                          <span className="text-gray-400 text-sm ml-2">
                            x{item.quantity || 1}
                          </span>
                        </div>
                        <span>
                          ¥{item.price * (item.quantity || 1) || item.total}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between py-2">
                      <span>
                        {order.type === 'food'
                          ? '🍜 美食订单'
                          : order.type === 'hotel'
                          ? '🏨 酒店订单'
                          : '🏔️ 旅游订单'}
                      </span>
                      <span>¥{order.total}</span>
                    </div>
                  )}
                  <div className="mt-3 pt-2 border-t flex justify-between font-bold">
                    <span>{t('合计', 'Total')}:</span>
                    <span className="text-blue-600">¥{order.total}</span>
                  </div>
                  {order.customer && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>📍 {order.customer.address}</p>
                      <p>📞 {order.customer.phone}</p>
                    </div>
                  )}
                </div>

                {/* Order Actions */}
                <div className="bg-gray-50 px-4 py-2 flex gap-3">
                  <button
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.orderNumber
                          ? null
                          : order.orderNumber
                      )
                    }
                    className="text-blue-600 text-sm"
                  >
                    {expandedOrder === order.orderNumber
                      ? t('收起详情', 'Hide Details')
                      : t('查看详情', 'View Details')}
                  </button>
                  <button
                    onClick={() => (window.location.href = '/food')}
                    className="text-green-600 text-sm ml-auto"
                  >
                    {t('再次购买', 'Reorder')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </main>
  );
}

export default function OrdersPage() {
  return (
    <AuthProvider>
      <OrdersPageContent />
    </AuthProvider>
  );
}
