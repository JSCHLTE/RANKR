// app/components/ClientNavbar.jsx
'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(
  () => import('@/app/components/navbar/Navbar'),
  { ssr: false }
);

export default function ClientNavbar() {
  return <Navbar />;
}