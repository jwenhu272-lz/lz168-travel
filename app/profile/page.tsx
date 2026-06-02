'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import BottomNav from '@/components/BottomNav';
import Logo from '@/components/Logo';
import AIChatbot from '@/components/AIChatbot';

const membershipTiers = {
  bronze: {
    name: '青铜会员',
    nameEn: 'Bronze',
    minPoints: 0,
    maxPoints: 499,
    color: '#CD7F32',
    discount: 5,
    icon: '🥉',
  },
  silver: {
    name: '白银会员',
    nameEn: 'Silver',
    minPoints: 500,
    maxPoints: 1999,
    color: '#C0C0C0',
    discount: 10,
    icon: '🥈',
  },
  gold: {
    name: '黄金会员',
    nameEn: 'Gold',
    minPoints: 2000,
    maxPoints: 4999,
    color: '#FFD700',
    discount: 15,
    icon: '🥇',
  },
  platinum: {
    name: '铂金会员',
    nameEn: 'Platinum',
    minPoints: 5000,
    maxPoints: 9999,
    color: '#E5E4E2',
    discount: 20,
    icon: '💎',
  },
  diamond: {
    name: '钻石会员',
    nameEn: 'Diamond',
    minPoints: 10000,
    maxPoints: Infinity,
    color: '#B9F2FF',
    discount: 25,
    icon: '👑',
  },
};

