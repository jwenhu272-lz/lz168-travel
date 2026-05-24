'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav({ language }) {
  const pathname = usePathname();

  const t = {
    home: language === '中文' ? '首页' : 'Home',
    food: language === '中文' ? '美食' : 'Food',
    hotel: language === '中文' ? '酒店' : 'Hotel',
    tour: language === '中文' ? '旅游' : 'Tours',
    profile: language === '中文' ? '我的' : 'Profile',
  };

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-2 flex justify-around z-40">
      <Link
        href="/"
        className={`flex flex-col items-center ${
          isActive('/') ? 'text-[#0052CC]' : 'text-gray-500'
        }`}
      >
        <span className="text-xl">🏠</span>
        <span className="text-xs">{t.home}</span>
      </Link>
      <Link
        href="/food"
        className={`flex flex-col items-center ${
          isActive('/food') ? 'text-[#0052CC]' : 'text-gray-500'
        }`}
      >
        <span className="text-xl">🍜</span>
        <span className="text-xs">{t.food}</span>
      </Link>
      <Link
        href="/hotel"
        className={`flex flex-col items-center ${
          isActive('/hotel') ? 'text-[#0052CC]' : 'text-gray-500'
        }`}
      >
        <span className="text-xl">🏨</span>
        <span className="text-xs">{t.hotel}</span>
      </Link>
      <Link
        href="/tour"
        className={`flex flex-col items-center ${
          isActive('/tour') ? 'text-[#0052CC]' : 'text-gray-500'
        }`}
      >
        <span className="text-xl">🏔️</span>
        <span className="text-xs">{t.tour}</span>
      </Link>
      <Link
        href="/profile"
        className={`flex flex-col items-center ${
          isActive('/profile') ? 'text-[#0052CC]' : 'text-gray-500'
        }`}
      >
        <span className="text-xl">👤</span>
        <span className="text-xs">{t.profile}</span>
      </Link>
    </div>
  );
}
