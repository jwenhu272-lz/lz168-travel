'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FlightResults() {
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');

  const [flightsData, setFlightsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load flights from JSON file
    fetch('/mock-data/flights.json')
      .then((res) => res.json())
      .then((data) => {
        setFlightsData(data);
        setLoading(false);
      });
  }, []);

  const filteredFlights = flightsData.filter(
    (flight) => flight.origin === origin && flight.destination === destination
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

        <h1 className="text-3xl font-bold mb-2">✈️ 航班搜索结果</h1>
        <p className="text-gray-600 mb-6">
          {origin} → {destination} | 日期: {date}
        </p>

        {filteredFlights.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">
              未找到从 {origin} 到 {destination} 的航班
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
            {filteredFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-xl">{flight.airline}</h3>
                    <p className="text-gray-600">{flight.flightNumber}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {flight.origin} → {flight.destination} • {flight.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-orange-600">
                      ¥{flight.price}
                    </p>
                    <button className="mt-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                      选择
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