function ProfilePageContent() {
  const { user, login, register, logout } = useAuth();
  const [language, setLanguage] = useState('中文');
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [points, setPoints] = useState(450);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const foodOrders = JSON.parse(localStorage.getItem('food_orders') || '[]');
    const hotelOrders = JSON.parse(
      localStorage.getItem('hotel_orders') || '[]'
    );
    const tourOrders = JSON.parse(localStorage.getItem('tour_orders') || '[]');

    const allBookings = [...foodOrders, ...hotelOrders, ...tourOrders];
    allBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
    setBookings(allBookings);

    const saved = JSON.parse(localStorage.getItem('saved_items') || '[]');
    setSavedItems(saved);

    // Load user's own community posts
    const userCreatedPosts = JSON.parse(localStorage.getItem('user_posts') || '[]');
    setUserPosts(userCreatedPosts);

    const totalSpent = allBookings.reduce((sum, order) => sum + order.total, 0);
    setPoints(Math.floor(totalSpent / 10));
  }, []);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleLanguage = () => {
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const handleLogout = () => {
    logout();
    showNotification(language === '中文' ? '已退出登录' : 'Logged out');
  };

  const removeSavedItem = (id, e) => {
    e.preventDefault();
    const newSaved = savedItems.filter((item) => item.id !== id);
    setSavedItems(newSaved);
    localStorage.setItem('saved_items', JSON.stringify(newSaved));
    showNotification(language === '中文' ? '已取消收藏' : 'Removed from saved');
  };

  const deleteUserPost = (postId, e) => {
    e.preventDefault();
    const updatedPosts = userPosts.filter(post => post.id !== postId);
    setUserPosts(updatedPosts);
    localStorage.setItem('user_posts', JSON.stringify(updatedPosts));
    showNotification(language === '中文' ? '帖子已删除' : 'Post deleted');
  };

  const getMembershipTier = () => {
    if (points >= 10000) return membershipTiers.diamond;
    if (points >= 5000) return membershipTiers.platinum;
    if (points >= 2000) return membershipTiers.gold;
    if (points >= 500) return membershipTiers.silver;
    return membershipTiers.bronze;
  };

  const getNextTier = () => {
    const current = getMembershipTier();
    if (current === membershipTiers.diamond) return null;
    if (current === membershipTiers.bronze) return membershipTiers.silver;
    if (current === membershipTiers.silver) return membershipTiers.gold;
    if (current === membershipTiers.gold) return membershipTiers.platinum;
    return membershipTiers.diamond;
  };

  const getProgressToNextTier = () => {
    const current = getMembershipTier();
    const next = getNextTier();
    if (!next) return 100;
    const currentPoints = points - current.minPoints;
    const neededPoints = next.minPoints - current.minPoints;
    return Math.min(100, Math.floor((currentPoints / neededPoints) * 100));
  };

  const t = (zh, en) => (language === '中文' ? zh : en);

  const currentTier = getMembershipTier();
  const nextTier = getNextTier();
  const progress = getProgressToNextTier();

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-100 pb-24">
        <header className="bg-white border-b shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Logo />
              <button onClick={toggleLanguage} className="text-xl">
                🌐 <span className="text-xs ml-1">{language}</span>
              </button>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-6xl mb-6">👤</div>
          <h1 className="text-2xl font-bold mb-4">
            {t('请先登录', 'Please login first')}
          </h1>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            {t('登录/注册', 'Login / Register')}
          </button>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={login}
          onRegister={register}
          language={language}
        />
        <AIChatbot language={language} />
        <BottomNav language={language} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
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
            <div className="flex gap-4 items-center">
              <button onClick={toggleLanguage} className="text-xl">
                🌐 <span className="text-xs ml-1">{language}</span>
              </button>
              <button onClick={handleLogout} className="text-sm text-red-500">
                🚪 {t('退出', 'Logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl text-white">
              {user.name?.charAt(0) || '👤'}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-400 text-sm">
                {user.phone || t('未绑定手机', 'Phone not linked')}
              </p>
            </div>
            <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              {t('编辑资料', 'Edit Profile')}
            </button>
          </div>
        </div>

        {/* Membership Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{currentTier.icon}</span>
                <h2 className="text-2xl font-bold">
                  {t(currentTier.name, currentTier.nameEn)}
                </h2>
              </div>
              <p className="text-blue-100 text-sm mt-1">
                {t('消费 ¥10 = 1 积分', 'Spend ¥10 = 1 point')}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{points}</div>
              <div className="text-blue-100 text-sm">
                {t('总积分', 'Total Points')}
              </div>
            </div>
          </div>

          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{t(currentTier.name, currentTier.nameEn)}</span>
                <span>{t(nextTier.name, nextTier.nameEn)}</span>
              </div>
              <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-blue-100 text-xs mt-2">
                {t('再获得', 'Need')} {nextTier.minPoints - points}{' '}
                {t('积分升级到', 'more points to reach')}{' '}
                {t(nextTier.name, nextTier.nameEn)}({nextTier.discount}%{' '}
                {t('折扣', 'off')})
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-white border-opacity-20 flex justify-between">
            <div className="text-center flex-1">
              <div className="text-2xl font-bold">{currentTier.discount}%</div>
              <div className="text-blue-100 text-xs">
                {t('全场折扣', 'Discount')}
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold">🎁</div>
              <div className="text-blue-100 text-xs">
                {t('生日礼遇', 'Birthday Gift')}
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold">🚀</div>
              <div className="text-blue-100 text-xs">
                {t('优先客服', 'Priority Support')}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - 4 Tabs including My Posts */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-3 text-center font-medium transition whitespace-nowrap px-3 ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              📋 {t('我的订单', 'My Orders')}
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-3 text-center font-medium transition whitespace-nowrap px-3 ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              📝 {t('我的帖子', 'My Posts')}
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-3 text-center font-medium transition whitespace-nowrap px-3 ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              ⭐ {t('我的收藏', 'Saved')}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 text-center font-medium transition whitespace-nowrap px-3 ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              ⚙️ {t('设置', 'Settings')}
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="p-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📋</div>
                  <p className="text-gray-400">
                    {t('暂无订单', 'No orders yet')}
                  </p>
                  <Link
                    href="/food"
                    className="inline-block mt-4 text-blue-600"
                  >
                    {t('去购物', 'Start Shopping')} →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 10).map((booking, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {booking.type === 'hotel'
                              ? '🏨'
                              : booking.type === 'tour'
                              ? '🏔️'
                              : '🍜'}{' '}
                            {booking.orderNumber}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(booking.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {booking.items?.length || 1} {t('件商品', 'items')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            ¥{booking.total}
                          </p>
                          <span className="text-xs text-green-600">
                            {t('已完成', 'Completed')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Posts Tab - NEW: Display user's community posts */}
          {activeTab === 'posts' && (
            <div className="p-4">
              {userPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📝</div>
                  <p className="text-gray-400">
                    {t('暂无帖子', 'No posts yet')}
                  </p>
                  <Link
                    href="/community/new"
                    className="inline-block mt-4 text-blue-600"
                  >
                    {t('发布第一条动态', 'Create First Post')} →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <Link
                      href={`/community/${post.id}`}
                      key={post.id}
                      className="block border rounded-xl p-4 hover:shadow-md transition hover:bg-gray-50"
                    >
                      <div className="flex gap-4">
                        {/* Post Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={post.images?.[0] || 'https://picsum.photos/id/104/100/100'} 
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://picsum.photos/id/104/100/100';
                            }}
                          />
                          {post.images?.length > 1 && (
                            <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                              +{post.images.length}
                            </div>
                          )}
                        </div>
                        
                        {/* Post Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{post.avatar || '👤'}</span>
                            <span className="text-xs text-gray-500">{post.username || user.name}</span>
                            <span className="text-xs text-gray-400">· {post.timeAgo || t('刚刚', 'Just now')}</span>
                          </div>
                          <h3 className="font-medium text-sm line-clamp-1">{post.title}</h3>
                          <p className="text-gray-500 text-xs line-clamp-2 mt-1">{post.description}</p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-400">
                            <span>❤️ {post.likes || 0}</span>
                            <span>💬 {post.comments || 0}</span>
                            <span>⭐ {post.saves || 0}</span>
                          </div>
                        </div>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={(e) => deleteUserPost(post.id, e)}
                          className="text-red-400 text-sm hover:text-red-600 self-center px-2"
                          title={t('删除帖子', 'Delete post')}
                        >
                          🗑️
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Tab */}
          {activeTab === 'saved' && (
            <div className="p-4">
              {savedItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">⭐</div>
                  <p className="text-gray-400">
                    {t('暂无收藏', 'No saved items yet')}
                  </p>
                  <Link
                    href="/food"
                    className="inline-block mt-4 text-blue-600"
                  >
                    {t('去发现', 'Discover')} →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedItems.map((item) => {
                    let href = '/';
                    if (item.type === 'food') href = `/food/${item.id}`;
                    else if (item.type === 'hotel') href = `/hotel/${item.id}`;
                    else if (item.type === 'tour') href = `/tour/${item.id}`;
                    else if (item.type === 'post') href = `/community/${item.id}`;

                    return (
                      <Link
                        href={href}
                        key={item.id}
                        className="block border rounded-xl p-4 hover:shadow-md transition hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">
                              {item.type === 'food'
                                ? '🍜'
                                : item.type === 'hotel'
                                ? '🏨'
                                : item.type === 'tour'
                                ? '🏔️'
                                : '⭐'}
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              {item.price && (
                                <p className="text-sm text-gray-500">
                                  ¥{item.price}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => removeSavedItem(item.id, e)}
                            className="text-red-400 text-sm hover:text-red-600"
                          >
                            {t('取消收藏', 'Remove')}
                          </button>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-medium">{t('语言', 'Language')}</p>
                  <p className="text-sm text-gray-500">
                    {t('切换显示语言', 'Switch display language')}
                  </p>
                </div>
                <button
                  onClick={toggleLanguage}
                  className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
                >
                  {language === '中文' ? '中文' : 'English'} 🌐
                </button>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-medium">{t('通知', 'Notifications')}</p>
                  <p className="text-sm text-gray-500">
                    {t('订单状态和促销通知', 'Order status and promotions')}
                  </p>
                </div>
                <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-medium">
                    {t('隐私政策', 'Privacy Policy')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('了解数据使用条款', 'Learn about data usage')}
                  </p>
                </div>
                <button className="text-blue-600">→</button>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-medium">{t('关于我们', 'About Us')}</p>
                  <p className="text-sm text-gray-500">
                    {t('版本 1.0.0', 'Version 1.0.0')}
                  </p>
                </div>
                <button className="text-blue-600">→</button>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-6 bg-red-50 text-red-600 py-3 rounded-xl font-semibold"
              >
                🚪 {t('退出登录', 'Logout')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot language={language} />

      {/* Bottom Navigation */}
      <BottomNav language={language} />
    </main>
  );
}

export default function ProfilePage() {
  return (
    <AuthProvider>
      <ProfilePageContent />
    </AuthProvider>
  );
}