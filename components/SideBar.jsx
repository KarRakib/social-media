"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "antd";
import cx from "classnames";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import Box from "./Box";
import SidebarContainer from "./SidebarContainer";
import { useSettingsContext } from "@/context/setttings/SettingsContext";
import { sidebarRoutes } from "@/lib/sidebar";
import Iconify from "./Iconify";
const Sidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    settings: { isSidebarOpen },
    setSettings,
  } = useSettingsContext();

  const handleDrawerClose = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isSidebarOpen: false,
    }));
  }, [setSettings]);

  useEffect(() => {
    if (isSidebarOpen) {
      handleDrawerClose();
    }
  }, [pathname, handleDrawerClose]);

  const isActive = (route) => {
    if (route.route === pathname) return 'bg-primary-low' ;
  };

  const activeColor = (route) => {
    return isActive(route) && "var(--primary)";
  };
  return (
    mounted && (
      <SidebarContainer
        isDrawrOpen={isSidebarOpen}
        setIsDrawerOpen={handleDrawerClose}
      >
        <div className='min-w-72 rounded-xl overflow-hidden flex min-h-[88vh]'>
          <Box className='flex flex-col gap-2 w-full p-2'>
            {sidebarRoutes(user).map((route, index) => (
              <Link
                // if the route is profile, then add the person query
                href={
                  route.route === `/profile/${user?.id}`
                    ? `${route.route}?person=${user?.firstName}`
                    : `${route.route}`
                }
                key={index}
                className={cx('flex items-center gap-4 p-4 px-6 rounded-lg  capitalize no-underline font-semibold hover:bg-primary-low cursor-pointer active:bg-primary-low', isActive(route))}
              >
                {/* icon */}
                <Typography style={{ color: activeColor(route) }}>
                  <Iconify icon={route.icon} width={"20px"} />
                </Typography>

                {/* name */}
                <Typography
                  className="typoSubtitle2"
                  style={{ color: activeColor(route) }}
                >
                  {route.name}
                </Typography>
              </Link>
            ))}

            <Link
              href={""}
              className={cx('flex items-center gap-4 p-4 px-6 rounded-lg  capitalize no-underline font-semibold hover:bg-primary-low cursor-pointer active:bg-primary-low')}
              onClick={() => {
                signOut(() => router.push("/sign-in"));
              }}
            >
              {/* icon */}
              <Typography>
                <Iconify icon={"solar:logout-2-bold"} width={"20px"} />
              </Typography>

              {/* name */}
              <Typography className="typoSubtitle2">Sign out</Typography>
            </Link>
          </Box>
        </div>
      </SidebarContainer>
    )
  );
};

export default Sidebar;
