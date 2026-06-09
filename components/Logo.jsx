"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <img 
        src="https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/logo.PNG" 
        alt="Lz108.com" 
        style={{ 
          height: "110px", 
          width: "auto", 
          display: "block"
        }}
      />
    </Link>
  );
}