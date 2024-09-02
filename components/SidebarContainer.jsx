'use client'
import { Drawer } from "antd";
import useWindDimensions from "@/hook/useWinDimension";
const SidebarContainer = ({
  isDrawrOpen,
  setIsDrawerOpen,
  children,
  ...other
}) => {
  const { width } = useWindDimensions();

  if (width <= 1268) {
    return (
      <Drawer
        {...other}
        placement={"left"}
        open={isDrawrOpen}
        onClose={() => setIsDrawerOpen(false)}
        height={"100%"}
      >
        <div className='h-full'>{children}</div>
      </Drawer>
    );
  }
  return children;
};

export default SidebarContainer;
