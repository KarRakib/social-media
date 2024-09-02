import React from "react";
import { Flex } from "antd";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Box from "./Box";
import SidebarButton from "./SidebarButton";
import ModeChangeButton from "./ModeChangeButton";
// import ModeButton from "./ModeButton";
// import SidebarButton from "./SidebarButton";
const Header = () => {
  return (
    <header className='fixed w-full h-[72px] overflow-hidden z-[999] top-0'>
      <Box style={{ height: "100%" }}>
        <div className='flex items-center justify-between px-8 py-4'>
          {/* sidbear button */}

          <div className=' hidden max-[1268px]:block'>
         <SidebarButton/>
          </div>

          {/* logo */}
          <Image
            src="/images/logo.png"
            width={150}
            height={40}
            alt="logo"
            className=' max-[1268px]:hidden'
          />
          {/* actions */}
          <Flex gap={25} align="center"> 
           <ModeChangeButton/>
            <UserButton afterSignOutUrl="/sign-in" />
          </Flex>
        </div>
      </Box>
    </header>
  );
};

export default Header;
