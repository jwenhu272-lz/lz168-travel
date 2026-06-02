"use client";
import Link from "next/link";

export default function LuosifenTestPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-orange-600">🍜 Luosifen Page Working!</h1>
      <p className="mt-4">If you see this, the route is correct.</p>
      <Link href="/" className="text-blue-600 mt-4 inline-block">← Back to Home</Link>
    </div>
  );
}