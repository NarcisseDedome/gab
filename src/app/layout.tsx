import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToastContainer } from '@/components/ui/ToastContainer';

// Import Modals
import { PostJobModal } from '@/components/modals/PostJobModal';
import { CreateProjectModal } from '@/components/modals/CreateProjectModal';
import { RequestQuoteModal } from '@/components/modals/RequestQuoteModal';
import { DailySiteReportModal } from '@/components/modals/DailySiteReportModal';
import { OpenDisputeModal } from '@/components/modals/OpenDisputeModal';

export const metadata: Metadata = {
  title: 'GAB-work | Global Architecture & Building Work',
  description: 'Build. Work. Connect. Trust. The leading secured marketplace for construction jobs, skilled workers, BTP companies, and digital milestone contracts in Ghana and Africa.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col justify-between antialiased selection:bg-[#17324D] selection:text-white pb-14 sm:pb-0">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />

          {/* Global Modals */}
          <PostJobModal />
          <CreateProjectModal />
          <RequestQuoteModal />
          <DailySiteReportModal />
          <OpenDisputeModal />

          {/* Toast feedback */}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
