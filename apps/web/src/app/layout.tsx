import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StellarWatch',
  description: 'On-chain health monitoring for Soroban contracts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#0a0e27',
        color: '#e2e8f0',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  );
}
