"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <img 
        src="https://i.postimg.cc/Gpdh7wrS/Photoroom-20260530-010622.png" 
        alt="Lz168.com" 
        style={{ 
          height: "110px", 
          width: "auto", 
          display: "block"
        }}
      />
    </Link>
  );
}