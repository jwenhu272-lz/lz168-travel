'use client';
import Link from 'next/link';

export default function TourResults() {
  const tourPackages = [
    {
      id: 'tour1',
      name: '青云景区一日游',
      price: 188,
      includes: ['门票', '导游服务', '午餐'],
      duration: '1天',
      type: 'popular',
    },
    {
      id: 'tour2',
      name: '柳州文化深度游',
      price: 328,
      includes: ['青云景区', '柳州博物馆', '当地美食体验'],
      duration: '2天1晚',
      type: 'featured',
    },
    {
      id: 'tour3',
      name: '青云夜景 + 螺蛳粉体验',
      price: 98,
      includes: ['夜景门票', '正宗螺蛳粉晚餐'],
      duration: '半日',
      type: 'evening',
    },
    {
      id: 'tour4',
      name: '团体商务套餐 (10人以上)',
      price: 1580,
      includes: ['团体门票', 'VIP导游', '定制餐饮'],
      duration: '1天',
      type: 'group',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-orange-600 mb-4 inline-block">
          ← 新搜索
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            🎟️ 青云景区 · 官方旅游服务
          </h1>
          <p className="text-gray-600">Liuzhou Qingyun — 柳州风情第一站</p>
        </div>

        <div className="bg-orange-500 text-white rounded-xl p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">欢迎来到青云景区</h2>
          <p>柳州最受欢迎的旅游目的地 | 官方合作平台</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">推荐套餐</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {tourPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    ⏱️ {pkg.duration}
                  </p>
                  <div className="mt-2">
                    {pkg.includes.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-1 mb-1"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">
                    ¥{pkg.price}
                  </p>
                  <p className="text-xs text-gray-500">起</p>
                  <button className="mt-2 bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600">
                    预订
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="font-bold text-lg mb-2">需要定制服务？</h3>
          <p className="text-gray-600 mb-3">团体游、商务接待、VIP定制</p>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
            联系客服
          </button>
        </div>
      </div>
    </main>
  );
}
