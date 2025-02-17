'use client';
import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Bounce, ToastContainer } from 'react-toastify';
import { ConfigProvider as AntDesignConfigProvider } from 'antd';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: ProvidersProps) {
  const [bgColor, setBgColor] = useState<string>('#f8f7fa');
  const [textColor, setTextColor] = useState<string>('#475569');

  useEffect(() => {
    const colorMode = localStorage.getItem('theme') ?? 'light';

    setBgColor(colorMode === 'dark' ? '#25293c' : '#f8f7fa');
    setTextColor(colorMode === 'dark' ? '#f1f5f9' : '#475569');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AntDesignConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: bgColor,
              headerBg: bgColor,
              footerBg: bgColor,
              titleColor: textColor,
              colorText: textColor,
            },
          },
        }}
      >
        {children}
      </AntDesignConfigProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </QueryClientProvider>
  );
}
