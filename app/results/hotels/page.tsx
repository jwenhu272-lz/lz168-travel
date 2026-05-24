'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HotelResults() {
  const searchParams = useSearchParams();
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');

  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/mock-data/hotels.json')
      .then((res) => res.json())
      .then((data) => {
        setHotelsData(data);
        setLoading(false);
      });
  }, []);

  const filteredHotels = hotelsData.filter((hotel) =>
    destination
      ? hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.name.toLowerCase().includes(destination.toLowerCase())
      : true
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="text-center">加载中...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-orange-600 mb-4 inline-block">
          ← 新搜索
        </Link>

        <h1 className="text-3xl font-bold mb-2">🏨 酒店搜索结果</h1>
        <p className="text-gray-600 mb-6">
          搜索: {destination || '所有酒店'} | 入住日期: {date || '灵活'}
        </p>

        {filteredHotels.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">未找到符合 "{destination}" 的酒店</p>
            <button
              onClick={() => (window.location.href = '/')}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg"
            >
              返回搜索
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl">{hotel.name}</h3>
                      <span className="bg-orange-100 text-orange-700 text-sm px-2 py-1 rounded">
                        ★ {hotel.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{hotel.location}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      距离青云景区: {hotel.distanceToQingyun}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      ¥{hotel.pricePerNight}
                    </p>
                    <p className="text-sm text-gray-500">/ 晚</p>
                    <button className="mt-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                      预订
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
