import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

// Removed Google Fonts - using system fonts instead for China accessibility

export const metadata: Metadata = {
  title: 'Lz168.com | 秀美柳州 · 市井青云',
  description: '柳州本地旅游服务平台 — 青云景区官方合作伙伴',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}