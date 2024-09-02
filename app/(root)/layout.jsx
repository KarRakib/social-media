'use client'
import "../globals.css";
import React from "react";
// import css from "@/styles/homeLayout.module.css";
// import Header from "@/components/Header";
// import ThemeProvider from "@/lib/ThemeProvider";
// import Box from "@/components/Box";
// import Sidebar from "@/components/Sidebar";
// import { SettingsContextProvider } from "@/context/settings/settings-provider";
import { Toaster } from "react-hot-toast";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
// import { getAllFollowersAndFollowings} from "@/actions/user";
import Box from "@/components/Box";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import { SettingsContextProvider } from "@/context/setttings/SettingProvider";
import ThemeProvider from "@/lib/ThemeProvider";

const RootLayout = ({ children }) => {
  const { user } = useUser(); // This will only work client-side
  const queryClient = new QueryClient();

  React.useEffect(() => {
    if (user) {
      queryClient.prefetchQuery({
        queryKey: ['user', user.id, 'followInfo'],
        queryFn: () => getAllFollowersAndFollowings(user.id),
        staleTime: 1000 * 60 * 20,
      });
    }
  }, [user]);
  return (
    <SettingsContextProvider >
      <ThemeProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Box
          type="baseBg"
          style={{ position: 'relative', width: '100vw', height: '100vh' }}
        >
          <div className='min-h-[calc(100vh_-_72px)] fixed min-w-[100vw] bg-[#212B36] flex-col overflow-scroll top-[72px]'>
            <Header />
            <div className="flex gap-4 grow bg-[#212B36] p-2 md:p-4">
              <Sidebar />
              <div className="flex-1"> {children}</div>
            </div>
          </div>
        </Box>
      </HydrationBoundary>
      <Toaster />
      </ThemeProvider>
    </SettingsContextProvider >
  );
}
export default RootLayout;