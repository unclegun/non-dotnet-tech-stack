import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Nav from '@/components/Nav';
import BootstrapClient from '@/components/BootstrapClient';

export const metadata: Metadata = {
  title: 'Test Stack - Modern Full-Stack Architecture',
  description: 'Educational demo of Next.js, Fastify, Postgres, and Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-bs-theme="light">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body>
        <Nav />
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
