'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BottomNav from '@/components/BottomNav';

export default function FoodResults() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const [language, setLanguage] = useState('中文');

  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/mock-data/restaurants.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load');
        }
        return res.json();
      })
      .then((data) => {
        setRestaurantsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading restaurants:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredRestaurants = restaurantsData.filter((restaurant) =>
    location
      ? restaurant.name.toLowerCase().includes(location.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(location.toLowerCase())
      : true
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="text-center">加载中...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500">加载美食数据失败</p>
          <Link href="/" className="text-orange-600 mt-4 inline-block">
            ← 返回首页
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-orange-600 mb-4 inline-block">
          ← 新搜索
        </Link>

        <h1 className="text-3xl font-bold mb-2">🍜 美食搜索结果</h1>
        <p className="text-gray-600 mb-6">
          搜索: {location || '所有美食'} | 青云合作伙伴
        </p>

        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">未找到 "{location}" 相关美食</p>
            <p className="text-sm text-gray-400 mt-2">
              试试搜索: 螺蛳粉、青云、夜市
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg"
            >
              返回搜索
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-xl">{restaurant.name}</h3>
                      <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
                        合作伙伴
                      </span>
                      <span className="bg-orange-100 text-orange-700 text-sm px-2 py-1 rounded">
                        ★ {restaurant.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {restaurant.location}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">
                      💰 {restaurant.priceRange}
                    </p>
                  </div>
                  <div className="text-right">
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                      预约
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav language={language} />
    </main>
  );
}
