'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TrainResults() {
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');

  const [trainsData, setTrainsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('中文');

  useEffect(() => {
    fetch('/mock-data/trains.json')
      .then((res) => res.json())
      .then((data) => {
        setTrainsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load trains:', err);
        setLoading(false);
      });
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === '中文' ? 'EN' : '中文');
  };

  const filteredTrains = trainsData.filter(
    (train) => train.origin === origin && train.destination === destination
  );

  const t = (zh, en) => (language === '中文' ? zh : en);

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
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-orange-600 inline-block">
            ← {t('新搜索', 'New Search')}
          </Link>
          <button onClick={toggleLanguage} className="text-blue-600">
            🌐 {language}
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-2">
          🚄 {t('火车票搜索结果', 'Train Search Results')}
        </h1>
        <p className="text-gray-600 mb-6">
          {origin} → {destination} | {t('日期', 'Date')}: {date}
        </p>

        {filteredTrains.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">
              {t('未找到从', 'No trains found from')} {origin} {t('到', 'to')}{' '}
              {destination} {t('的火车', '')}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {t('建议尝试', 'Try searching')}: 柳州 → 桂林
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrains.map((train) => (
              <div key={train.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-xl">{train.trainNumber}</h3>
                    <p className="text-gray-600">{train.class}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {train.departureTime} → {train.arrivalTime} •{' '}
                      {train.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-orange-600">
                      ¥{train.price}
                    </p>
                    <button className="mt-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                      {t('选择', 'Select')}
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
